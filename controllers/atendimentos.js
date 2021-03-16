const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.list()
            .then(results => res.json(results))
            .catch(errors => res.status(400).json(errors));
    });

    app.post('/atendimentos',(req, res) =>  {
        const atendimento = req.body;
        Atendimento.add(atendimento)
            .then(atendimentoAdded => res.status(201).json(atendimentoAdded))
            .catch(errors => res.status(400).json(errors));
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.find(id)
            .then(result => res.json(result))
            .catch(errors => res.status(400).json(errors));
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;

        Atendimento.update(id, values)
            .then(result => res.json(result))
            .catch(errors => res.status(400).json(errors));
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.delete(id, res);
    });
}
