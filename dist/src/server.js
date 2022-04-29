"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const InvoiceGenerator = require("./InvoiceGenerator");
const app = express_1.default();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.set("view engine", "ejs");
app.use("/", index_1.default);
const port = 5000;
const runApp = () => {
    app.listen(port, function () {
        console.log("Server listening on http://localhost:" + port);
    });
};
exports.default = runApp;
