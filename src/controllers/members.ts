import mysql from "mysql"

import { dbConfiguration } from "../config/config"

const mysqlConnection = mysql.createConnection({
    host: dbConfiguration.db_host,
    user: dbConfiguration.db_user,
    password: dbConfiguration.db_password,
    database: dbConfiguration.db_name,
    port: dbConfiguration.db_port,
    multipleStatements: true,
})

mysqlConnection.connect((err: any) : void => {
    if(!err) return console.error("Connection successful")
    if(err) return console.error(err,"Connection failed")
})

export const addMember = async (req:any, res:any) : Promise<void> => {
    let member: any = req.body;
    const sql = `INSERT INTO members (staff_id, f_name, surname, other_name, photo, dob, gender,
         phone_1, phone_2, email, next_of_kin, next_of_kin_phone, relationship)
       VALUES 
       (?, ?,?,?,?,
       ?, ?,?, ?, ?,
        ?, ?, ?)`;
    mysqlConnection.query(
        sql,
        [
            member.staffID, member.fName, member.surname, member.otherName,
            member.photo, member.dob, member.gender, member.phone1, member.phone2,
            member.email, member.nextOfKin, member.nextOfKinPhone, member.relationship
        ], 
        (err, result) => {
      if (!err) return res.send("member records inserted successfully");
      if (err) return console.error(err);
    });
}

