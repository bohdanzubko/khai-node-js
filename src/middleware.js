// middleware.js

// A simple middleware function that logs the request details
function logRequest(req, res, next) {
    console.log(`Received a ${req.method} request to ${req.url}`);
    next(); // Call the next middleware function in the chain
}

function blockSpecialId(req, res, next) {
    const blockedIds = [3, 5, 9]; // Blocked IDs
    const { id } = req.params;

    if (blockedIds.includes(parseInt(id))) {
        res.status(403).send(`Product with ID ${id} is unavailable`);
    } else {
        next();
    }
}
 
function blockSpecialBrand(req, res, next) {
    if (req.params.brand === 'Brand C') {
        res.status(403).send('Unavailable Brand');
    } else {
        next();
    }
}
 
 module.exports = { logRequest, blockSpecialId, blockSpecialBrand };