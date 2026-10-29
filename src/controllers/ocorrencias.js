const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, local, tipoResiduo, nivelRisco, status } = req.body
    try {
        const sql = 'INSERT INTO ocorrencia (usuarioId, local, tipoResiduo, nivelRisco, status) VALUES (?, ?, ?, ?, ?);'
        con.query(sql, [usuarioId, local, tipoResiduo, nivelRisco, status], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar ocorrencia' })
            } else {
                const novaOcorrencia = req.body
                novaOcorrencia.id = results.insertId
                res.status(201).json({ message: 'Ocorrencia cadastrada com sucesso', ocorrencia: novaOcorrencia })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar ocorrencia', details: 'Informe { usuarioId, local, tipoResiduo, nivelRisco, status }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM ocorrencia;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar ocorrencias' })
        } else {
            res.json(results)
        }
    })
}

const alterar = (req, res) => {
    const { id } = req.params
    const { usuarioId, local, tipoResiduo, nivelRisco, status } = req.body

    const query = 'UPDATE ocorrencia SET usuarioId = ?, local = ?, tipoResiduo = ?, nivelRisco = ?, status = ? WHERE id = ?;'
    con.query(query, [usuarioId, local, tipoResiduo, nivelRisco, status, id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao alterar ocorrencia' })
        } else {
            res.json({ message: 'Ocorrencia alterada com sucesso' })
        }
    })
}

const excluir = (req, res) => {
    const { id } = req.params

    const query = 'DELETE FROM ocorrencia WHERE id = ?;'
    con.query(query, [id], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao excluir ocorrencia' })
        } else {
            res.json({ message: 'Ocorrencia excluida com sucesso' })
        }
    })
}

module.exports = {
    cadastrar,
    listar,
    alterar,
    excluir
}