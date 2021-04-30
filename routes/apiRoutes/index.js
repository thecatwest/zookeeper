const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');

// employing Router, having it use module exported from animalRoutes.js
// using apiRoutes/index.js as a central hub for all routing fns we may want to add to the app.
router.use(animalRoutes);

router.use(require('./zookeeperRoutes'));

module.exports = router;