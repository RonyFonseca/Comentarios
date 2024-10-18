import User from "../models/User.js"
class authControllers {
    static showLogin(req, res){
        res.render("auth/login")
    }

    static async logout(req, res){
        req.session.destroy()
        res.redirect("/login")
    }

    static async loginPost(req, res){
        const {email , password} = req.body
        
        const user = await User.findOne({where:{email:email}})
        
        try{
            req.session.UserId = user.id
            req.session.save(()=>{
                res.redirect("/coment/home")
            })
        }catch(error){console.log(`Erro ao fazer login: ${error}`)}
    }

    static showRegister(req, res){
        res.render("auth/register")
    }

    static async registerPost(req, res){
        const {password, confirmPassword, email, name} = req.body

        if(password != confirmPassword){
            console.log("Senhas diferentes")
            return
        }

        const userExist = await User.findOne({where:{email:email}})

        if(userExist){
            console.log("Usuário já existe no seu bando de dados")
            return
        }

        const user = {
            name, 
            email,
            password,
        }

        try{
            const usuario = await User.create(user)
            req.session.UserId = usuario.id
            req.session.save(()=>{
                res.redirect("/coment/home")
            })
        }catch(error){
            console.log(`Ocorreu um erro: ${error}`)
        }

        
    }
    
}

export default authControllers