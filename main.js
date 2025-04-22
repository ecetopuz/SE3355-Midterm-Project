document.addEventListener("DOMContentLoaded", function () {
  populateMainSlider();
  populateElektronikSlider();
  renderProducts();
  populateQuickLinks();
});

// Campaign links
function populateQuickLinks() {
  const quickLinksContainer = document.getElementById("quick-links");
  const apiURL = "https://run.mocky.io/v3/e053b0ad-aca2-491f-a433-4384aa35acbb";

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      data.forEach(campaign => {
        const link = document.createElement("a");
        link.href = campaign.link;
        link.target = "_blank";
        link.classList.add("quick-link-card");

        const img = document.createElement("img");
        img.src = campaign.iconUrl;
        img.alt = "Campaign Image";

        link.appendChild(img);
        quickLinksContainer.appendChild(link);
      });
    })
    .catch(error => {
      console.error("API Hatası:", error);
    });
}

// Products
async function renderProducts() {
  try {
    const response = await fetch("https://run.mocky.io/v3/01dd2227-fbde-4384-b23f-23e834fd9484");
    const products = await response.json();
    const productCardsContainer = document.getElementById('product-cards');
    productCardsContainer.innerHTML = "";

    products.forEach(product => {
      const col = document.createElement('div');
      col.classList.add('col-6', 'col-md-2', 'col-lg-2');

      const card = document.createElement('div');
      card.classList.add('product-card', 'card');

      card.innerHTML = `
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <div class="rating">${getStars(product.rating)}</div>
          <p class="price">${product.price}</p>
        </div>
      `;

      col.appendChild(card);
      productCardsContainer.appendChild(col);
    });
  } catch (error) {
    console.error("Ürünler alınamadı:", error);
  }
}

// Stars
function getStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating
      ? '<span class="star">&#9733;</span>'
      : '<span class="star">&#9734;</span>';
  }
  return stars;
}

// Main slider
async function populateMainSlider() {
  const container = document.querySelector("#mainSlider .carousel-inner");

  try {
    const response = await fetch("https://run.mocky.io/v3/f4511f60-2580-4543-a8aa-92e24686c911");
    const data = await response.json();

    data.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "carousel-item" + (index === 0 ? " active" : "");

      div.innerHTML = `
        <img src="${item.image}" class="d-block w-100" alt="${item.title}">
        <div class="carousel-caption d-block">
          <h5>${item.title}</h5>
          <p>${item.description}</p>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Slider verileri yüklenemedi:", error);
  }
}
// Electronic slider
async function populateElektronikSlider() {
  const container = document.querySelector("#elektronikSlider .carousel-inner");

  try {
    const response = await fetch("https://run.mocky.io/v3/2e424288-88fd-401c-a3d1-66f0039bb928");
    const data = await response.json();

    data.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "carousel-item" + (index === 0 ? " active" : "");

      div.innerHTML = `
        <div class="card mx-auto" style="width: 18rem;">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.price}</p>
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Elektronik slider verileri yüklenemedi:", error);
  }
}
