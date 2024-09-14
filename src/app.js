require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const BLOGS = require('./blogs');

const app = express();
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
      }
    }
  }));
app.use(bodyParser.urlencoded({ extended: false }));

// Configure mustache
app.set('views', `${__dirname}/pages`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

// Render the template
app.get('/', (req, res) => {
    res.render("index", { blogs: BLOGS});
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const matchedBlog = BLOGS.find(blog => blog.id.toString() === id);
    res.render('blog', { blog: matchedBlog, content: matchedBlog.content });
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`)
})
