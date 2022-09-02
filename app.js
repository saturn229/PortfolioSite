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
        const err = new Error();
        err.status = 404;
        err.message = 'This Project Doesn\'t Exist!'
        next(err);
    }
});



app.listen(3000, () => {
    console.log("The application is runnin on localhost 3000")
});

