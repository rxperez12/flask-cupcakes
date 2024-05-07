const qs = document.querySelector.bind(document);
const $cupcakesList = document.querySelector('.cupcakes-list');
const $cupcakeForm = qs('.cupcake-form');


/** Query API for data on all cupcakes and update the list on page. */
async function setUpPage() {

  const response = await fetch('/api/cupcakes');
  const cupcakesData = await response.json();

  displayCupcakes(cupcakesData);
  $cupcakeForm.addEventListener("submit", handleForm);

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

async function handleForm(evt) {
  evt.preventDefault();

  const flavor = qs('.flavor-input').value;
  const size = qs('.size-input').value;
  const rating = qs('.rating-input').value;
  const image_url = qs('.image-input').value;

  console.log(JSON.stringify({ flavor, size, rating, image_url }));

  const response = await fetch(`/api/cupcakes`, {
    method: "POST",
    body: JSON.stringify({
      flavor,
      rating,
      size,
      image_url,
    }),
    headers: {
      "content-type": "application/json",
    }
  });

  const data = await response.json();

  const addedCupcake = data.cupcake;
  $cupcakesList.appendChild(createCupcakeHTML(addedCupcake));
}

setUpPage()


