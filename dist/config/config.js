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
exports.dbConfiguration = {
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
