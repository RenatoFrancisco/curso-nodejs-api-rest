const connection = require('../infra/connection');

class Pet {
    adiciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?';

        connection.query(query, pet, err => {
            if (erro) {
                console.log(err);
                res.status(400).json();
            } else {
                res.status(201).json(pet);
            }
        });
    }
}

module.exports = new Pet();