const products = [
  {
    id: 1,
    name: "Shampoo Hidratante de Argán",
    type: "shampoo",
    price: 15.99,
    description: "Limpieza suave que hidrata en profundidad y reduce el frizz.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Acondicionador Reparador",
    type: "acondicionador",
    price: 13.5,
    description: "Fortalece la fibra capilar y facilita el desenredado.",
    image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Mascarilla Nutritiva Intensa",
    type: "tratamiento",
    price: 19.99,
    description: "Tratamiento profundo semanal para reparar daños.",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Sérum Antifrizz",
    type: "styling",
    price: 11.75,
    description: "Controla el frizz y aporta brillo sin dejar residuos.",
    image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Tónico de Crecimiento",
    type: "tratamiento",
    price: 22,
    description: "Estimula el cuero cabelludo y fortalece desde la raíz.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Shampoo Purificante",
    type: "shampoo",
    price: 14.2,
    description: "Ideal para cuero cabelludo graso, limpia sin resecar.",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop"
  }
];

const filters = ["todos", "shampoo", "acondicionador", "tratamiento", "styling"];
let activeFilter = "todos";
let selectedProduct = products[0];
let cart = JSON.parse(localStorage.getItem("hairglow-cart") || "[]");

const productsGrid = document.querySelector("#products-grid");
const featuredGrid = document.querySelector("#featured-grid");
const filtersWrap = document.querySelector("#filters");
const detailWrap = document.querySelector("#product-detail");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const cartPanel = document.querySelector("#cart");

function renderFeatured() {
  featuredGrid.innerHTML = products.slice(0, 4).map(cardTemplate).join("");
}

function renderFilters() {
  filtersWrap.innerHTML = filters
    .map(
      (f) =>
        `<button class="filter-btn ${f === activeFilter ? "active" : ""}" data-filter="${f}">${f}</button>`
    )
    .join("");
}

function cardTemplate(product) {
  return `<article class="card">
      <img src="${product.image}" alt="${product.name}" />
      <div class="card-body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="card-footer">
          <strong>$${product.price.toFixed(2)}</strong>
          <div>
            <button class="btn btn-secondary" data-view="${product.id}">Ver</button>
            <button class="btn btn-primary" data-add="${product.id}">Añadir</button>
          </div>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const list =
    activeFilter === "todos"
      ? products
      : products.filter((product) => product.type === activeFilter);
  productsGrid.innerHTML = list.map(cardTemplate).join("");
}

function renderDetail() {
  detailWrap.innerHTML = `<div class="product-gallery">
      <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
      <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
    </div>
    <div>
      <p class="eyebrow">${selectedProduct.type}</p>
      <h3>${selectedProduct.name}</h3>
      <p>${selectedProduct.description}</p>
      <p><strong>$${selectedProduct.price.toFixed(2)}</strong></p>
      <button class="btn btn-primary" data-add="${selectedProduct.id}">Comprar ahora</button>
    </div>`;
}

function renderCart() {
  cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
  cartTotal.textContent = `$${cart
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)}`;

  if (!cart.length) {
    cartItems.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `<div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <p>${item.name}</p>
          <small>$${item.price.toFixed(2)} x ${item.qty}</small>
        </div>
        <button class="remove-btn" data-remove="${item.id}">Eliminar</button>
      </div>`
    )
    .join("");
}

function addToCart(id) {
  const product = products.find((item) => item.id === Number(id));
  const inCart = cart.find((item) => item.id === product.id);
  if (inCart) inCart.qty += 1;
  else cart.push({ ...product, qty: 1 });
  localStorage.setItem("hairglow-cart", JSON.stringify(cart));
  renderCart();
}

function removeFromCart(id) {
  cart = cart
    .map((item) => (item.id === Number(id) ? { ...item, qty: item.qty - 1 } : item))
    .filter((item) => item.qty > 0);
  localStorage.setItem("hairglow-cart", JSON.stringify(cart));
  renderCart();
}

document.addEventListener("click", (event) => {
  const filter = event.target.dataset.filter;
  const add = event.target.dataset.add;
  const view = event.target.dataset.view;
  const remove = event.target.dataset.remove;

  if (filter) {
    activeFilter = filter;
    renderFilters();
    renderProducts();
  }
  if (add) addToCart(add);
  if (view) {
    selectedProduct = products.find((item) => item.id === Number(view));
    renderDetail();
    document.querySelector("#producto").scrollIntoView({ behavior: "smooth" });
  }
  if (remove) removeFromCart(remove);
});

document.querySelector(".cart-open").addEventListener("click", () => cartPanel.classList.add("open"));
document.querySelector("#cart-close").addEventListener("click", () => cartPanel.classList.remove("open"));
document.querySelector(".menu-btn").addEventListener("click", () => document.querySelector(".nav").classList.toggle("open"));

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#contact-msg").textContent = "¡Gracias! Te responderemos en menos de 24 horas.";
  event.target.reset();
});

renderFeatured();
renderFilters();
renderProducts();
renderDetail();
renderCart();
