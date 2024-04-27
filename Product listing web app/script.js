const productGrid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

// Function to fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to render products
function renderProducts(products) {
    productGrid.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
        productGrid.appendChild(productItem);
    });
}

// Function to filter products by category
function filterProductsByCategory(products, category) {
    if (!category) return products;
    return products.filter(product => product.category === category);
}

// Function to search products by title
function searchProducts(products, searchTerm) {
    if (!searchTerm) return products;
    searchTerm = searchTerm.toLowerCase();
    return products.filter(product => product.title.toLowerCase().includes(searchTerm));
}

// Function to sort products by price
function sortProducts(products, sortOrder) {
    return products.slice().sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
}

// Event listeners
categoryFilter.addEventListener('change', updateProducts);
searchInput.addEventListener('input', updateProducts);
sortSelect.addEventListener('change', updateProducts);

// Function to update products based on filters and search
async function updateProducts() {
    const products = await fetchProducts();
    let filteredProducts = filterProductsByCategory(products, categoryFilter.value);
    filteredProducts = searchProducts(filteredProducts, searchInput.value);
    const sortedProducts = sortProducts(filteredProducts, sortSelect.value);
    renderProducts(sortedProducts);
}

// Initialize product listing on page load
updateProducts();
