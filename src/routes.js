const express = require("express")
const router = express.Router()

const usuario = require('./controllers/usuario')
const ocorrencias = require('./controllers/ocorrencias')

const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

router.get('/',rotaInicial)
router.post('/usuarios/login',usuario.login)
router.get('/usuarios',usuario.listar)
router.post('/usuarios',usuario.cadastrar)
router.put('/usuarios/:id',usuario.alterar)
router.delete('/usuarios/:id',usuario.excluir)

router.get('/',rotaInicial)
router.get('/ocorrencias',ocorrencias.listar)
router.post('/ocorrencias',ocorrencias.cadastrar)
router.put('/ocorrencias/:id',ocorrencias.alterar)
router.delete('/ocorrencias/:id',ocorrencias.excluir)



module.exports = router