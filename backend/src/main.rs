mod api;

use actix_cors::Cors;
use actix_web::{http::header, web, App, HttpServer};
use api::dashboard::{dashboard, link, news, status};
use api::detail::{
    associations, business_profile, evidence, other_dataset_dd, other_dataset_poi,
    other_dataset_rel, pep_positions, profile_detail, reputational_risk, sanctions,
};
use api::search::{business_main_search, business_qr_search, main_search, qr_search};
use api::user::{login, logout, user_info, validate};
use dotenv::dotenv;
use sqlx::MySqlPool;
use std::env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = MySqlPool::connect(&database_url)
        .await
        .expect("Failed to create pool");

    let test_query = "SELECT 1";
    match sqlx::query(test_query).execute(&pool).await {
        Ok(_) => println!("Database connected successfully"),
        Err(e) => eprintln!("Failed to connect to database: {:?}", e),
    }

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![header::ACCEPT, header::CONTENT_TYPE, header::COOKIE])
            .supports_credentials();
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(pool.clone()))
            .service(dashboard)
            .service(status)
            .service(news)
            .service(link)
            .service(qr_search)
            .service(main_search)
            .service(business_qr_search)
            .service(business_main_search)
            .service(profile_detail)
            .service(business_profile)
            .service(pep_positions)
            .service(sanctions)
            .service(reputational_risk)
            .service(associations)
            .service(other_dataset_rel)
            .service(other_dataset_dd)
            .service(other_dataset_poi)
            .service(evidence)
            .service(login)
            .service(validate)
            .service(logout)
            .service(user_info)
    })
    .bind("127.0.0.1:7878")?
    .run()
    .await
}
