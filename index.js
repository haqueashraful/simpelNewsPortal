// Define loader
let loader = document.getElementById("loading");

const showCatagory = async () => {
  loader.classList.remove("hidden");

  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await response.json();
  let store = data.data.news_category;
  handleCatagory(store);
};

const handleSearch = () => {
  const inputText = document.getElementById("search-box").value;
  if (inputText) {
    showNews(inputText);
  } else {
    alert("please search ");
  }
};

// Show Catagory  STEP==> 1
// ************************************************
const handleCatagory = (store) => {
  const container = document.getElementById("category-bar-container");
  store.forEach((item) => {
    let div = document.createElement("div");
    let button = document.createElement("button");
    button.textContent = item.category_name;
    button.classList.add("btn", "bg-sky-300", "text-black", "p-1", "w-auto");
    button.onclick = () => showNews(item.category_id); // Attach event handler
    div.appendChild(button);
    container.appendChild(div);
  });
};
// ************************************************
// Show News  STEP==> 2

const showNews = async (id = "08") => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${id}`
  );
  const data = await response.json();
  let dataFetch = data.data;
  if (dataFetch.length === 0) {
    alert("no data found");
  } else {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    if (dataFetch.length > 0) {
      loader.classList.add("hidden");
    }

    dataFetch.forEach((item) => {
      const { details, image_url, title, _id } = item;
      const { number, badge } = item.rating;
      const { name, img, published_date } = item.author;
      let div = document.createElement("div");
      div.classList = "mb-5"
      div.innerHTML = `
        <div class="card lg:card-side flex justify-between items-center bg-base-100 lg:w-3/4 mx-auto shadow-xl">
          <figure class="lg:w-1/2">
            <img class="w-full" src="${image_url}" alt="Album">
          </figure>
          <div class="card-body flex-auto lg:w-1/2 space-y-5">
            <div class="lg:flex justify-between items-start">
              <div>
                <h2 class="card-title">${title}</h2>
              </div>
              <div>
                <div class="indicator">
                  <span class="indicator-item badge badge-secondary">${number}</span>
                  <button class="btn">${badge}</button>
                </div>
              </div>
            </div>
            <p>${details.slice(0, 200)}</p>
            <div class="justify-around flex items-center">
              <div class="lg:flex justify-between items-center gap-2">
                <div>
                  <div class="avatar">
                    <div class="w-24 rounded-full">
                      <img src="${img}">
                    </div>
                  </div>
                </div>
                <div class="space-y-5">
                  <h2>${name}</h2>
                  <p>${published_date}</p>
                </div>
              </div>
              <div class="lg:flex justify-between items-center gap-2">
                <div>${(item.total_view && item.total_view) || 0} views</div>
                <div class="card-actions justify-end">
                  <button onclick="handleDetails('${_id}')" class="btn btn-primary">Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      newsContainer.appendChild(div);
    });
  }
};

const handleDetails = async (Did) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/news/${Did}`);
  const data = await res.json();
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  data.data.forEach((item) => {
    const { details, image_url, title, _id } = item;
    const { number, badge } = item.rating;
    const { name, img, published_date } = item.author;
    let div = document.createElement("div");
    div.innerHTML = `
      <div class="card lg:card-side flex flex-col justify-between items-center bg-base-100 lg:w-3/4 mx-auto shadow-xl">
        <figure class="w-1/2">
          <img class="w-full" src="${image_url}" alt="Album">
        </figure>
        <div class="card-body flex-auto lg:w-1/2">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="card-title">${title}</h2>
            </div>
            <div>
              <div class="indicator">
                <span class="indicator-item badge badge-secondary">${number}</span>
                <button class="btn">${badge}</button>
              </div>
            </div>
          </div>
          <p>${details}</p>
          <div class="justify-around flex items-center">
            <div class="flex justify-between items-center gap-2">
              <div>
                <div class="avatar">
                  <div class="w-24 rounded-full">
                    <img src="${img}">
                  </div>
                </div>
              </div>
              <div class="space-y-5">
                <h2>${name}</h2>
                <p>${published_date}</p>
              </div>
            </div>
            <div class="flex justify-between items-center gap-2">
              <div>${(item.total_view && item.total_view) || 0}</div>
              <div class="card-actions justify-end">
                <button onclick="handleHome()" class="btn btn-primary">Home</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    newsContainer.appendChild(div);
  });

};
function handleHome() {
    window.location.reload();
}

showNews();
showCatagory();
