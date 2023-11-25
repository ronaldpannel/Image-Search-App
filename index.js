const searchResultEl = document.getElementById("searchResult");
const CardEl = document.getElementById("card");
const searchBtnEl = document.getElementById("searchBtn");
const showMoreBtnEl = document.getElementById("showMoreBtn");
const searchInputEl = document.getElementById("searchInput");
const formEl = document.querySelector("form");

const apiKey = "qlO1NbJkJkB9YVPXQYYTJfOnt6entrTxd8w2mJIrT4E";
let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultEl.innerHTML = "";
  }
  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("card");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultEl.appendChild(imageWrapper);
  });
  page++;

  if (page > 1) {
    showMoreBtnEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtnEl.addEventListener("click", () => {
  searchImages();
});
