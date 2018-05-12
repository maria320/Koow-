const MongoClient = require('mongodb').MongoClient
    ObjectID = require('mongodb').ObjectID,
    express = require('express'),
    engines = require('consolidate');

var app = express(),
    db;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static('public'));

// Conectarse a Base de Datos
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;

    db = client.db('test');

    // Iniciar servidor
    app.listen(4321);
});
/*Esta parte es para cargar las paginas*/
app.get('/', (req, res) => {
    res.render('index', {
        tittle: "Home"
    });
})

app.get('/buscador', (req, res) => {

    var prod = db.collection('koows')
        .find();
    
        if (req.query.tematica)
        prod.filter({
            tematica: req.query.tematica
        });

    if (req.query.idioma)
        prod.filter({
            idioma: req.query.idioma
        });

    if (req.query.editorial)
        prod.filter({
            editorial: req.query.editorial
        });

    if (req.query.calificacion)
        prod.filter({
            calificacion: parseInt(req.query.calificacion)
        });

    prod.toArray((err, result) => {
            console.log('hola servidor')
            res.render('buscador', {
                productos: result
            });
        });
});

app.get('/checkout', (req, res) => {
    res.render('checkout');
});


app.get('/producto/:id', (req, res) => {
    db.collection('productos').find({ modelo: req.params.id }).toArray((err, result) => res.send(result))
});




app.get('/reco/specific/:nombre', (req, res) => {
    db.collection('libros').find({
        nombre: req.params.nombre
    }).toArray((err, result) => res.render('specific', {
        libro: result[0],
        tittle: "Specific"
    }))

});


app.get('/productosPorIds', (req, res) => {
    console.log(req.query.ids);
    var arreglo = req.query.ids.split(',');
    arreglo = arreglo.map(function (id) {
        return new ObjectID(id);
    });
    var prod = db.collection('libros')
        .find({
            _id: {
                $in: arreglo
            }
        })
        .toArray((err, result) => {
            res.send(result);
        });
});

//holiiiiiiiiiii