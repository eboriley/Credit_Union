import mysql from "mysql";

import { dbConfiguration } from "../config/config";

export const mysqlConnection = mysql.createConnection({
  host: dbConfiguration.db_host,
  user: dbConfiguration.db_user,
  password: dbConfiguration.db_password,
  database: dbConfiguration.db_name,
  port: dbConfiguration.db_port,
  multipleStatements: true,
});

mysqlConnection.connect((err: any): unknown => {
  if (!err) return console.error("Connection successful");
  if (err) return console.error(err, "Connection failed");
});


