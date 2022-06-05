import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "./env" });

interface dbValidator {
  db_host: string;
  db_user: string;
  db_password: string;
  db_name: string;
  db_port: number;
  access_token: string;
  refresh_token: string;
}

export const dbConfiguration: dbValidator = {
  db_host: "localhost",
  db_user: "root",
  db_password: "",
  db_name: "nibs",
  db_port: 3306,
  access_token: "accesstokenkey",
  refresh_token: "refreshtokenkey",
};

// export const dbConfiguration1: dbValidator = {
//   db_host: "localhost",
//   db_user: "mamasosda_nibs_demo",
//   db_password: "O1]aq&FWqtvh",
//   db_name: "mamasosda_nibs_demo",
//   db_port: 3306,
//   access_token: "accesstokenkey",
//   refresh_token: "refreshtokenkey",
// };