const fs = require('fs');
const path = require('path');

module.exports = (filePath, fileName, callbackImageCreated) => {
    const validTypes = ['jpg', 'png', 'jpeg'];
    const type = path.extname(filePath);
    const isValidType = validTypes.indexOf(type.substring(1)) !== -1;
    const newPath = `./assets/images/${fileName}${type}`;

    if (!isValidType) {
        const err = 'Tipo é inválido!';
        console.log('Erro! Tipo inválido');
        callbackImageCreated(err);
    } else {
        fs.createReadStream(filePath)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => callbackImageCreated(false, newPath));
    }
}


