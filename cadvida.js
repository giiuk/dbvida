//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

//configurando o express para o postman e usar a página
const app = express();
app.use(bodyParser.json());
const port = 3000

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/dbvida", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//criando a model do projeto
const UsuarioSchema = new mongoose.Schema({
    nome: {type : String},
    email : {type: String, required: true},
    endereco: {type: String},
    numero : {type: Number, required: true},
    cep: {type: String, required: true},
    nascimento: {type: Date, required: true }
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//configuração de roteamento
//cadastroUsuário
app.post("/cadastrousuario", async(req, res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const endereco = req.body.endereco
    const numero = req.body.numero
    const cep = req.body.cep
    const nascimento = req.body.nascimento


const usuario = new Usuario({
    nome: nome,
    email: email,
    endereco: endereco,
    numero: numero,
    cep: cep,
    nascimento: nascimento
})

try{
    const newUsuario = await usuario.save();
    res.json({error: null, msg: "Cadastro ok", newUsuario})
} catch(error){}
});

app.get("/", async (req,res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})