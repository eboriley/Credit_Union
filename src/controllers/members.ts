import { mysqlConnection } from "../config/mysqlConn";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";

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
  institution: string;
  password: string;
  type: string;
  beneficiary_1: string;
  beneficiary_2: string;
  beneficiary_3: string;
};

type User = {
  staff_id: string;
  password: string;
};

export const addMember = async (req: Request, res: Response): Promise<void> => {
  let member: Member = req.body;
  console.log(member);
  const duplicateSql: string = `SELECT * FROM members WHERE staff_id = ?`;
  mysqlConnection.query(
    duplicateSql,
    [member.staff_id],
    async (err, result) => {
      if (!err) {
        if (result.length > 0) {
          res.json({ error: "Member already exists" });
        } else {
          const hashedPassword = await bcrypt.hash(member.password, 10);
          const sql: string = `INSERT INTO members (staff_id, f_name, surname, other_name, photo, dob, gender,
          phone_1, phone_2, email, next_of_kin, next_of_kin_phone, relationship, archived, status, institution,password,type,beneficiary_1,beneficiary_2,beneficiary_3)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)`;
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
              member.institution,
              hashedPassword,
              member.type,
              member.beneficiary_1,
              member.beneficiary_2,
              member.beneficiary_3,
            ],
            (err, result) => {
              if (!err) res.json("Member information added successfully");
              if (err)
                res.json("Could not add member information" + err.message);
            }
          );
        }
      }
      if (err) return res.json(err);
    }
  );
};

export const login = async (req: Request, res: Response): Promise<void> => {
  let user: User = req.body;
  const sql: string = `SELECT * from members WHERE staff_id = ?`;
  mysqlConnection.query(sql, [user.staff_id], async (err, rows) => {
    if (!err) {
      try {
        if (await bcrypt.compare(user.password, rows[0].password)) {
          const { staff_id, f_name, surname, email, type, photo } = rows[0];

          res.json({ staff_id, f_name, surname, email, type, photo });
        } else {
          res.send("Incorrect Username or password");
        }
      } catch (error) {
        return error;
      }
    }
    if (err) return res.json(err);
  });
};

export const viewMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM members WHERE status = "active"`;
  mysqlConnection.query(sql, (err, rows): unknown => {
    if (!err) return res.json(rows);
    if (err) return res.json(err);
  });
};
export const viewMembersByTerm = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM members WHERE staff_id LIKE ? OR f_name LIKE ? OR surname LIKE ? OR gender LIKE ? AND status = "active"`;
  mysqlConnection.query(
    sql,
    [
      "%" + req.params.term + "%",
      "%" + req.params.term + "%",
      "%" + req.params.term + "%",
      "%" + req.params.term + "%",
    ],
    (err, rows): unknown => {
      if (!err) return res.json(rows);
      if (err) return res.json(err);
    }
  );
};

export const viewMemberById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM members WHERE staff_id = ? AND archived = "false"`;
  mysqlConnection.query(sql, [req.params.id], (err, rows): unknown => {
    if (!err) return res.json(rows);
    if (err) return res.json(err);
  });
};

export const viewArchivedMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `SELECT * FROM members WHERE archived = "true"`;
  mysqlConnection.query(sql, (err, rows): unknown => {
    if (!err) return res.json(rows);
    if (err) return res.json(err);
  });
};

export const updateMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  let member: Member = req.body;
  const sql: string = `UPDATE members SET f_name = ?, surname = ?, other_name = ?,
    photo = ?, dob = ?, gender = ?, phone_1 = ?, phone_2 = ?, email = ?, next_of_kin = ?,
    next_of_kin_phone = ?, relationship = ?, archived = ?, status = ?, institution = ?, password = ?,
    type = ?, beneficiary_1 = ?, beneficiary_2 = ?, beneficiary_3 = ? WHERE staff_id = ?`;
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
      member.institution,
      member.password,
      member.type,
      member.beneficiary_1,
      member.beneficiary_2,
      member.beneficiary_3,
      req.params.id,
    ],
    (err, result): unknown => {
      if (!err) return res.json(result);
      if (err) return res.json(err);
    }
  );
};

export const archiveMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  let member: Member = req.body;
  const sql: string = `UPDATE members SET f_name = ?, surname = ?, other_name = ?,
    photo = ?, dob = ?, gender = ?, phone_1 = ?, phone_2 = ?, email = ?, next_of_kin = ?,
    next_of_kin_phone = ?, relationship = ?, archived = ?, status = ?, institution = ? WHERE staff_id = ?`;
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
      member.institution,
      req.params.id,
    ],
    (err, result): unknown => {
      if (!err) return res.json(result);
      if (err) return res.json(err);
    }
  );
};

export const removeMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sql: string = `DELETE FROM members WHERE staff_id = ?`;
  mysqlConnection.query(sql, [req.params.id], (err, result): unknown => {
    if (!err) return res.json("Member deleted successfully");
    if (err) return res.json(err);
  });
};
