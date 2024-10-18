import { Sequelize } from "sequelize";

const sequelize = new Sequelize("railway", "root", "mfZQSlflaJeuKjJOwRhFuQCGIrmbDikB", {
    host: "junction.proxy.rlwy.net",
    port: 26752,
    dialect: "mysql"
})
// mysql://root:mfZQSlflaJeuKjJOwRhFuQCGIrmbDikB@junction.proxy.rlwy.net:26752/railway
try{
    console.log("Está conectado ao banco")
    sequelize.authenticate()
}catch(error){
    console.log(`Erro ao conectar ao banco: ${error}`)
}

export default sequelize