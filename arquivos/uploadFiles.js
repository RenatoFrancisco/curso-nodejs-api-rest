const fs = require('fs');

fs.createReadStream('./assets/salsicha.jpeg')
    .pipe(fs.createWriteStream('./assets/salsicha-stream.jpeg'))
    .on('finish', () => console.log('Imagem foi escrita com sucesso'));
