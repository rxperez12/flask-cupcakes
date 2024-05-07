const $cupcakesList = document.querySelector('.cupcakes-list');


/** Query API for data on all cupcakes and update the list on page. */
async function setUpPage() {

  const response = await fetch('/api/cupcakes');
  const cupcakesData = await response.json();
  console.log('CUPCAKE DATA', cupcakesData);
  displayCupcakes(cupcakesData);

}

/** Display cupcakes on the homepage. */
function displayCupcakes(cupcakesData) {
  const cupcakes = cupcakesData.cupcakes;

  for (const cupcake of cupcakes) {
    const $cupcakeElem = createCupcakeHTML(cupcake);
    $cupcakesList.appendChild($cupcakeElem);
  }

}

/** Given a cupcake dictionary, create a cupcake HTML display li */
function createCupcakeHTML(cupcake) {
  const $cupcake = document.createElement('li');

  const $cupcakeImage = document.createElement('img');
  $cupcakeImage.src = cupcake.image_url;
  $cupcakeImage.classList.add('cupcake-image');
  $cupcake.appendChild($cupcakeImage);

  const $cupcakeFlavor = document.createElement('div');
  $cupcakeFlavor.innerHTML = cupcake.flavor;
  $cupcakeFlavor.classList.add('flavor');
  $cupcake.appendChild($cupcakeFlavor);

  const $cupcakeSize = document.createElement('div');
  $cupcakeSize.innerHTML = cupcake.size;
  $cupcakeSize.classList.add('size');
  $cupcake.appendChild($cupcakeSize);

  const $cupcakeRating = document.createElement('div');
  $cupcakeRating.innerHTML = cupcake.rating;
  $cupcakeRating.classList.add('rating');
  $cupcake.appendChild($cupcakeRating);

  return $cupcake;
}

document.querySelector('.btn').addEventListener("submit", handleForm);

function handleForm() {

}

export { setUpPage }

