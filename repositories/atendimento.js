const query = require('../infra/databases/queries');

class Atendimento {
    add(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?';
        return query(sql, atendimento);
    }
}

module.exports = new Atendimento();