import { Sequelize } from "sequelize";

const sequelize = new Sequelize("railway", "root", "jcygEUZDFkvKXYyAfymPbsdCJLMwKVOp", {
    host: "junction.proxy.rlwy.net",
    port: 17914,
    dialect: "mysql"
})

try{
    console.log("Está conectado ao banco")
    sequelize.authenticate()
}catch(error){
    console.log(`Erro ao conectar ao banco: ${error}`)
}

export default sequelize