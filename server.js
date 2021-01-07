var express = require('express');
var handlebars = require('handlebars');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('./config.json');
const {
    v4: uuidv4
} = require('uuid');

var createDB = function (callback) {
    MongoClient.connect(config.db_url, function (err, client) {
        assert.equal(null, err);
        console.log("== Connected successfully to Mongodb");
        var db = client.db(config.db_name);
        // do the instruction
        callback && callback(db);
        client.close();
    });
}

var app = express();
var port = process.env.PORT || config.dev_port;

handlebars.registerHelper('times', function (num, block) {
    var accum = '';
    for (var i = 0; i < num; ++i)
        accum += block.fn(i);
    return accum;
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());


app.get("/", function (req, res) {
    createDB(function (db) {
        db.collection(config.dish_c).find({}).toArray(function (err, result) {
            res.status(200).render('index', {
                dishes: result
            });
        });
    })
})

app.get("/category", function (req, res) {
    createDB(function (db) {
        db.collection(config.category_c).find({}).toArray(function (err, result) {
            res.status(200).send(result);
        });
    })
})

app.post("/dishes", function (req, res) {
    var query = {};
    var body = req.body;
    if (body.name) {
        query.name = body.name;
    }
    if (body.category) {
        query.category = body.category;
    }
    if (body.min && body.max) {
        query.price = {};
        query.price.$gte = parseFloat(body.min);
        query.price.$lte = parseFloat(body.max);
    } else if (body.min) {
        query.price = {};
        query.price.$gte = parseFloat(body.min);
    } else if (body.max) {
        query.price = {};
        query.price.$lte = parseFloat(body.max);
    }
    if (body.spicy && body.spicy.length > 0) {
        query.spicy = {};
        query.spicy.$in = body.spicy;
    }

    console.log(query);
    createDB(function (db) {
        db.collection(config.dish_c).find(query).toArray(function (err, result) {
            // console.log(result)
            res.status(200).send({
                dishes: result
            });
        });
    })
})

app.post("/add", function (req, res) {
    var dish = req.body;
    dish._id = uuidv4();
    console.log(dish);
    createDB(function (db) {
        db.collection(config.dish_c).insertOne(dish, function (err, result) {
            if (err) throw err;
            console.log("== One Dish inserted");

            res.status(200).send({
                code: 1,
                msg: 'success'
            });
        });
    })
})

app.post("/add/category", function (req, res) {
    var c = req.body;
    c._id = uuidv4();
    console.log(c);

    createDB(function (db) {
        db.collection(config.category_c).findOne({
            category: c.category
        }, function (err, result) {
            if (err) throw err;

            if (result) {
                console.log("== One Category found No Insert");
            } else {
                createDB(function (db) {
                    db.collection(config.category_c).insertOne(c, function (err, result) {
                        console.log("== One Category Inserted");
                    })
                })
            }

            res.status(200).send({
                code: 1,
                msg: 'success'
            });
        });
    })

})


// app.post("/edit/:id", function (req, res) {

// })

app.post("/del/:id", function (req, res) {
    var id = req.params.id;
    createDB(function (db) {
        db.collection(config.dish_c).deleteOne({
            _id: id
        }, function (err, result) {
            if (err) throw err;
            console.log("== One Dish deleted");

            res.status(200).send({
                code: 1,
                msg: 'success'
            });
        })
    })

})


app.get('*', function (req, res) {
    res.status(404).render('404', {
        path: req.url
    });
});

app.listen(port, function () {
    console.log("== Server listening on port", port);
})