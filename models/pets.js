const connection = require('../infra/databases/connection');
const uploadFile = require('../infra/files/uploadFiles');

class Pet {
    add(pet, res) {
        const query = 'INSERT INTO Pets SET ?';

        uploadFile(pet.imagem, pet.nome, (err, newPath) => {

            if (err) {
                res.status(400).json({err});
            } else {

                const newPet = { nome: pet.nome, imagem: newPath, };
                connection.query(query, newPet, err => {
                    if (err) {
                        console.log(err);
                        res.status(400).json();
                    } else {
                        res.status(201).json(newPet);
                    }
                });
            }
        });
    }
}

module.exports = new Pet();