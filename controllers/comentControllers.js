import { where } from "sequelize"
import Coment from "../models/Coment.js"
import User from "../models/User.js"
class comentControllers {
    
    static home (req, res){
        res.render("home")
    }

    static async delete (req, res){
        const {id} = req.params
        await Coment.destroy({where:{id:id}})
        res.redirect("/coment/dashboard")
    }

    static async edit(req, res){
        const {id} = req.params
        const result = await Coment.findOne({where:{id:id}})
        res.render("edit/edit", {result})
        
    }

    static async editPost(req, res){
        const {title, content, id} = req.body
        await Coment.update({title: title, content: content},{where:{id:id}})
        res.redirect("/coment/dashboard")
    }

    static async showComent(req,res){

        const coments = await Coment.findAll({include: User})
        
        res.render("home", {coments})

    }

    static async showDashboard(req,res){

        const id = req.session.UserId

        const coments = await User.findOne({where:{id:id},include:Coment, plain: true})
        console.log(coments)

        if(coments != 0){
            const coment = coments.Coments.map((e) => e.dataValues);
            res.render("dashboard/dashboard", {coment})
        }else {
            res.render("dashboard/dashboard")
        }
    }

    static async comentPost(req,res){
        const {title, content} = req.body
        const UserId = req.session.UserId
        const coment = {
            title, 
            content,
            UserId,
        }
        try {
            await Coment.create(coment)
            req.session.save(()=>{
                res.redirect("/coment/dashboard")
            })
        }catch(error){console.log(`Ocorreu um erro ao postar comentário: ${error}`)}
    }
}

export default comentControllers