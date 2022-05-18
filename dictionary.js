const express=require('express');
//const hbs=require('hbs');
const app=express();
const controller=require('./controllers/word');

// registering path for partial files
//hbs.registerPartials(__dirname+'/views/partials');

// app configuration
//app.set('view engine','hbs');

//middlewares
//serving static content
app.use('/public',express.static(__dirname+'/public'));
app.use('/node_modules',express.static(__dirname+'/node_modules'));
//making the server understand incoming JSON data
app.use(express.json());

//app.routes
app.get('/',(request,response)=>{
    response.sendFile(__dirname+'/dict.html');
});

app.post('/lookup',(request,response)=>{
    controller
    .lookupString(request.body)
    .then((words)=>{
        response.send(words);
    });
});
app.post('/suggestions',(request,response)=>{
    controller
    .getSuggestions(request.body)
    .then((words)=>{
        response.json(words);
    });
     
});
//app.get('/wordOfTheDay',home)
//app.get('/pronounciation',home)

// app port
app.listen(8080);