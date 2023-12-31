use actix_web::{cookie::Cookie, get, post, web, HttpRequest, HttpResponse, Responder};
use bcrypt::verify;
use chrono::NaiveDate;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{FromRow, MySqlPool};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    username: String,
    exp: usize,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct User {
    EMAIL: Option<String>,
    COMPANY: Option<String>,
    START_DT: Option<NaiveDate>,
    END_DT: Option<NaiveDate>,
}

#[get("api/user/{email}")]
async fn user_info(pool: web::Data<MySqlPool>, email: web::Path<String>) -> impl Responder {
    let query = format!(
        "SELECT EMAIL, COMPANY, START_DT, END_DT
        FROM WE_USER
        WHERE EMAIL = ?"
    );

    let rows: Result<Vec<User>, _> = sqlx::query_as(&query)
        .bind(&*email)
        .fetch_all(pool.as_ref())
        .await;

    match rows {
        Ok(result) => HttpResponse::Ok().json(json!(result)),
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }))
        }
    }
}

#[post("/api/login")]
pub async fn login(pool: web::Data<MySqlPool>, form: web::Json<LoginRequest>) -> impl Responder {
    let result = sqlx::query_as::<_, (String,)>("SELECT PW FROM WE_USER WHERE EMAIL = ?")
        .bind(&form.username)
        .fetch_one(&**pool)
        .await;

    let hashed_password = match result {
        Ok(row) => row.0,
        Err(_) => return HttpResponse::Unauthorized().body("Invalid email or password!"),
    };

    let is_valid = verify(&form.password, &hashed_password).unwrap_or(false);

    if is_valid {
        let my_claims = Claims {
            sub: env::var("JWT_SUB").unwrap_or("default_sub".to_owned()),
            username: form.username.clone(),
            exp: (chrono::Utc::now().timestamp() + 60 * 60) as usize,
        };

        let key_str = env::var("JWT_SECRET").unwrap_or_else(|_| "default".to_owned());
        let key = key_str.as_bytes();
        let token_result = encode(
            &Header::default(),
            &my_claims,
            &EncodingKey::from_secret(key),
        );
        let token = match token_result {
            Ok(t) => t,
            Err(_) => return HttpResponse::InternalServerError().body("Token generation failed!"),
        };

        HttpResponse::Ok()
            .cookie(
                Cookie::build("jwt", token)
                    .secure(true)
                    .http_only(true)
                    // .same_site(Option::None)
                    .same_site(actix_web::cookie::SameSite::Lax)
                    .finish(),
            )
            .finish()
    } else {
        HttpResponse::Unauthorized().body("Invalid username or password!")
    }
}

#[get("/api/validate")]
pub async fn validate(req: HttpRequest) -> impl Responder {
    let key_str = env::var("JWT_SECRET").unwrap_or_else(|_| "default".to_owned());
    let key = key_str.as_bytes();
    let validation = Validation {
        leeway: 60,
        ..Validation::default()
    };

    let token = match req.cookie("jwt") {
        Some(cookie) => cookie.value().to_string(),
        None => return HttpResponse::BadRequest().body("No 'jwt' cookie"),
    };

    match decode::<Claims>(&token, &DecodingKey::from_secret(key), &validation) {
        Ok(c) => HttpResponse::Ok().json(c.claims),
        Err(err) => {
            println!("Token: {}", token);
            println!("Error: {:?}", err);
            match *err.kind() {
                jsonwebtoken::errors::ErrorKind::InvalidToken => {
                    println!("Token: InvalidToken");
                    HttpResponse::BadRequest().body("Invalid token")
                }
                jsonwebtoken::errors::ErrorKind::ExpiredSignature => {
                    HttpResponse::Unauthorized().body("Token expired")
                }
                jsonwebtoken::errors::ErrorKind::InvalidIssuer => {
                    HttpResponse::BadRequest().body("Invalid issuer")
                }
                _ => HttpResponse::BadRequest().body("Some other error"),
            }
        }
    }
}

#[post("/api/logout")]
pub async fn logout() -> impl Responder {
    let expired = time::OffsetDateTime::now_utc() - time::Duration::new(60, 0);
    let cookie = Cookie::build("jwt", "")
        .secure(true)
        .http_only(true)
        .same_site(actix_web::cookie::SameSite::Lax)
        .expires(expired)
        .finish();

    HttpResponse::Ok().cookie(cookie).finish()
}
