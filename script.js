const apiUrl = "https://fakestoreapi.com/products";

const fetchProducts = async () => {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error(error);
    }
};

const displayProducts = async (products) => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    if (products.length === 0) {
        productList.innerHTML = " <p>No Products Found</p>";
        return;
    }
    products.forEach(product => {
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
fetchProducts();