const fs = require('fs');
const path =  require('path');
const dbPath = path.join(__dirname, '/database.json');

let products = [];
let count = 1;

module.exports.products = {};

// module.exports.products.getAll = () => {
//
//     return products;
// };

module.exports.products.getAll = getProducts;

// module.exports.products.add = (product) => {
//
//     product.id = count++;
//     products.push(product);
// };

module.exports.products.add = (product) => {

    let products = getProducts();
    product.id = products.length + 1;
    products.push(product);

    saveProducts(products);
};

// module.exports.products.findByName = (name) => {
//
//     let product = null;
//     for (let p of products) {
//
//         if (p.name === name) {
//             return p;
//         }
//     }
//
//     return product;
// };

module.exports.products.findByName = (name) => {

    return getProducts().filter(p => p.name.toLowerCase().includes(name));
};

module.exports.products.filter = (searchQuery) => {

    let queryProducts = [];

    for (let p of products) {

        let productName = p.name.toLowerCase();
        if (productName.indexOf(searchQuery.toLowerCase()) >= 0) {
            queryProducts.push(p);
        }
    }

    return queryProducts;
};

function getProducts() {

    fs.readFile(dbPath, (err, data) => {

        if (err) {

            fs.writeFileSync(dbPath, []);
            return [];
        }
    });

    let json = fs.readFileSync(dbPath).toString() || '[]';
    let products = JSON.parse(json);
    return products;
}

function saveProducts(products) {

    let json = JSON.stringify(products);
    fs.writeFileSync(dbPath, json);
}