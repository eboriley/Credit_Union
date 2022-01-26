import { mysqlConnection } from "../config/mysqlConn";
import { Request, Response, NextFunction } from "express";

type Member = {
  staff_id: string;
  f_name: string;
  surname: string;
  other_name?: string;
  photo?: string;
  dob: string;
  gender: string;
  phone_1: string;
  phone_2?: string;
  email?: string;
  next_of_kin: string;
  next_of_kin_phone: string;
  relationship: string;
  archived: string;
  status: string;
};

export const addMember = async (req: Request, res: Response): Promise<void> => {
  let member: Member = req.body;
  const duplicateSql: string = `SELECT * FROM members WHERE staff_id = ?`;
  mysqlConnection.query(duplicateSql, [member.staff_id], (err, result) => {
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
            member.staff_id,
            member.f_name,
            member.surname,
            member.other_name,
            member.photo,
            member.dob,
            member.gender,
            member.phone_1,
            member.phone_2,
            member.email,
            member.next_of_kin,
            member.next_of_kin_phone,
            member.relationship,
            member.archived,
            member.status,
          ],
          (err, result) => {
            if (!err) res.json("Member information added successfully");
            if (err) res.json("Could not add member information" + err.message);
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
    if (!err) return res.json(rows);
    if (err) return console.error(err);
  });
};

export const viewMemberById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM members WHERE staff_id = ? AND status = "active"`;
  mysqlConnection.query(sql, [req.params.id], (err, rows): unknown => {
    if (!err) return res.json(rows);
    if (err) return console.error(err);
  });
};

export const viewArchivedMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM members WHERE archived = "true"`;
  mysqlConnection.query(sql, (err, rows): unknown => {
    if (!err) return res.json(rows);
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
      member.f_name,
      member.surname,
      member.other_name,
      member.photo,
      member.dob,
      member.gender,
      member.phone_1,
      member.phone_2,
      member.email,
      member.next_of_kin,
      member.next_of_kin_phone,
      member.relationship,
      member.archived,
      member.status,
      req.params.id,
    ],
    (err, result): unknown => {
      if (!err) return res.json(result);
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
      if (!err) return res.json("Member succefully removed /n" + result);
      if (err) return console.error(err);
    }
  );
};
