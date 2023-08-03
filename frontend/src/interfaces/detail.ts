interface Evidence {
    WE_CD : number; 
    ORI_URL:string | null; 
    TITLE:string | null; 
    SUMMARY:string | null; 
    KEYWORD:string | null; 
    EVIDENCEID:string | null; 
    CAP_DATE:string | null; 
    PUB_DATE:string | null; 
    DATASET:string | null;
}


interface BusinessProfile {
    WE_CD:number,
    NAME:string | null,
    ALIAS:string | null,
    ADDRESS:string | null,
    CONTACT_KEY:string | null,
    CONTACT_VALUE:string | null,
    IDENTI_KEY:string | null,
    IDENTI_VALUE:string | null,
    IDENTI_DETAIL_KEY:string | null, 
    IDENTI_DETAIL_VALUE:string | null,
    NATION_NAME:string | null,
    NATION_CODE:string | null,
    NOTES:string | null,
    EU:number, 
    OFAC:number, 
    UN:number, 
    KOFIU:number, 
    OFAC_SDN:number,
    VES_CALL:string | null,
    VES_GROSS:string | null,
    VES_TONNAGE:string | null,
    VES_FLAG:string | null,
    VES_OWNER:string | null,
    VES_TYPE:string | null,
}

interface ProfileDetail {
    WE_CD:number,
    FIRSTNAME:string | null,
    MIDDLENAME:string | null,
    SURNAME:string | null,
    GENDER:string | null,
    ADRESS:string | null,
    BIRTHDATE: string | null,
    CONTACT_KEY:string | null,
    CONTACT_VALUE:string | null,
    IDENTI_KEY:string | null,
    IDENTI_VALUE:string | null,
    Nation:string | null,
    NOTES:string | null,
    PROFIL_IMG:string | null,
    DATASET:string | null,
    FIRSTNAME_ALIAS: string | null,
    MIDDLENAME_ALIAS:string | null,
    SURNAME_ALIAS:string | null,
    WHOLE_NAME:string | null,
    NATION_NAME:string | null,
    DEATHDATE:string | null
}

interface PEP_POSITIONS{
    WE_CD:number,
    PEP_TIER:string | null,
    POSITION_NAME:string | null,
    DATETO:string | null,
    DATEFROM:string | null,
    COUNTRY:string | null,
    EVIDENCEID:string | null,
    SEG:string | null,
    CURRENT_CHECK:number,
    PEP_ID:number,
    evidences?:Evidence[] 

}
interface SANCTIONS{
    WE_CD:number,
    SANCTION_ID:string,
    MEASURE:string | null,
    REGIME_ORI:string | null,
    REGIME_BODY:string | null,
    REGIME_TYPE:string | null,
    REGIME_NAME:string | null,
    EVENT_TYPE:string | null,
    EVENT_EVIDENCEID:string | null,
    EVENT_DATE:string | null,
    CUR:number | null,
    SAN_NUM:number | null,
    evidences?:Evidence[] 
 events?: {
        type:string; 
        date:string; 
        evidenceId:string;
        evidences:Evidence[]
    }[]
}

interface ASSOCIATIONS{
    WE_CD:number;
    FIRSTNAME:string | null; 
    MIDDLENAME:string | null; 
    SURNAME:string | null; 
    NAME:string | null; 
    RELATIONSHIP:string | null; 
    QRCODE_RELATION:number | null;
    DATASET:string | null; 
    INDIVIDUAL:number; 
    WE_RELATION:number;
    ASSOCIATION_ID:number;
}

interface REPUTATIONAL_RISK{
    WE_CD:number;
    CATEGORY:string | null; 
    SUB_CATEGORY:string | null; 
    EVENT_TYPE:string | null; 
    EVENT_EVIDENCEID:string | null; 
    EVENT_DATE:string | null;
    REPUTATION_ID:number;
    events?: {
        type:string; 
        date:string; 
        evidenceId:string;
        evidences:Evidence[]
    }[]
}

interface OTHER_DATASET_REL{
    WE_CD:number; 
    CATEGORY:string | null; 
    SUB_CATEGORY:string | null;
    EVENT_TYPE:string | null; 
    EVENT_CURRENCYCODE:string | null;
    EVENT_AMOUNT:string | null; 
    EVENT_EVIDENCEID:string | null; 
    EVENT_DATE:string | null;
    events?:{type:string, evidences:Evidence[], date:string, evidenceId:string, eventAmount:string, eventCurrencyCode:string};
}

interface OTHER_DATASET_DD{
    WE_CD:number;
    CASE_REF:string | null; 
    REASON:string | null; 
    CONDUCT:string | null; 
    EVIDENCEIDS:string | null; 
    DATE_FROM:string | null; 
    DATE_TO:string | null;
    evidences?:Evidence[]
}


interface OTHER_DATASET_POI{
    WE_CD:number;
    CATEGORY:string | null;
    EVIDENCEIDS:string | null; 
    POSITION:string | null;
    SEGMENT:string | null;
    COUNTRYISOCODE:string | null; 
    DATE_ELECTION:string | null; 
    DATE_FROM:string | null;
    DATE_TO:string | null;
    evidences?:Evidence[];
    COUNTRYNAME:string|null;
}


export type {BusinessProfile,ProfileDetail,PEP_POSITIONS,SANCTIONS,Evidence,ASSOCIATIONS,REPUTATIONAL_RISK,OTHER_DATASET_DD,OTHER_DATASET_POI,OTHER_DATASET_REL}
