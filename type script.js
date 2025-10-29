// ======== PRODUCT DATA ========
const products = [
  { id: 1, name: "Smartphone", category: "Electronics", price: 499, image: "images/phone.jpg" },
  { id: 2, name: "Headphones", category: "Electronics", price: 199, image: "images/headphones.jpg" },
  { id: 3, name: "T-Shirt", category: "Fashion", price: 29, image: "images/tshirt.jpg" },
  { id: 4, name: "Jeans", category: "Fashion", price: 59, image: "images/jeans.jpg" },
  { id: 5, name: "Coffee Maker", category: "Home", price: 99, image: "images/coffeemaker.jpg" },
  { id: 6, name: "Sofa", category: "Home", price: 899, image: "images/sofa.jpg" },
];

// ======== DOM ELEMENTS ========
const productContainer = document.getElementById("product-container");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const searchInput = document.getElementById("search-input");

// ======== DISPLAY PRODUCTS ========
function displayProducts(filteredProducts) {
  productContainer.innerHTML = "";
  if (filteredProducts.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="category">${product.category}</p>
      <p class="price">$${product.price}</p>
    `;
    productContainer.appendChild(card);
  });
}

// ======== FILTER FUNCTION ========
function filterProducts() {
  const selectedCategory = categoryFilter.value;
  const selectedPrice = priceFilter.value;
  const searchText = searchInput.value.toLowerCase();

  let filtered = products.filter(product =>
    product.name.toLowerCase().includes(searchText)
  );

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (selectedPrice !== "all") {
    filtered = filtered.filter(p => {
      if (selectedPrice === "low") return p.price < 100;
      if (selectedPrice === "mid") return p.price >= 100 && p.price <= 500;
      if (selectedPrice === "high") return p.price > 500;
    });
  }

  displayProducts(filtered);
}

// ======== EVENT LISTENERS ========
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);
searchInput.addEventListener("keyup", filterProducts);

// ======== INITIAL DISPLAY ========
displayProducts(products);