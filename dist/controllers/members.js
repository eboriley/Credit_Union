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
exports.removeMember = exports.updateMember = exports.viewArchivedMembers = exports.viewMembers = exports.addMember = void 0;
const mysqlConn_1 = require("../config/mysqlConn");
const addMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let member = req.body;
    const duplicateSql = `SELECT * FROM members WHERE staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(duplicateSql, [member.staffID], (err, result) => {
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
                ], (err, result) => {
                    if (!err)
                        res.send("Member information added successfully");
                    if (err)
                        res.send("Could not add member information" + err.message);
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
            return res.send(rows);
        if (err)
            return console.error(err);
    });
});
exports.viewMembers = viewMembers;
const viewArchivedMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM members WHERE archived = "true"`;
    mysqlConn_1.mysqlConnection.query(sql, (err, rows) => {
        if (!err)
            return res.send(rows);
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
    ], (err, result) => {
        if (!err)
            return res.send(result);
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
            return res.send("Member succefully removed /n" + result);
        if (err)
            return console.error(err);
    });
});
exports.removeMember = removeMember;
