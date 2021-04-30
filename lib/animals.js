// dependencies for this file:
const fs = require("fs");
const path = require("path");

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      // save personalityTraits as a dedicated array
      // if personalityTraits is a string, place it into a new array and save
      if (typeof query.personalityTraits === "string") {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // loop through each trait in personalityTraits array:
      personalityTraitsArray.forEach((trait) => {
        // check trait against each animal in filteredResults array
        // remember that this is initially a copy of animalsArray,
        // but we are updating it for each trait in the .forEach() loop
        // for each trait being targeted by filter, filteredResults
        // array will then contain only entries that contain the trait,
        // so at the end we'll have an array of animals that have every one
        // of the traits when the .forEach() loop is finished
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
  }
  
  function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
  }
  
  function createNewAnimal(body, animalsArray) {
    // our function's main code will go here
    const animal = body;
    animalsArray.push(animal);
    // using fs.writeFileSync() (synchronous version of fs.writeFil()) to write to animals.json
    fs.writeFileSync(
      // path.join() method joins the value of __dirname (the directory of the file executing the code in) with the path to animals.json file
      path.join(__dirname, '../data/animals.json'),
      // save JavaScript array data as JSON; null argument = don't edit existing data
      // 2 = the amount of white space created between variables (makes more legible)
      JSON.stringify({ animals: animalsArray }, null, 2)
    );
    // return finished code to post route for response
    return body;
  }
  
  // function to validate data
  // in POST route's callback before creating and adding data, it will now pass through this function above
  // if any data fails validation, the animal will not be created (see app.post for error)
  function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
      return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
      return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
      return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return false;
    }
    return true;
  }

// export functions using module.exports
module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
  };

//   every time you call express(), like const app = express();, you create a new Express.js object