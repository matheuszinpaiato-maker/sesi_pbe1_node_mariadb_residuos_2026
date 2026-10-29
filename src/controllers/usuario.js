const con = require('../db')

const login = (req, res) => {
    const {email, senha} = req.body
    const sql = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = password(?);'
    con.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ erro: 'Erro ao listar usuarios' })
        } else {
            if (results.length == 0) {
                res.status(404).json("Acesso negado, credenciais invalidas")
            } else{
                res.json(results)
            }
        }
    })
}

const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?));'
        con.query(sql, [nome, email, senha], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar usuário' })
            } else {
                const novoUsuario = req.body
                novoUsuario.id = results.insertId
                res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: novoUsuario })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe { nome, email, senha }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM usuario;'
    con.query(sql, (err, results) => {
        if (err) {
        } else {
            res.json(results)
        }
    })
}

const alterar = (req, res) => {
    const { id } = req.params
    const { nome, email, senha } = req.body

    const query = 'UPDATE usuario SET nome = ?, email = ?, senha = password(?) WHERE id = ?;'
    con.query(query, [nome, email, senha, id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao alterar usuario' })
        } else {
            res.json({ message: 'Usuario alterado com sucesso', results })
        }
    })
}

const excluir = (req, res) => {
    const { id } = req.params

    const query = 'DELETE FROM usuario WHERE id = ?;'
    con.query(query, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao excluir usuario' })
        } else {
            res.json({ message: 'Usuario excluido com sucesso' })
        }
    })
}

module.exports = {
    login,
    cadastrar,
    listar,
    alterar,
    excluir
}