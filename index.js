// require('./servicos/clientes');
const customExpress = require('./config/customExpress');
const connection = require('./infra/databases/connection');
const Tables = require('./infra/databases/tables');

connection.connect(err => {
    if (err)
        console.log(err);
    else {
        console.log('conectado com sucesso!');
       
        Tables.init(connection);
        const app = customExpress();
        app.listen(3000,() => console.log('servidor rodando na porta 3000'));
    }
});
