"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMember = exports.updateMember = exports.viewArchivedMembers = exports.viewMemberById = exports.viewMembers = exports.addMember = void 0;
const mysqlConn_1 = require("../config/mysqlConn");
const addMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let member = req.body;
    const duplicateSql = `SELECT * FROM members WHERE staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(duplicateSql, [member.staff_id], (err, result) => {
        if (!err) {
            if (result.length > 0) {
                res.send("Member already exists");
            }
            else {
                const sql = `INSERT INTO members (staff_id, f_name, surname, other_name, photo, dob, gender,
          phone_1, phone_2, email, next_of_kin, next_of_kin_phone, relationship, archived, status)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                mysqlConn_1.mysqlConnection.query(sql, [
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
                ], (err, result) => {
                    if (!err)
                        res.json("Member information added successfully");
                    if (err)
                        res.json("Could not add member information" + err.message);
                });
            }
        }
        if (err)
            return console.error(err);
    });
});
exports.addMember = addMember;
const viewMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM members WHERE status = "active"`;
    mysqlConn_1.mysqlConnection.query(sql, (err, rows) => {
        if (!err)
            return res.json(rows);
        if (err)
            return console.error(err);
    });
});
exports.viewMembers = viewMembers;
const viewMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM members WHERE staff_id = ? AND status = "active"`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, rows) => {
        if (!err)
            return res.json(rows);
        if (err)
            return console.error(err);
    });
});
exports.viewMemberById = viewMemberById;
const viewArchivedMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM members WHERE archived = "true"`;
    mysqlConn_1.mysqlConnection.query(sql, (err, rows) => {
        if (!err)
            return res.json(rows);
        if (err)
            return console.error(err);
    });
});
exports.viewArchivedMembers = viewArchivedMembers;
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let member = req.body;
    const sql = `UPDATE members SET f_name = ?, surname = ?, other_name = ?,
    photo = ?, dob = ?, gender = ?, phone_1 = ?, phone_2 = ?, email = ?, next_of_kin = ?,
    next_of_kin_phone = ?, relationship = ?, archived = ?, status = ? WHERE staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [
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
    ], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return console.error(err);
    });
});
exports.updateMember = updateMember;
const removeMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let member = req.body;
    const sql = "UPDATE members SET archived = ?, status = ? WHERE staff_id = ?";
    mysqlConn_1.mysqlConnection.query(sql, [member.archived, member.status, req.params.id], (err, result) => {
        if (!err)
            return res.json("Member succefully removed /n" + result);
        if (err)
            return console.error(err);
    });
});
exports.removeMember = removeMember;
