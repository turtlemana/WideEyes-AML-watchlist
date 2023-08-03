use actix_web::{web, HttpResponse, get, Responder};
use sqlx::{MySqlPool,FromRow};
use serde_json::json;
use serde::{Serialize,Deserialize};
use std::collections::HashMap;
use regex::Regex;



#[derive(FromRow, Serialize, Deserialize)]
pub struct Search {
    WE_CD:Option<i64>,
    BIRTHDATE: Option<String>,
    NATION_CODE:Option<String>,
    NATION_NAME:Option<String>,
    DATA_SET:Option<String>,
    WHOLE_NAME:Option<String>,
    PROFILE_IMAGE:Option<String>,
    RRE:Option<i8>,
    TRUE_NAME:Option<String>,
    PEP_CURRENT:Option<i8>,
    PEP_FORMER:Option<i8>,
    PEP_LINKED:Option<i8>,
    SAN_CURRENT:Option<i8>,
    SAN_FORMER:Option<i8>,
    POI:Option<i8>,
    REL:Option<i8>, 
}


#[derive(FromRow, Serialize, Deserialize)]
pub struct Business_Search {
    WE_CD:Option<i64>,
    NAME: Option<String>,
    NATION_CODE:Option<String>,
    NATION_NAME:Option<String>,
    TRUE_NAME:Option<String>,
}


