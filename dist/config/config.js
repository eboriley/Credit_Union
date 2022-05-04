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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfiguration = void 0;
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
