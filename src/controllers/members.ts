import { mysqlConnection } from "../config/mysqlConn";
import { Request, Response, NextFunction } from "express";

type Member = {
  staffID: string;
  fName: string;
  surname: string;
  otherName?: string;
  photo?: string;
  dob: string;
  gender: string;
  phone1: string;
  phone2?: string;
  email?: string;
  nextOfKin: string;
  nextOfKinPhone: string;
  relationship: string;
  archived: string;
  status: string;
};

export const addMember = async (req: Request, res: Response): Promise<void> => {
  let member: Member = req.body;
  const duplicateSql: string = `SELECT * FROM members WHERE staff_id = ?`;
  mysqlConnection.query(duplicateSql, [member.staffID], (err, result) => {
    if (!err) {
      if (result.length > 0) {
        res.send("Member already exists");
      } else {
        const sql: string = `INSERT INTO members (staff_id, f_name, surname, other_name, photo, dob, gender,
          phone_1, phone_2, email, next_of_kin, next_of_kin_phone, relationship, archived, status)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        mysqlConnection.query(
          sql,
          [
            member.staffID,
            member.fName,
            member.surname,
            member.otherName,
            member.photo,
            member.dob,
            member.gender,
            member.phone1,
            member.phone2,
            member.email,
            member.nextOfKin,
            member.nextOfKinPhone,
            member.relationship,
            member.archived,
            member.status,
          ],
          (err, result) => {
            if (!err) res.send("Member information added successfully");
            if (err) res.send("Could not add member information" + err.message);
          }
        );
      }
    }
    if (err) return console.error(err);
  });
};

export const viewMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM members WHERE status = "active"`;
  mysqlConnection.query(sql, (err, rows): unknown => {
    if (!err) return res.send(rows);
    if (err) return console.error(err);
  });
};

export const viewArchivedMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM members WHERE archived = "true"`;
  mysqlConnection.query(sql, (err, rows): unknown => {
    if (!err) return res.send(rows);
    if (err) return console.error(err);
  });
};

export const updateMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  let member: Member = req.body;
  const sql: string = `UPDATE members SET f_name = ?, surname = ?, other_name = ?,
    photo = ?, dob = ?, gender = ?, phone_1 = ?, phone_2 = ?, email = ?, next_of_kin = ?,
    next_of_kin_phone = ?, relationship = ?, archived = ?, status = ? WHERE staff_id = ?`;
  mysqlConnection.query(
    sql,
    [
      member.fName,
      member.surname,
      member.otherName,
      member.photo,
      member.dob,
      member.gender,
      member.phone1,
      member.phone2,
      member.email,
      member.nextOfKin,
      member.nextOfKinPhone,
      member.relationship,
      member.archived,
      member.status,
      req.params.id,
    ],
    (err, result): unknown => {
      if (!err) return res.send(result);
      if (err) return console.error(err);
    }
  );
};

export const removeMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  let member: Member = req.body;
  const sql: string =
    "UPDATE members SET archived = ?, status = ? WHERE staff_id = ?";
  mysqlConnection.query(
    sql,
    [member.archived, member.status, req.params.id],
    (err, result): unknown => {
      if (!err) return res.send("Member succefully removed /n" + result);
      if (err) return console.error(err);
    }
  );
};
