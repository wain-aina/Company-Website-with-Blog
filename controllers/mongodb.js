const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/StuffDB", {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => {
    console.log('MongoDB Cluster Connected');
});

module.exports = mongoose;