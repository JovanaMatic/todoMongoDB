const express = require('express');
const app = express();

const todoControler = require('./controllers/todoControllers');

// set up template engine

app.set('view engine', 'ejs');

// static fields

//app.use('/assets', express.static('./public'));
app.use(express.static('./public'));

//fire controllers
todoControler(app);


app.listen(3000);
console.log('listening');