#[get("/api/mainSearch")]
async fn main_search(pool: web::Data<MySqlPool>, search: web::Query<HashMap<String, String>>) -> impl Responder {
    let mut search_string: String = search.get("search").unwrap_or(&String::from("")).clone();
    let page: i32 = search.get("page").unwrap_or(&String::from("1")).parse().unwrap_or(1);
    let view: i32 = search.get("view").unwrap_or(&String::from("20")).parse().unwrap_or(20);
    
    let nations: String = search.get("nations").unwrap_or(&String::from("")).clone();
    let datasets: String = search.get("datasets").unwrap_or(&String::from("")).clone();
    let birthdate_start: String = search.get("birthdateStart").unwrap_or(&String::from("")).clone();
    let birthdate_end: String = search.get("birthdateEnd").unwrap_or(&String::from("")).clone();

    let cleaned_search = search_string.trim().replace("  ", " ");

    

    let special_characters = Regex::new(r"[&|<>*']").unwrap(); 
    if special_characters.is_match(&search_string) {
        search_string = search_string.replace("<", "\\<")
        .replace(">", "\\>")
        .replace("*", "\\*")
        .replace("'", "\\'")
        .replace("&", "\\&")
        .replace("|", "\\|");
    }

    if search_string.trim().is_empty() {
        return HttpResponse::Ok().json(json!({"data": Vec::<String>::new(), "total": 0 }));
    }


    let mut conditions = Vec::new();
    let mut bind_values = Vec::new();

    if !cleaned_search.is_empty() {
        conditions.push("MATCH(WHOLE_NAME,NAME_ALIAS_FIRST,NAME_ALIAS_MIDDLE, NAME_ALIAS_LAST) AGAINST(? IN BOOLEAN MODE)".to_string());
        bind_values.push(format!("\"{}\"", cleaned_search));
    }

    if !nations.is_empty() {
        conditions.push("NATION_NAME = ?".to_string());
        bind_values.push(nations);
    }

    let condition = if !conditions.is_empty() {
        format!("AND {}", conditions.join(" AND "))
    } else {
        "".to_string()  
    };

    if !datasets.is_empty() {
        let datasets_vec: Vec<&str> = datasets.split(",").collect();
        let datasets_conditions = datasets_vec.iter().map(|&dataset| {
            match dataset.to_uppercase().as_str() {
                "PEP-CURRENT" => "PEP_CURRENT = 1",
                "PEP-FORMER" => "PEP_FORMER = 1",
                "PEP-LINKED" => "PEP_LINKED = 1",
                "SAN-CURRENT" => "SAN_CURRENT = 1",
                "SAN-FORMER" => "SAN_FORMER = 1",
                "POI" => "POI = 1",
                "REL" => "REL = 1",
                "RRE" => "RRE = 1",
                _ => ""
            }.to_string()
        }).collect::<Vec<_>>();
        
        if !datasets_conditions.is_empty() {
            conditions.push(format!("({})", datasets_conditions.join(" AND ")));
        }
    }

    if !birthdate_start.is_empty() && !birthdate_end.is_empty() {
        if birthdate_start == birthdate_end {
            conditions.push("BIRTHDATE LIKE ?".to_string());
            bind_values.push(format!("%{}%", birthdate_start));
        } else {
            conditions.push("BIRTHDATE BETWEEN ? AND ?".to_string());
            bind_values.push(birthdate_start);
            bind_values.push(birthdate_end);
        }
    }

    let count_query = format!(
        "SELECT COUNT(DISTINCT WE_CD) as total
        FROM EXPLORE_NAME
        WHERE 1=1 {}",
        condition
    );

    let mut count_cmd = sqlx::query_scalar(&count_query);
    for value in &bind_values {
        count_cmd = count_cmd.bind(value);
    }
    let count_result: Result<i32, _> = count_cmd.fetch_one(pool.as_ref()).await;

    let total_count = match count_result {
        Ok(count) => count,
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            return HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }));
        },
    };
    
    let limit_clause = format!("LIMIT {}, {}", (page-1)*view, view);
    
    let main_query = format!(
        "SELECT ANY_VALUE(WE_CD) AS WE_CD, ANY_VALUE(BIRTHDATE) AS BIRTHDATE, ANY_VALUE(NATION_CODE) AS NATION_CODE,
        ANY_VALUE(NATION_NAME) AS NATION_NAME, ANY_VALUE(PROFILE_IMAGE) AS PROFILE_IMAGE, 
        ANY_VALUE(TRUE_NAME) AS TRUE_NAME, ANY_VALUE(DATA_SET) AS DATA_SET, 
        ANY_VALUE(WHOLE_NAME) AS WHOLE_NAME, ANY_VALUE(RRE) AS RRE, ANY_VALUE(PEP_CURRENT) AS PEP_CURRENT, 
        ANY_VALUE(PEP_FORMER) AS PEP_FORMER, ANY_VALUE(PEP_LINKED) AS PEP_LINKED, ANY_VALUE(SAN_CURRENT) AS SAN_CURRENT, 
        ANY_VALUE(SAN_FORMER) AS SAN_FORMER, ANY_VALUE(POI) AS POI, ANY_VALUE(REL) AS REL
        FROM EXPLORE_NAME
        WHERE 1=1 
        {}
        GROUP BY WE_CD
        {}",
        condition,
        limit_clause
    );

    let mut query_cmd = sqlx::query_as(&main_query);
    for value in &bind_values {
        query_cmd = query_cmd.bind(value);
    }

    let rows: Result<Vec<Search>, _> = query_cmd.fetch_all(pool.as_ref()).await;
    
    match rows {
        Ok(result) => HttpResponse::Ok().json(json!({"data": result, "total": total_count })),
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }))
        },
    }
}

