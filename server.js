// require() statements will read index.js files in each directory
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// set up Express.js middleware that instructs the server to make certain files available
// and not gated behind server endpoint.
// provide a file path to a location in the app, and instruct server to make these files static resources
// as a result: all front-end code can now be accessed w/o having specific server endpoint created for it
app.use(express.static('public'));

// tell the server that any time client navigates to <ourhost>/api, app will use router we setup in apiRoutes
// if / is endpoint, router will serve back HTML routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);



app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// set a route to the index.html file
// the '/' route directs us to the root route of the server (used to create a homepage for a server)
// this route has one job: respond with an HTML page to display in the browser
// (index.html file never goes to browser, only its contents do)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// set route to animals.html
app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

// set route to zookeepers.html
app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// wildcard route - when client makes request for route that does not exist, wildcard route catches these requests
// wildcard (*) should ALWAYS come last, or it will take precedence over named routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();
  //  if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    // res.status().send is response method ot relay message to client making request
    res.status(400).send('The animal is not properly formatted.');
  } else {
    // add animal to json file and animals array in this fn
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
