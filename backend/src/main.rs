mod api;

use api::search::{main_search,qr_search,business_main_search,business_qr_search};
use api::detail::{business_profile,profile_detail,pep_positions,sanctions,associations,reputational_risk,other_dataset_rel,other_dataset_dd,other_dataset_poi,evidence};
use api::user::{login,validate,logout};
use actix_web::{web, App, HttpServer,http::header};
use sqlx::MySqlPool;
use dotenv::dotenv;
use std::env;
use actix_cors::Cors;




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
            .allowed_headers(vec![
                header::ACCEPT, 
                header::CONTENT_TYPE,
                header::COOKIE
            ])
            .supports_credentials(); 
        App::new()
        .wrap(cors)
            .app_data(web::Data::new(pool.clone()))
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
        
    })
    .bind("127.0.0.1:7878")?
    .run()
    .await
}