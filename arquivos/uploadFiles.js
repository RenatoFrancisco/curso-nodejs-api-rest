const fs = require('fs');

fs.readFile('./assets/salsicha.jpeg', (err, buffer) => {
    console.log('imagem foi bufferizada');
    console.log(buffer);

    fs.writeFile('./assets/salcicha2.jpeg', buffer, err => {
        console.log('A imagem foi escrita');
    });
});