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
MongoClient.connect('mongodb+srv:finalweb-z5kte.mongodb.net/tienda', {
    auth: {
        user: 'Thamior',
        password: 'ClaveSegura1.'
    }
}, function (err, client) {
    if (err) throw err;

    db = client.db('tienda');

    // Iniciar servidor
    app.listen(process.env.PORT || 4321);
});
/*Esta parte es para cargar las paginas*/
//taller 1
app.get('/', (req, res) => {
    res.render('index', {
        tittle: "Home"
    });
})
// final 
app.get('/playlist', (req, res) => {
    res.render('playlist', {
        tittle: "PlayList"
    });
})

app.get('/carrito', (req, res) => {
    res.render('carrito', {
        tittle: "Carrito"
    });
})

app.get('/buscador', (req, res) => {

    var prod = db.collection('productos')
        .find();

    if (req.query.genero)
        prod.filter({
            genero: req.query.genero
        });

    if (req.query.idioma)
        prod.filter({
            idioma: req.query.idioma
        });

    if (req.query.clasificacion)
        prod.filter({
            clasificacion: req.query.clasificacion
        });

    if (req.query.biblioteca)
        prod.filter({
            biblioteca: parseInt(req.query.biblioteca)
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

app.get('/productosPorIds', (req, res) => {
    var arreglo = req.query.id.split(',');
    arreglo = arreglo.map(function (id) {
        return new ObjectID(id);
    });

    var prod = db.collection('productos')
        .find({
            _id: {
                $in: arreglo
            }
        })
        .toArray((err, result) => {
            res.send(result);
        });
});

app.get('/buscador/libro/:nombre', (req, res) => {
    db.collection('productos').find({
        nombre: req.params.nombre
    }).toArray((err, result) => res.render('koow', {
        lib: result[0],
        tittle: "Libros"
    }))

});