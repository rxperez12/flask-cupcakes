
/** Query API for data on all cupcakes and update the list on page. */
async function getCupcakes() {

  const response = await fetch('/api/cupcakes');

  const cupcakes_data = await response.json();

  displayCupcakes(cupcakes_data);
}

/** Display cupcakes on the homepage. */
function displayCupcakes(cupcakes_data) {



}

document.querySelector('.btn').addEventListener("submit", handleForm);

function handleForm {

}