#[get("/api/qrSearch")]
async fn qr_search(pool: web::Data<MySqlPool>, search: web::Query<HashMap<String, String>>) -> impl Responder {
    let search_string: String = search.get("search").unwrap_or(&String::from("")).clone();
    let page: i32 = search.get("page").unwrap_or(&String::from("1")).parse().unwrap_or(1);
    let view: i32 = search.get("view").unwrap_or(&String::from("20")).parse().unwrap_or(20);
    let cleaned_search = search_string.trim().replace("  ", " ");
    

    let condition = if !cleaned_search.is_empty() {
        "AND WE_CD = ?"
    } else {
        ""
    };
    
    let count_query = format!(
        "SELECT COUNT(DISTINCT WE_CD) as total
        FROM EXPLORE_NAME
        WHERE 1=1 {}",
        condition
    );
    
    let count_result: Result<i32, _> = sqlx::query_scalar(&count_query)
        .bind(&cleaned_search)
        .fetch_one(pool.as_ref())
        .await;

    let total_count = match count_result {
        Ok(count) => count,
        Err(e) => {
            eprintln!("Database error: {:?}", e);  
            return HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }));
        },
    };
    
    let limit = format!("LIMIT {}, {}", (page-1)*view, view);
    
    let query = format!(
        "SELECT ANY_VALUE(WE_CD) AS WE_CD, ANY_VALUE(BIRTHDATE) AS BIRTHDATE, ANY_VALUE(NATION_CODE) AS NATION_CODE,ANY_VALUE(NATION_NAME) AS NATION_NAME, 
        ANY_VALUE(PROFILE_IMAGE) AS PROFILE_IMAGE, ANY_VALUE(TRUE_NAME) AS TRUE_NAME, ANY_VALUE(DATA_SET) AS DATA_SET, ANY_VALUE(WHOLE_NAME) AS WHOLE_NAME, ANY_VALUE(RRE) AS RRE,
        ANY_VALUE(PEP_CURRENT) AS PEP_CURRENT, ANY_VALUE(PEP_FORMER) AS PEP_FORMER, ANY_VALUE(PEP_LINKED) AS PEP_LINKED, 
        ANY_VALUE(SAN_CURRENT) AS SAN_CURRENT, ANY_VALUE(SAN_FORMER) AS SAN_FORMER, ANY_VALUE(INS) AS INS, ANY_VALUE(DD) AS DD, 
        ANY_VALUE(POI) AS POI, ANY_VALUE(REL) AS REL, ANY_VALUE(GRI) AS GRI
        FROM EXPLORE_NAME
        WHERE 1=1 
        {}
        GROUP BY WE_CD
        {}",
        condition,
        limit
    );


    let rows: Result<Vec<Search>, _> = sqlx::query_as(&query)
        .bind(&cleaned_search)
        .fetch_all(pool.as_ref())
        .await;

    match rows {
        Ok(result) => HttpResponse::Ok().json(json!({"data": result, "total": total_count })),
        Err(e) => {
            eprintln!("Database error: {:?}", e);  
            HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }))
        },
    }
}


#[get("/api/businessMainSearch")]
async fn business_main_search(pool: web::Data<MySqlPool>, search: web::Query<HashMap<String, String>>) -> impl Responder {
    let mut search_string: String = search.get("search").unwrap_or(&String::from("")).clone();
    let page: i32 = search.get("page").unwrap_or(&String::from("1")).parse().unwrap_or(1);
    let view: i32 = search.get("view").unwrap_or(&String::from("20")).parse().unwrap_or(20);
    
    let nations: String = search.get("nations").unwrap_or(&String::from("")).clone();
    
    if search_string.trim().is_empty() {
        return HttpResponse::Ok().json(json!({"data": Vec::<String>::new(), "total": 0 }));
    }


    let special_characters = Regex::new(r"[&|<>*']").unwrap(); 
    if special_characters.is_match(&search_string) {
        search_string = search_string.replace("<", "\\<")
        .replace(">", "\\>")
        .replace("*", "\\*")
        .replace("'", "\\'")
        .replace("&", "\\&")
        .replace("|", "\\|");
    }

    let cleaned_search = search_string.trim().replace("  ", " ");

    let mut conditions = Vec::new();

let mut match_against_fields = Vec::new();
let mut match_against_values = Vec::new();



if !cleaned_search.is_empty() {
    match_against_fields.push("NAME");
    match_against_values.push(cleaned_search);
}

if !nations.is_empty() {
    match_against_fields.push("NATION_NAME");
    match_against_values.push(nations);
}

let mut bind_values=Vec::new();

if !match_against_fields.is_empty() {
    let fields = match_against_fields.join(", ");
    let values = match_against_values.iter()
        .map(|value| {
            if value == "-mollynation" {
                value.to_string()
            } else {
                format!("+{}", value)
            }
        })
        .collect::<Vec<String>>()
        .join(" ");
    conditions.push(format!("MATCH({}) AGAINST(? IN BOOLEAN MODE)", fields));
    bind_values.push(values);
}
    
    let condition = if !conditions.is_empty() {
        format!("AND {}", conditions.join(" AND "))
    } else {
        "".to_string()  
    };

   let count_query_str = format!(
    "SELECT COUNT(DISTINCT WE_CD) as total
    FROM BUSINESS_EXPLORE
    WHERE 1=1 {}", condition
);
let mut count_query = sqlx::query_scalar(&count_query_str);

for value in &bind_values {
    count_query = count_query.bind(value);
}
    
    let count_result: Result<i32, _> = count_query.fetch_one(pool.as_ref()).await;
    

    let total_count = match count_result {
        Ok(count) => count,
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            return HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }));
        },
    };
    
    let limit = format!("LIMIT {}, {}", (page-1)*view, view);
    
    let query_str = format!(
        "SELECT ANY_VALUE(WE_CD) AS WE_CD, ANY_VALUE(NAME) AS NAME,
        ANY_VALUE(NATION_CODE) AS NATION_CODE,
        ANY_VALUE(NATION_NAME) AS NATION_NAME, 
        ANY_VALUE(TRUE_NAME) AS TRUE_NAME
        FROM BUSINESS_EXPLORE
        WHERE 1=1 
        {}
        GROUP BY WE_CD
        {}", condition, limit
    );
    
    let mut query_cmd = sqlx::query_as(&query_str);
    
    for value in &bind_values {
        query_cmd = query_cmd.bind(value);
    }
    
    let rows: Result<Vec<Business_Search>, _> = query_cmd.fetch_all(pool.as_ref()).await;
    
    match rows {
        Ok(result) => HttpResponse::Ok().json(json!({"data": result, "total": total_count })),
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }))
        },
    }
    }

