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

  //WHY IS IT ONLY A NUMBER?????
  //Create element
  for (const cupcake of cupcakes) {
    console.log(cupcake);
    const $cupcake = document.createElement('li');

    const $cupcakeImage = document.createElement('img');
    $cupcakeImage.src = cupcake.image_url;
    $cupcake.appendChild($cupcakeImage);
    const $cupcakeFlavor = document.createElement('p');
    $cupcakeFlavor.innerHTML = cupcake.flavor;
    $cupcake.appendChild($cupcakeFlavor);


    // const $cupcakeImage = document.createElement('img');
    // const $cupcakeImage = document.createElement('img');
    $cupcakesList.appendChild($cupcake);
  }

}

document.querySelector('.btn').addEventListener("submit", handleForm);

function handleForm() {

}

export { setUpPage }

