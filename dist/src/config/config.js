"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "./env" });
// export const dbConfiguration: dbValidator = {
//   db_host: "localhost",
//   db_user: "eboriley_nibs",
//   db_password: "EqcwaFbytNqWAh9",
//   db_name: "eboriley_nibs",
//   // db_port: 3306,
//   // access_token: "accesstokenkey",
//   // refresh_token: "refreshtokenkey",
// };
exports.dbConfiguration = {
    db_host: "localhost",
    db_user: "root",
    db_password: "",
    db_name: "nibs",
    db_port: 3306,
    access_token: "accesstokenkey",
    refresh_token: "refreshtokenkey",
};
