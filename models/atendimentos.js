const moment = require('moment');
const connection = require('../infra/connection');

class Atendimento {
    
    add(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const isValidDate = moment(data).isSameOrAfter(dataCriacao);
        const isCustomerValid = atendimento.cliente.length >= 5;

        const validations = [
            {
                name: 'data',
                valid: isValidDate,
                message: 'Data deve ser maior ou igual a data atual'
            },
            {
                name: 'cliente',
                valid: isCustomerValid,
                message: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const errs = validations.filter(field => !field.valid);
        const errorsExists = errs.length;

        if (errorsExists) {
            res.status(400).json(errs);
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            const sql = 'INSERT INTO Atendimentos SET ?';
    
            connection.query(sql, atendimentoDatado, (err, results) => {
                if (err) 
                    res.status(400).json(err);
                else
                    res.status(201).json({atendimento});
            }); 
        }
    }

    list(res) {
        const sql = 'SELECT * FROM Atendimentos;';
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(results);
            }
        });
    }

    find(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id};`
        connection.query(sql, (err, results) => {
            const atendimento = results[0];
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(atendimento);
            }
        });
    }

    update(id, values, res) {
        if (values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?';
        connection.query(sql, [values, id], (err, results) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json({... values, id});
            }
        });
    }

    delete(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?';
        connection.query(sql, id, (err, results) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Atendimento;