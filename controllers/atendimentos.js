const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => 
        res.send('Você está na roda de atendimento e está realizando um GET'));

    app.post('/atendimentos',(req, res) =>  {
        const atendimento = req.body;
        Atendimento.add(atendimento);
        res.send('=> POST Atendimento');
    });
}
