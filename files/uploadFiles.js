const fs = require('fs');

module.exports = (path, fileName, callbackImageCreated) => {
    const newPath = `./assets/images/${fileName}`;

    fs.createReadStream(path)
        .pipe(fs.createWriteStream(newPath))
        .on('finish', () => callbackImageCreated(newPath));
}


