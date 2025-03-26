// Task 2
const productList = document.getElementById('productList')// Gets HTML element for product list
function fetchProductsThen() {
// Fetches data from supplier's product API
    fetch('https://www.course-api.com/javascript-store-products')
    .then(response => {
        if (!response.ok) {
            throw new error('Network Response Was Not OK.')
        }
        return response.json();// Parses response as JSON
    })// Checks if the network response is optimal
    .then(products => {
        products.forEach(product =>{
            const listItem = document.createElement('li')
            listItem.textContent = `${product.fields.name} - $${(product.fields.price / 100).toFixed(2)}`
            productList.appendChild(listItem)
        })
    })
    // Catches any errors that might occur in request
    .catch(error => {
        console.error('Fetch Error:', error)
        productList.innerHTML = '<li style="color: red;"> Error Loading Products </li>'
    })
}
// Task 3
async function fetchProductsAsync() {
    try {
        const response = await fetch(`https://www.course-api.com/javascript-store-products`);
        if (!response.ok){
            throw new Error('Failed To Get Product Data')
        }
        const products = await response.json();
        displayProductCards(products);
    }
    catch(error){
        handleError(error)
    }
}
function displayProducts(products){
    productList.innerHTML = ''; //Clears previous content
    products.forEach(product =>{
        const listItem = document.createElement('li')
        listItem.textContent = `${product.title} = $${product.price / 100}`
        productList.appendChild(listItem)
    })
}

function handleError(error) {
    console.error(`Error In Fetching Products`, error.message);
    productList.innerHTML = '<li style="color: red;">Error loading products. Please try again later.</li>';
}

// Task 4
async function displayProductCards() {
    const container = document.getElementById('product-container')

    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products');
        if (!response.ok){
            throw new Error('Failed To Get Product Data')
        }
        const products = await response.json();

        //Clears previous content
        container.innerHTML= ''
        //Loops through the first 5 products
        products.slice(0, 5).forEach(product =>{
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const img = document.createElement('img')
            img.src = product.fields.image[0].url;
            img.alt = product.fields.name;

            const name = document.createElement('h3')
            name.textContent = product.fields.name;

            const price = document.createElement('p')
            price.textContent = `$${(product.fields.price / 100).toFixed(2)}`
            
            //Appends all elements to card
            productCard.appendChild(img)
            productCard.appendChild(name)
            productCard.appendChild(price)
            // Append to container
            container.appendChild(productCard)
        })
    }catch(error){
        handleError(error);
    }
}
// Task 5
function handleError(error){
    console.log("AN ERROR OCCURED:" + error.message)
    const container = document.getElementById('product-container');
    container.innerHTML = '<p style="color: red;">Error loading products. Please try again.</p>'
}

// Task 6
fetchProductsThen();
fetchProductsAsync();
