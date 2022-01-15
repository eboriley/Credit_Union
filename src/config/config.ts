interface dbValidator {
    db_host : string 
    db_user : string 
    db_password : string
    db_name : string
    db_port : number
    access_token : string
    refresh_token : string
}

export const dbConfiguration : dbValidator = {
    db_host:"localhost",
    db_user: "root",
    db_password: "",
    db_name: "nk_isl_credit_union",
    db_port: 3307,
    access_token:"accesstokenkey",
    refresh_token: "refreshtokenkey"
}
