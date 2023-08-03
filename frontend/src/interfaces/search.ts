interface searchResult {
    data:{
    WE_CD:number;
    PROFILE_IMAGE:string | null;
    WHOLE_NAME:string |null; 
    TRUE_NAME:string | null;
    BIRTHDATE:string | null;
    DATA_SET:string | null;
    NATION_CODE:string | null;
    NATION_NAME:string | null;
    }[],
    total:number;
}


interface businessResult {
    data:{
        WE_CD:number;
        NAME:string | null;
        NATION_CODE: string | null; 
        NATION_NAME: string | null; 
        TRUE_NAME: string | null; 
    }[],
    total:number;
}

export type {searchResult,businessResult}