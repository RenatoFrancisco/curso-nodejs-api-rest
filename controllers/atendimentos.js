const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.list(res);
    });

    app.post('/atendimentos',(req, res) =>  {
        const atendimento = req.body;
        Atendimento.add(atendimento, res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.find(id, res);
    });
}
