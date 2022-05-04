"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.removeMember = exports.archiveMember = exports.updateMember = exports.viewArchivedMembers = exports.viewMemberById = exports.viewMembersByTerm = exports.viewMembers = exports.login = exports.addMember = void 0;
const mysqlConn_1 = require("../config/mysqlConn");
const bcrypt = __importStar(require("bcrypt"));
const addMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let member = req.body;
    console.log(member);
    const duplicateSql = `SELECT * FROM members WHERE staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(duplicateSql, [member.staff_id], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (!err) {
            if (result.length > 0) {
                res.json({ error: "Member already exists" });
            }
            else {
                const hashedPassword = yield bcrypt.hash(member.password, 10);
                const sql = `INSERT INTO members (staff_id, f_name, surname, other_name, photo, dob, gender,
          phone_1, phone_2, email, next_of_kin, next_of_kin_phone, relationship, archived, status, institution,password,type,beneficiary_1,beneficiary_2,beneficiary_3)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)`;
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
                    member.institution,
                    hashedPassword,
                    member.type,
                    member.beneficiary_1,
                    member.beneficiary_2,
                    member.beneficiary_3,
                ], (err, result) => {
                    if (!err)
                        res.json("Member information added successfully");
                    if (err)
                        res.json("Could not add member information" + err.message);
                });
            }
        }
        if (err)
            return res.json(err);
    }));
});
exports.addMember = addMember;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.body;
    const sql = `SELECT * from members WHERE staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [user.staff_id], (err, rows) => __awaiter(void 0, void 0, void 0, function* () {
        if (!err) {
            try {
                if (yield bcrypt.compare(user.password, rows[0].password)) {
                    const { staff_id, f_name, surname, email, type, photo } = rows[0];
                    res.json({ staff_id, f_name, surname, email, type, photo });
                }
                else {
                    res.send("Incorrect Username or password");
                }
            }
            catch (error) {
                return error;
            }
        }
        if (err)
            return res.json(err);
    }));
});
exports.login = login;
const viewMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM members WHERE status = "active"`;
    mysqlConn_1.mysqlConnection.query(sql, (err, rows) => {
        if (!err)
            return res.json(rows);
        if (err)
            return res.json(err);
    });
});
exports.viewMembers = viewMembers;
const viewMembersByTerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM members WHERE staff_id LIKE ? OR f_name LIKE ? OR surname LIKE ? OR gender LIKE ? AND status = "active"`;
    mysqlConn_1.mysqlConnection.query(sql, [
        "%" + req.params.term + "%",
        "%" + req.params.term + "%",
        "%" + req.params.term + "%",
        "%" + req.params.term + "%",
    ], (err, rows) => {
        if (!err)
            return res.json(rows);
        if (err)
            return res.json(err);
    });
});
exports.viewMembersByTerm = viewMembersByTerm;
const viewMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM members WHERE staff_id = ? AND archived = "false"`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, rows) => {
        if (!err)
            return res.json(rows);
        if (err)
            return res.json(err);
    });
});
exports.viewMemberById = viewMemberById;
const viewArchivedMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM members WHERE archived = "true"`;
    mysqlConn_1.mysqlConnection.query(sql, (err, rows) => {
        if (!err)
            return res.json(rows);
        if (err)
            return res.json(err);
    });
});
exports.viewArchivedMembers = viewArchivedMembers;
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let member = req.body;
    const sql = `UPDATE members SET f_name = ?, surname = ?, other_name = ?,
    photo = ?, dob = ?, gender = ?, phone_1 = ?, phone_2 = ?, email = ?, next_of_kin = ?,
    next_of_kin_phone = ?, relationship = ?, archived = ?, status = ?, institution = ?, password = ?,
    type = ?, beneficiary_1 = ?, beneficiary_2 = ?, beneficiary_3 = ? WHERE staff_id = ?`;
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
        member.institution,
        member.password,
        member.type,
        member.beneficiary_1,
        member.beneficiary_2,
        member.beneficiary_3,
        req.params.id,
    ], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.updateMember = updateMember;
const archiveMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let member = req.body;
    const sql = `UPDATE members SET f_name = ?, surname = ?, other_name = ?,
    photo = ?, dob = ?, gender = ?, phone_1 = ?, phone_2 = ?, email = ?, next_of_kin = ?,
    next_of_kin_phone = ?, relationship = ?, archived = ?, status = ?, institution = ? WHERE staff_id = ?`;
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
        member.institution,
        req.params.id,
    ], (err, result) => {
        if (!err)
            return res.json(result);
        if (err)
            return res.json(err);
    });
});
exports.archiveMember = archiveMember;
const removeMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `DELETE FROM members WHERE staff_id = ?`;
    mysqlConn_1.mysqlConnection.query(sql, [req.params.id], (err, result) => {
        if (!err)
            return res.json("Member deleted successfully");
        if (err)
            return res.json(err);
    });
});
exports.removeMember = removeMember;
