var Mongo = require ('./mongodb.js');

exports.renderProfile = function(req,res,next)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongo.find(db, function (docs) {
            if(docs[0]) {
                Mongo.find(db, function (doc) {
                    db.close();
                    res.render('profile', {nom: docs[0].nom || '', prenom: docs[0].prenom || '', email: docs[0].email || '', ville: docs[0].ville || '', cp: docs[0].cp || '', date: docs[0].date || '', attirance: docs[0].attirance || '', sexe: docs[0].sexe || '', description: docs[0].decsription || '', login: docs[0].login || '', answer : req.query.answer, images: doc, deletes : req.query.delete});
                }, {'login': req.session.login}, 'images');
            }
            else {
                res.render('profile_error');
            }
        }, {'login': req.session.login}, 'user');
    });
};

exports.update_profile = function(data, req, res)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongo.update(db, function () {
            db.close();
            res.send('done');
        }, {login :req.session.login},  {$set: data}, 'user');
    });
};

exports.photo_add = function(data, req, res)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongo.insertOne(db, function () {
            db.close();
            res.redirect('http://localhost:3000/profile?answer=yes')
        }, data, 'images');
    });
};

exports.photo_suppr = function(data, req, res)
{
    // Use connect method to connect to the Server
    Mongo.Client.connect(Mongo.url, function(err, db) {
        Mongo.assert.equal(null, err);
        console.log("Connected correctly to server");
        Mongo.delete(db, function (result) {
            db.close();
            res.send('done');
        }, data, 'images');
    });
};