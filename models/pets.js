const connection = require('../infra/connection');
const uploadFile = require('../files/uploadFiles');

class Pet {
    add(pet, res) {
        const query = 'INSERT INTO Pets SET ?';

        uploadFile(pet.imagem, pet.nome, (newPath) => {
            const newPet = { nome: pet.nome, imagem: newPath, };

            connection.query(query, newPet, err => {
                if (erro) {
                    console.log(err);
                    res.status(400).json();
                } else {
                    res.status(201).json(newPet);
                }
            });
        });
    }
}

module.exports = new Pet();