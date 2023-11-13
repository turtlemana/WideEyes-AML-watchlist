use actix_web::{get, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{FromRow, MySqlPool};

#[derive(FromRow, Serialize, Deserialize)]
pub struct ProfileDetail {
    WE_CD: Option<i64>,
    FIRSTNAME: Option<String>,
    MIDDLENAME: Option<String>,
    SURNAME: Option<String>,
    GENDER: Option<String>,
    ADRESS: Option<String>,
    BIRTHDATE: Option<String>,
    CONTACT_KEY: Option<String>,
    CONTACT_VALUE: Option<String>,
    IDENTI_KEY: Option<String>,
    IDENTI_VALUE: Option<String>,
    Nation: Option<String>,
    NOTES: Option<String>,
    PROFIL_IMG: Option<String>,
    DATASET: Option<String>,
    FIRSTNAME_ALIAS: Option<String>,
    MIDDLENAME_ALIAS: Option<String>,
    SURNAME_ALIAS: Option<String>,
    WHOLE_NAME_ALIAS: Option<String>,
    WHOLE_NAME: Option<String>,
    NATION_NAME: Option<String>,
    DEATHDATE: Option<String>,
    EU: Option<i8>,
    OFAC_NON_SDN: Option<i8>,
    UN: Option<i8>,
    KOFIU: Option<i8>,
    OFAC_SDN: Option<i8>,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct PEP_POSITIONS {
    WE_CD: Option<i64>,
    PEP_TIER: Option<String>,
    POSITION_NAME: Option<String>,
    DATETO: Option<String>,
    DATEFROM: Option<String>,
    COUNTRY: Option<String>,
    EVIDENCEID: Option<String>,
    SEG: Option<String>,
    CURRENT_CHECK: Option<i32>,
    PEP_ID: Option<i64>,
}
#[derive(FromRow, Serialize, Deserialize)]
pub struct SANCTIONS {
    WE_CD: Option<i64>,
    SANCTION_ID: Option<String>,
    MEASURE: Option<String>,
    REGIME_ORI: Option<String>,
    REGIME_BODY: Option<String>,
    REGIME_TYPE: Option<String>,
    REGIME_NAME: Option<String>,
    EVENT_TYPE: Option<String>,
    EVENT_EVIDENCEID: Option<String>,
    EVENT_DATE: Option<String>,
    CUR: Option<i32>,
    SAN_NUM: Option<i32>,
}
#[derive(FromRow, Serialize, Deserialize)]
pub struct ASSOCIATIONS {
    WE_CD: Option<i64>,
    FIRSTNAME: Option<String>,
    MIDDLENAME: Option<String>,
    SURNAME: Option<String>,
    NAME: Option<String>,
    RELATIONSHIP: Option<String>,
    QRCODE_RELATION: Option<i64>,
    DATASET: Option<String>,
    INDIVIDUAL: Option<i32>,
    WE_RELATION: Option<i64>,
    ASSOCIATION_ID: Option<i32>,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct REPUTATIONAL_RISK {
    WE_CD: Option<i64>,
    CATEGORY: Option<String>,
    SUB_CATEGORY: Option<String>,
    EVENT_TYPE: Option<String>,
    EVENT_EVIDENCEID: Option<String>,
    EVENT_DATE: Option<String>,
    REPUTAION_ID: Option<i32>,
}
#[derive(FromRow, Serialize, Deserialize)]
pub struct OTHER_DATASET_REL {
    WE_CD: Option<i64>,
    CATEGORY: Option<String>,
    SUB_CATEGORY: Option<String>,
    EVENT_TYPE: Option<String>,
    EVENT_CURRENCYCODE: Option<String>,
    EVENT_AMOUNT: Option<String>,
    EVENT_EVIDENCEID: Option<String>,
    EVENT_DATE: Option<String>,
}
#[derive(FromRow, Serialize, Deserialize)]
pub struct OTHER_DATASET_DD {
    WE_CD: Option<i64>,
    CASE_REF: Option<String>,
    REASON: Option<String>,
    CONDUCT: Option<String>,
    EVIDENCEIDS: Option<String>,
    DATE_FROM: Option<String>,
    DATE_TO: Option<String>,
}
#[derive(FromRow, Serialize, Deserialize)]
pub struct OTHER_DATASET_POI {
    WE_CD: Option<i64>,
    CATEGORY: Option<String>,
    EVIDENCEIDS: Option<String>,
    POSITION: Option<String>,
    SEGMENT: Option<String>,
    COUNTRYISOCODE: Option<String>,
    DATE_ELECTION: Option<String>,
    DATE_FROM: Option<String>,
    DATE_TO: Option<String>,
    COUNTRYNAME: Option<String>,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct EVIDENCE {
    WE_CD: Option<i64>,
    ORI_URL: Option<String>,
    TITLE: Option<String>,
    SUMMARY: Option<String>,
    KEYWORD: Option<String>,
    EVIDENCEID: Option<String>,
    CAP_DATE: Option<String>,
    PUB_DATE: Option<String>,
    DATASET: Option<String>,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct BUSINESS_PROFILE {
    WE_CD: Option<i64>,
    NAME: Option<String>,
    ALIAS: Option<String>,
    ADDRESS: Option<String>,
    CONTACT_KEY: Option<String>,
    CONTACT_VALUE: Option<String>,
    IDENTI_KEY: Option<String>,
    IDENTI_VALUE: Option<String>,
    IDENTI_DETAIL_KEY: Option<String>,
    IDENTI_DETAIL_VALUE: Option<String>,
    NATION_NAME: Option<String>,
    NATION_CODE: Option<String>,
    NOTES: Option<String>,
    EU: Option<i8>,
    OFAC_NON_SDN: Option<i8>,
    UN: Option<i8>,
    KOFIU: Option<i8>,
    OFAC_SDN: Option<i8>,
    VES_CALL: Option<String>,
    VES_GROSS: Option<String>,
    VES_TONNAGE: Option<String>,
    VES_FLAG: Option<String>,
    VES_OWNER: Option<String>,
    VES_TYPE: Option<String>,
}

#[get("/api/businessProfile/{wecd}")]
async fn business_profile(pool: web::Data<MySqlPool>, wecd: web::Path<String>) -> impl Responder {
    let query=format!(
        "SELECT WE_CD, NAME,
        ADDRESS,CONTACT_KEY,CONTACT_VALUE,IDENTI_KEY,IDENTI_VALUE,IDENTI_DETAIL_KEY,
        IDENTI_DETAIL_VALUE,NATION_NAME,
        NOTES,NATION_CODE,ALIAS,EU,OFAC_NON_SDN,UN,KOFIU,OFAC_SDN,VES_CALL,VES_GROSS,VES_TONNAGE,VES_FLAG,VES_OWNER,VES_TYPE
        FROM BUSINESS_PROFILE
        WHERE WE_CD = ?"
    );

    let rows: Result<Vec<BUSINESS_PROFILE>, _> = sqlx::query_as(&query)
        .bind(&*wecd)
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

#[get("/api/profile/{wecd}")]
async fn profile_detail(pool: web::Data<MySqlPool>, wecd: web::Path<String>) -> impl Responder {
    let query = format!(
        "SELECT WE_CD, FIRSTNAME, MIDDLENAME, SURNAME, GENDER,
        ADRESS,BIRTHDATE,CONTACT_KEY,CONTACT_VALUE,IDENTI_KEY,IDENTI_VALUE,Nation,
        NOTES,PROFIL_IMG,DATASET,FIRSTNAME_ALIAS,MIDDLENAME_ALIAS,
        SURNAME_ALIAS,WHOLE_NAME_ALIAS,WHOLE_NAME,NATION_NAME,DEATHDATE,EU,OFAC_NON_SDN,UN,KOFIU,OFAC_SDN
        FROM PROFILE_DETAILS
        WHERE WE_CD = ?"
    );

    let rows: Result<Vec<ProfileDetail>, _> = sqlx::query_as(&query)
        .bind(&*wecd)
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

#[get("/api/peppositions/{wecd}")]
async fn pep_positions(pool: web::Data<MySqlPool>, wecd: web::Path<String>) -> impl Responder {
    let query = format!(
        "SELECT WE_CD, PEP_TIER, POSITION_NAME, DATETO, DATEFROM,
        COUNTRY,EVIDENCEID,SEG,CURRENT_CHECK,PEP_ID
        FROM PEP_POSITIONS
        WHERE WE_CD = ?"
    );

    let rows: Result<Vec<PEP_POSITIONS>, _> = sqlx::query_as(&query)
        .bind(&*wecd)
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

#[get("/api/sanctions/{wecd}")]
async fn sanctions(pool: web::Data<MySqlPool>, wecd: web::Path<String>) -> impl Responder {
    let query = format!(
        "SELECT WE_CD, SANCTION_ID, MEASURE, REGIME_ORI, REGIME_BODY,
        REGIME_TYPE,REGIME_NAME,EVENT_TYPE,EVENT_EVIDENCEID,EVENT_DATE,CUR,SAN_NUM
        FROM SANCTION
        WHERE WE_CD = ?",
    );

    let rows: Result<Vec<SANCTIONS>, _> = sqlx::query_as(&query)
        .bind(&*wecd)
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

#[get("/api/associations/{wecd}")]
async fn associations(pool: web::Data<MySqlPool>, wecd: web::Path<String>) -> impl Responder {
    let query = format!(
        "SELECT WE_CD, FIRSTNAME, MIDDLENAME, SURNAME, NAME,
        RELATIONSHIP,QRCODE_RELATION,DATASET,INDIVIDUAL,WE_RELATION,ASSOCIATION_ID
        FROM ASSOCIATION
        WHERE WE_CD = ?"
    );

    let rows: Result<Vec<ASSOCIATIONS>, _> = sqlx::query_as(&query)
        .bind(&*wecd)
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

#[get("/api/risks/{wecd}")]
async fn reputational_risk(pool: web::Data<MySqlPool>, wecd: web::Path<String>) -> impl Responder {
    let query = format!(
        "SELECT WE_CD, CATEGORY, SUB_CATEGORY, EVENT_TYPE, EVENT_EVIDENCEID,
        EVENT_DATE,REPUTAION_ID
        FROM REPUTATION_RISK
        WHERE WE_CD = ?"
    );

    let rows: Result<Vec<REPUTATIONAL_RISK>, _> = sqlx::query_as(&query)
        .bind(&*wecd)
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

#[get("/api/otherrel/{wecd}")]
async fn other_dataset_rel(pool: web::Data<MySqlPool>, wecd: web::Path<String>) -> impl Responder {
    let query = format!(
        "SELECT WE_CD, CATEGORY, SUB_CATEGORY, EVENT_TYPE, EVENT_CURRENCYCODE,EVENT_EVIDENCEID,
        EVENT_AMOUNT,EVENT_DATE
        FROM OTHER_DATASET_REL
        WHERE WE_CD = ?",
    );

    let rows: Result<Vec<OTHER_DATASET_REL>, _> = sqlx::query_as(&query)
        .bind(&*wecd)
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

#[get("/api/otherdd/{wecd}")]
async fn other_dataset_dd(pool: web::Data<MySqlPool>, wecd: web::Path<String>) -> impl Responder {
    let query = format!(
        "SELECT WE_CD, CASE_REF, REASON, CONDUCT,EVIDENCEIDS,
        DATE_FROM,DATE_TO
        FROM OTHER_DATASET_DD
        WHERE WE_CD = ?"
    );

    let rows: Result<Vec<OTHER_DATASET_DD>, _> = sqlx::query_as(&query)
        .bind(&*wecd)
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

#[get("/api/otherpoi/{wecd}")]
async fn other_dataset_poi(pool: web::Data<MySqlPool>, wecd: web::Path<String>) -> impl Responder {
    let query = format!(
        "SELECT WE_CD, CATEGORY, EVIDENCEIDS,POSITION, SEGMENT,COUNTRYISOCODE,
        DATE_ELECTION,DATE_FROM,DATE_TO,COUNTRYNAME
        FROM OTHER_DATASET_POI
        WHERE WE_CD = ?"
    );

    let rows: Result<Vec<OTHER_DATASET_POI>, _> = sqlx::query_as(&query)
        .bind(&*wecd)
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

#[get("/api/evidence/{wecd}")]
async fn evidence(pool: web::Data<MySqlPool>, wecd: web::Path<String>) -> impl Responder {
    let query = format!(
        "SELECT WE_CD, ORI_URL, TITLE, CREDIBILITY, SUMMARY,
        KEYWORD,EVIDENCEID,CAP_DATE,PUB_DATE,DATASET
        FROM EVIDENCE
        WHERE WE_CD = ?"
    );

    let rows: Result<Vec<EVIDENCE>, _> = sqlx::query_as(&query)
        .bind(&*wecd)
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
