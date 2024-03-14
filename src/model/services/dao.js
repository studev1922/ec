import AbstractDAO from './dao/AbstractDAO.js';
import CategoryDAO from './dao/CategoryDAO.js';
import ProductDAO from './dao/ProductDAO.js';
import UserDAO from './dao/UserDAO.js';

export {
    AbstractDAO,
    CategoryDAO,
    ProductDAO,
    UserDAO
}

export default {
    categories: new CategoryDAO(),
    products: new ProductDAO(),
    users: new UserDAO(),
}