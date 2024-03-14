import AbstractDAO from './dao/AbstractDAO.js';
import CategoryDAO from './dao/CategoryDAO.js';
import ProductDAO from './dao/ProductDAO.js';

export {
    AbstractDAO,
    CategoryDAO,
    ProductDAO
}

export default {
    categories: new CategoryDAO(),
    products: new ProductDAO()
}