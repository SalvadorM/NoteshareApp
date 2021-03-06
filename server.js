const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./middlewares/authentication');
const models = require('./models');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

//init app
const app = express();

//cors
app.use(cors())
//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(expressSession(({
    secret: 'keyboard cat - REPLACE ME WITH A BETTER SECRET',
    resave: false,
    saveUninitialized: true,
  }))); 
//other middleware init
app.use(passport.initialize());
app.use(passport.session());

//api routes
const Notes = require('./controllers/api/notes');
const Users = require('./controllers/api/users');
const Account = require('./controllers/api/account');
const Comment = require('./controllers/api/comments');

app.use('/api/notes', Notes);
app.use('/api/user', Users);
app.use('/api/account', Account);
app.use('/api/comments',Comment);
//sync the models and database
//then start the server and listen 
models.sequelize.sync({force: false})
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        });
    });
