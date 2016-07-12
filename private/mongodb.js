exports.Client = require('mongodb').MongoClient;
exports.url = 'mongodb://localhost:27017/';
exports.assert = require('assert');
var assert = require('assert');

exports.insertOne = function(db, callback, data, collection_in) {
    // Get the documents collection
    var collection = db.collection(collection_in);
    // Insert some documents
    collection.insertOne(data, function(err, result) {
        assert.equal(err, null);
        callback(result);
    });
};

exports.insertMany = function(db, callback, data, collection_in) {
    // Get the documents collection
    var collection = db.collection(collection_in);
    // Insert some documents
    collection.insertOne(data, function(err, result) {
        assert.equal(err, null);
        callback(result);
    });
};

exports.update = function (db, callback, where, value, collection_in) {
    // Get the documents collection
    var collection = db.collection(collection_in);
    // Update document where a is 2, set b equal to 1
    collection.updateMany(where, value, function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            callback(result);
        });
};

exports.delete = function (db, callback, data, collection_in) {
    // Get the documents collection
    var collection = db.collection(collection_in);
    // Insert some documents
    collection.deleteOne(data, function (err, result) {
        console.log(result);
        callback(result);
    });
};

exports.find = function (db, callback, data, collection_in) {
    // Get the documents collection
    var collection = db.collection(collection_in);
    // Find some documents
    collection.find(data).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
};