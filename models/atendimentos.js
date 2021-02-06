const connection = require('../infra/connection');

class Atendimento {
    
    add(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?';

        connection.query(sql, atendimento, (err, results) => {
            if (err) 
                console.log(err)
            else
                console.log(results);
        });        
    }
}

module.exports = new Atendimento;