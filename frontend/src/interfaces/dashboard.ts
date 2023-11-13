interface dashboard {
    component:string; 
    total_row:number | null;
    person:number | null;
    entity: number | null;
    changes:number| null;
}


interface status {
    NO:number; 
    DATE:string; 
    TITLE:string; 
    SUB_TITLE:string | null; 
    URL_LINK:string | null; 
    ATTACHMENT:string | null;
}

export type {dashboard,status}