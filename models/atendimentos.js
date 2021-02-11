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
                    res.status(201).json(results);
            }); 
        }
    }
}

module.exports = new Atendimento;