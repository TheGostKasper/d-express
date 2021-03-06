var Pet = require('./pet');

module.exports = function (app) {
    app.post('/api/cat', function (req, res) {
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addPet(element);
            }, this);
        else {
            addPet(req.body);
        }
        res.json({ message: 'cat created successfully', data: _cats });
    });


    function addPet(pet) {
        var _pet = new Pet({
            name: pet.name,
            description: pet.description,
            imageUrl: pet.imageUrl,
            gender: pet.gender,
            type: pet.type,
            price: pet.price,
            age: pet.age,
        }).save(function (err) {
            if (err) throw err;
            console.log('User saved successfully!');
        });
    }

    app.get('/api/cat', function (req, res) {
        Pet.find({}, function (err, pets) {
            if (err) res.send({
                data: null,
                message: JSON.stringify(err)
            });
            res.send({
                data: pets,
                message: "came from db"
            });

        });

    });

    app.get('/api/cat/:id', function (req, res) {
        Pet.find({ _id: req.params.id }, function (err, user) {
            if (err) res.send({
                data: null,
                err: err
            });
            res.send({
                data: user,
                message: "come from db"
            })
        });

    });

    app.put('/api/cat/:id', function (req, res) {
        Pet.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, user) {
            if (err) res.send({
                data: null,
                err: err
            });
            res.send({
                data: user,
                message: "come from db"
            })
        });
    });

    app.delete('/api/cat/:id', function (req, res) {
        _cats = _.remove(_cats, function (cat) {
            return cat.id != req.params.id
        });
        Pet.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) res.send({
                data: null,
                err: err
            });
            res.send({
                data: user,
                message: "cat removed successfully"
            })
        });
    })

   
}