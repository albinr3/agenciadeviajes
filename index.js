import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from 'dotenv'

//here we use the enviaroment variables
dotenv.config({path: "variables.env"})

const app = express();

//connect to the db
db.authenticate()
    .then( () => console.log("Db connected!"))
    .catch( error => console.log(error))

//define port for the app
const port = process.env.PORT || 4000;

//define the host fot the app
const host = process.env.HOST || "0.0.0.0";

//activate pug
app.set("view engine", "pug");

//get the actual year
app.use( (req, res, next) => {
    
    //we  use res.locals because express create locals variables so we can use them everywhere
    const year = new Date();
    res.locals.actualYear = year.getFullYear();

    next();
})

//define public folder
app.use(express.static("public"));

//add body parser to read the info from the testimonials form
app.use(express.urlencoded( {extended: true} ))

//add router
app.use("/", router);


//assignment the host and port to the app
app.listen(port, host, () => {console.log(`El servidor esta corriendo desde el puerto ${port}`)});