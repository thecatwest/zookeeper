// establish reference to zookeeper form
const $zookeeperForm = document.querySelector("#zookeeper-form");

const $displayArea = document.querySelector('#display-area');

const printResults = resultArr => {
  console.log(resultArr);

  const animalHTML = resultArr.map(({ id, name, age, favoriteAnimal }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Age: ${age}<br/>
      Favorite Animal: ${favoriteAnimal.substring(0, 1).toUpperCase() +
        favoriteAnimal.substring(1)}<br/>
      </p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = animalHTML.join('');
};

// update function so it can handle queries
const getZookeepers = (formData = {}) => {
  let queryUrl = '/api/zookeepers?';

  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });
  
  fetch(queryUrl)
    .then(response => {
      if (!response.ok) {
        return alert(`Error: ' + ${response.statusText}`);
      }
      return response.json();
    })
    .then(zookeeperArr => {
      console.log(zookeeperArr);
      printResults(zookeeperArr);
    });
};

// add a function to handle form data, then pass it as argument to getZookeepers()
// function should take values from form in zookeepers.html and pass them as object to getZookeepers()
const handleGetZookeepersSubmit = event => {
  event.preventDefault();
  // get HTML name value from form
  const nameHTML = $zookeeperForm.querySelector('[name="name"]');
  // set name as the value from HTML name value in form
  const name = nameHTML.value;

  // get HTML age value from form
  const ageHTML = $zookeeperForm.querySelector('[name="age"]');
  // set age as value from HTML age value in form
  const age = ageHTML.value;

  // set zookeeper object as name and age
  const zookeeperObject = { name, age };

  // pass in zookeeperObject to getZookeepers()
  getZookeepers(zookeeperObject);
}

// add submit event listener on zookeeper form (make sure it goes above the function calls)
$zookeeperForm.addEventListener('submit', handleGetZookeepersSubmit);

getZookeepers();
