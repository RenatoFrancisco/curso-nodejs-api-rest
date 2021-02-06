const customExpress = require('./config/customExpress');
const connection = require('./infra/connection');

connection.connect(err => {
    if (err)
        console.log(err);
    else {
        console.log('conectado com sucesso!');
        
        const app = customExpress();
        app.listen(3000,() => console.log('servidor rodando na porta 3000'));
    }
});
