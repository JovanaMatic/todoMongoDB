const bodyParser = require('body-parser');
const urlParser = bodyParser.urlencoded({ extended: false });

const mongoose = require('mongoose');
//connect to the db
mongoose.connect('mongodb+srv://test:test@cluster0-8vdaq.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//create schema - blueprint for DB
const todoSchema = new mongoose.Schema({
    item: String
});

//create todo model => model name that is going to be stored in mongoDB

const Todo = mongoose.model('Todo', todoSchema);
// const itemOne = Todo({item: 'kupi hleb'}).save(function(err) {
//     if(err) throw err;
//     console.log('item saved');
// });


module.exports = function(app) {
    //get data from mongodb and pass it to the view
    app.get('/todos', function(req, res) {
        Todo.find({}, function(err,data) {
            if(err) throw err;
            res.render('todos', {todo: data});   
        });
    })

    app.post('/todos', urlParser, function(req, res) {
        //get data from the view and add it to mongoDB
        const newTodo = Todo(req.body).save(function(err,data) {
            if(err) throw err;
            res.json({todo: data});
        })
    });

    app.delete('/todos/:item', function(req, res) {
        //delete the requested item from mongoDB
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err,data) {
            if(err) throw err;
            res.json({todo: data});
        })
    });
}