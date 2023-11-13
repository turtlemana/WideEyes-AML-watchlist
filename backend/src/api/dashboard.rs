use actix_web::{get, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{FromRow, MySqlPool};

#[derive(FromRow, Serialize, Deserialize)]
pub struct WE_DASHBOARD {
    component: String,
    total_row: Option<i64>,
    person: Option<i32>,
    entity: Option<i32>,
    changes: Option<i32>,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct WE_DASHBOARD_STATUS {
    NO: Option<i32>,
    DATE: Option<String>,
    CLASS: Option<String>,
    TITLE: Option<String>,
    SUB_TITLE: Option<String>,
    URL_LINK: Option<String>,
    ATTACHMENT: Option<String>,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct WE_DASHBOARD_LINKER {
    NO: Option<i8>,
    NAME: Option<String>,
    URL_LINK: Option<String>,
}

#[get("/api/dashboard")]
async fn dashboard(pool: web::Data<MySqlPool>) -> impl Responder {
    let query: String = format!(
        "SELECT component, total_row, person, entity, changes
        FROM WE_DASHBOARD"
    );

    let rows: Result<Vec<WE_DASHBOARD>, _> = sqlx::query_as(&query).fetch_all(pool.as_ref()).await;

    match rows {
        Ok(result) => HttpResponse::Ok().json(json!(result)),
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }))
        }
    }
}

#[get("/api/status")]
async fn status(pool: web::Data<MySqlPool>) -> impl Responder {
    let query: String = format!(
        "SELECT NO, DATE, CLASS, TITLE, SUB_TITLE,URL_LINK,ATTACHMENT
        FROM WE_DASHBOARD_STATUS"
    );

    let rows: Result<Vec<WE_DASHBOARD_STATUS>, _> =
        sqlx::query_as(&query).fetch_all(pool.as_ref()).await;

    match rows {
        Ok(result) => HttpResponse::Ok().json(json!(result)),
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }))
        }
    }
}
#[get("/api/news")]
async fn news(pool: web::Data<MySqlPool>) -> impl Responder {
    let query: String = format!(
        "SELECT NO, DATE, CLASS, TITLE, SUB_TITLE,URL_LINK,ATTACHMENT
        FROM WE_DASHBOARD_NEWS"
    );

    let rows: Result<Vec<WE_DASHBOARD_STATUS>, _> =
        sqlx::query_as(&query).fetch_all(pool.as_ref()).await;

    match rows {
        Ok(result) => HttpResponse::Ok().json(json!(result)),
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }))
        }
    }
}

#[get("/api/link")]
async fn link(pool: web::Data<MySqlPool>) -> impl Responder {
    let query: String = format!(
        "SELECT NO, NAME, URL_LINK
        FROM WE_DASHBOARD_LINKER"
    );

    let rows: Result<Vec<WE_DASHBOARD_LINKER>, _> =
        sqlx::query_as(&query).fetch_all(pool.as_ref()).await;

    match rows {
        Ok(result) => HttpResponse::Ok().json(json!(result)),
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }))
        }
    }
}
