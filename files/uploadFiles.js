const fs = require('fs');
const path = require('path');

module.exports = (filePath, fileName, callbackImageCreated) => {
    const validTypes = ['jpg', 'png', 'jpeg'];
    const type = path.extname(filePath);
    const isValidType = validTypes.indexOf(type.substring(1));
    const newPath = `./assets/images/${fileName}${type}`;

    if (isValidType === -1) {
        console.log('Erro! Tipo inválido');
    } else {
        fs.createReadStream(filePath)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => callbackImageCreated(newPath));
    }
}


