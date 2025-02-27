const apiUrl = "https://fakestoreapi.com/products";
let products = [];
let selectedCategory = null;

const fetchProducts = async () => {
    try {
        const cachedData = localStorage.getItem("products");

        if (cachedData) {
            products = JSON.parse(cachedData); displayProducts(products)
        }
        const response = await fetch(apiUrl);
        const newProducts = await response.json();
        localStorage.setItem("products", JSON.stringify(newProducts));
        products = newProducts;
        displayProducts(products);
        populateCategories(products);
    } catch (error) {
        console.log(error);
    }
};

const displayProducts = async (items) => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    if (items.length === 0) {
        productList.innerHTML = " <p>No products Found</p>";
        return;
    }
    items.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>Price: ${product.price}</p>
            <button onclick="showSimilarProducts(\`${product.category}\`)">Similar Products</button> `;
        productList.appendChild(productCard);
    });
}
// fetchProducts();

const showSimilarProducts = (category) => {
    selectedCategory = category;
    const similarProducts = products.filter(product => product.category === category);
    displaySimilarProducts(similarProducts);
}
const displaySimilarProducts = (items) => {
    const similarProducts = document.getElementById("similar-products");
    similarProducts.innerHTML = "";
    if (items.length === 0) {
        similarProducts.innerHTML = "<p>No Similar Products Found</p>";
        return;
    }
    items.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>Price: ${product.price}</p>`
        similarProducts.appendChild(productCard)
    })
}
const filterByPrice = () => {
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
    const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    displayProducts(filteredProducts);
};

let debounceTimeout;
const debounceSearch = () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(searchProduct, 300);
}
const searchProduct = () => {
    const query = document.getElementById("search").value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
    displayProducts(filteredProducts);
};
const populateCategories = (items) => {
    const categorySelect = document.getElementById("categoryFilter");
    categorySelect.innerHTML = `<option value="all">all</option>`; 
    const categories = [...new Set(items.map(product => product.category))];
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
};
const filterByCategory = () => {
    const selectedCategory = document.getElementById("categoryFilter").value;

    if (selectedCategory === "all") {
        displayProducts(products); 
    } else {
        const filteredProducts = products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    }
};
document.addEventListener("DOMContentLoaded", fetchProducts);