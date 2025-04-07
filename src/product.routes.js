const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');
const { blockSpecialId } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});

// handle GET request for path /products/:id
router.get('/products/:id', blockSpecialId, (request, response) => {
    const { id } = request.params; // Access the id parameter from the URL
 
    // Find the product based on the id parameter
    const product = products.find(product => product.id == parseInt(id));
 
    response.json(product); // Send the filtered product as a JSON response
});

// handle get request for path /products/brand/:brand
router.get('/products/brand/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL

   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);

   response.json(filteredProducts); // Send the filtered products as a JSON response
});

// Route that throws an error
router.get('/productswitherror', (request, response) => {
    let err = new Error("processing error ");
    err.statusCode = 400;
    throw err;
});

module.exports = router;