import "./styles.css";

/**
 * API we'll be calling from:
 *
 * https://jsonplaceholder.typicode.com/users
 */

const $app = document.querySelector("#app");
const $template = document.createElement("template");
$template.innerHTML = `
  <ul id="cards"></ul>
  <div id="pagination">
    <button id="more-button">More</button>
    <button id="less-button" disabled>Less</button>
  </div>
`;
$app.appendChild($template.content.cloneNode(true));
const $cards = document.querySelector("#cards");
const $lessButton = document.querySelector("#less-button");
const $moreButton = document.querySelector("#more-button");

const itemsPerPage = 3;
let currentPage = 1;
let data = [];

const render = () => {
  $cards.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const usersToDisplay = data.slice(start, end);

  usersToDisplay.forEach((user) => {
    const $newCard = document.createElement("li");
    $newCard.id = "card-item";
    $newCard.innerHTML = `
      <div id="user-info">
        <h2 id="name">${user.name}</h2>
        <h3 id="username">"${user.username}"</h3>
      </div>

      <div id="address">
        <p id="street">${user.address.street}</p>
        <p id="suite">${user.address.suite}</p>
        <p id="city">${user.address.city}</p>
        <p id="zipcode">${user.address.zipcode}</p>
      </div>

      <div id="company">
        <p id="company-name">${user?.company?.name}</p>
        <p id="catchphrase">${user?.company?.catchPhrase}</p>
        <p id="phone-number">${user?.phone}</p>
        <p id="email">${user?.email}</p>
        <p id="website">${user?.website}</p>
      </div>
    `;
    $cards.appendChild($newCard);
  });
};

$moreButton.addEventListener("click", () => {
  currentPage++;
  if (currentPage > 1) {
    $lessButton.removeAttribute("disabled");
  }
  if (currentPage * itemsPerPage >= data.length) {
    $moreButton.setAttribute("disabled", true);
  }
  render();
});

$lessButton.addEventListener("click", () => {
  currentPage--;
  if (currentPage === 1) {
    $lessButton.setAttribute("disabled", true);
  }
  $moreButton.removeAttribute("disabled");
  render();
});

(async () => {
  const $url = "https://jsonplaceholder.typicode.com/users";

  await fetch($url)
    .then((response) => response.json())
    .then((ctx) => {
      data = ctx;
      render();
    })
    .catch((err) => {
      console.log(err);
    });
})();
