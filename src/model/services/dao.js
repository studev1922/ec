import AbstractDAO from './dao/AbstractDAO.js';
import CategoryDAO from './dao/CategoryDAO.js';
import ProductDAO from './dao/ProductDAO.js';
import RoleDAO from './dao/RoleDAO.js';
import UserDAO from './dao/UserDAO.js';
import UserRoleDAO from './dao/UserRoleDAO.js';

export {
    AbstractDAO,
    CategoryDAO,
    ProductDAO,
    RoleDAO,
    UserDAO,
    UserRoleDAO
}

export default {
    categories: new CategoryDAO(),
    products: new ProductDAO(),
    roles: new RoleDAO(),
    authorities: new UserRoleDAO(),
    users: new UserDAO(),
}