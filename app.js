const express = require('express');
const { projects } = require('./data/projectsData.json');

const app = express();


app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.locals = { projects }
    res.render('index', { projects })
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.post('/about', (req, res) => {
    res.render('index')
});

app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find(({id}) => id === +projectId);
    if (project) {
        res.render('projects', { project });
    } else {
        const err = new Error('Not Found');
        err.status = 404;
        err.message = 'This Project Doesn\'t Exist!'
        next(err);
    }
});

app.get("/:id", (req, res, next)=>{
    if (req.params.id === "about") {
        res.render("about");
    } else {
        const err = new Error('Not Found');
        err.status = 404;
        console.error(`${err.status} Error: The page you are looking for was ${err.message}`);
        next(err);
    }
});

/**
 *  handles any other routing errors
*/
app.get("/:id/:name", (req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    console.error(`${err.status} Error: The page you are looking for was ${err.message}`);
    next(err);
});

/** renders the error page from the error.pug template */
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});



app.listen(3000, (err) => {
    if (!err) {
        console.log(`Server is Running Correctly, and is Listening on port 3000`);
    } else {
        console.log('An Error Has Occurred and the Server Cannot Start', err);
    }
});
