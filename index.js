import express from "express"
import exphbs from "express-handlebars"
import flash from "express-flash"
import session from "express-session"
import sessionFile from "session-file-store";

import path from "path"
import os from "os"
import { fileURLToPath } from 'url';

// Obtenha o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Agora você pode usar __dirname normalmente


//models
import Coment from "./models/Coment.js"
import User from "./models/User.js"

//banco de dados 
import db from "./db/conn.js"

//controllers
import comentControllers from "./controllers/comentControllers.js";
import check from "./middlewares/check.js"

//rotas
import authRoutes from "./routes/authRoutes.js"
import comentRoutes from "./routes/comentRoutes.js"

//linkando o file store com o session 
const sessionFileStore = sessionFile(session)

const app = express()
app.use(express.json())

//handlebars
app.engine('hbs', exphbs.engine({

    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }

    }))

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

app.set('views', path.join(currentDirectory, 'views'));
app.set("view engine", "hbs")

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//session
app.use(
    session({
        store: new sessionFileStore({
            logFn: function (){},
            path: path.join(os.tmpdir(),'sessions'),
        }),
        secret: "meu_secreto",
        resave: false,
        saveUninitialized: true,
    })
)

//flash
app.use(flash())


//colocando o session para aparecer em qualquer view
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

//config rotas
app.get("/", check, comentControllers.home)
app.use("/", authRoutes)
app.use("/coment", comentRoutes)

db.sync().then(()=>{
    app.listen(3000)
})



