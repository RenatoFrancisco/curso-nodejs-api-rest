const query = require('../infra/databases/queries');

class Atendimento {
    add(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?';
        return query(sql, atendimento);
    }

    list() {
        const sql = 'SELECT * FROM Atendimentos;';
        return query(sql);
    }
}

module.exports = new Atendimento();