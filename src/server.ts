import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import router from "./routes/index"
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.set('view engine','ejs');

app.use("/",router);

const port: number = 5000;
app.listen(port, function():void {
    console.log("Server listening on http://localhost:"+port);
})