#[get("/api/businessQrSearch")]
async fn business_qr_search(pool: web::Data<MySqlPool>, search: web::Query<HashMap<String, String>>) -> impl Responder {
    let search_string: String = search.get("search").unwrap_or(&String::from("")).clone();
    let page: i32 = search.get("page").unwrap_or(&String::from("1")).parse().unwrap_or(1);
    let view: i32 = search.get("view").unwrap_or(&String::from("20")).parse().unwrap_or(20);
    let cleaned_search = search_string.trim().replace("  ", " ");
    

    let condition = if !cleaned_search.is_empty() {
       "AND WE_CD = ?"
    } else {
        ""
    };
    
    let count_query = format!(
        "SELECT COUNT(DISTINCT WE_CD) as total
        FROM BUSINESS_EXPLORE
        WHERE 1=1 {}",
        condition
    );
    
    let count_result: Result<i32, _> = sqlx::query_scalar(&count_query)
        .bind(&cleaned_search)
        .fetch_one(pool.as_ref())
        .await;

    let total_count = match count_result {
        Ok(count) => count,
        Err(e) => {
            eprintln!("Database error: {:?}", e); 
            return HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }));
        },
    };
    
    let limit = format!("LIMIT {}, {}", (page-1)*view, view);
    
    let query = format!(
        "SELECT ANY_VALUE(WE_CD) AS WE_CD, ANY_VALUE(NAME) AS NAME,
        ANY_VALUE(NATION_CODE) AS NATION_CODE,
        ANY_VALUE(NATION_NAME) AS NATION_NAME, 
        ANY_VALUE(TRUE_NAME) AS TRUE_NAME
        FROM BUSINESS_EXPLORE
        WHERE 1=1 
        {}
        GROUP BY WE_CD
        {}",
        condition,
        limit
    );

    let rows: Result<Vec<Business_Search>, _> = sqlx::query_as(&query)
        .bind(&cleaned_search)
        .fetch_all(pool.as_ref())
        .await;

    match rows {
        Ok(result) => HttpResponse::Ok().json(json!({"data": result, "total": total_count })),
        Err(e) => {
            eprintln!("Database error: {:?}", e);  
            HttpResponse::InternalServerError().json(json!({ "message": "Can't find data" }))
        },
    }
}