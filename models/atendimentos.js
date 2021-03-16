const { default: axios } = require('axios');
const moment = require('moment');
const connection = require('../infra/databases/connection');
const repository = require('../repositories/atendimento');

class Atendimento {
    
    constructor() {

        this.isValidDate = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao);
        this.isCustomerValid = ({ len }) => len >= 5;

        this.validate = parameters =>
        this.validations.filter(field => {
            const { name } = field
            const parameter = parameters[name]

            return !field.valid(parameter)
        })

        this.validations = [
            {
                name: 'data',
                valid: this.isValidDate,
                message: 'Data deve ser maior ou igual a data atual'
            },
            {
                name: 'cliente',
                valid: this.isCustomerValid,
                message: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];
    }

    add(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const parameters = {
            data: { data, dataCriacao },
            cliente: { len: atendimento.cliente.length }
        };

        const errs = this.validate(parameters);
        const errorsExists = errs.length;

        if (errorsExists) {
            return new Promise((resolve, reject) => reject(errs));
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            return repository.add(atendimentoDatado)
                .then(results => {
                    const id = results.insertId;
                    return { ...atendimento, id };
                });
        }
    }

    list() {
        return repository.list();
    }

     find(id) {
        return repository.find(id);;
    }

    update(id, values) {
        if (values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        return repository.update(id, values)
    }

    delete(id,) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?';
        return repository.delete(id);
    }
}

module.exports = new Atendimento;