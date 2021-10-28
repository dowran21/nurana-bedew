import Auth from './pages/Auth.js';
import Category from './pages/Category'
import Producer from './pages/Producer.js';
import MainPage from './pages/MainPage.js';
import Product from './pages/Product.js';
import Products from './pages/Products.js';
import Orders from './pages/Orders.js'
import { CATEGORY_ROUTE, COUNTRY_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE, ORDERS_ROUTE, PRODUCTS_ROUTE, PRODUCT_ROUTE, USERS_ROUTE } from './utils/consts.js';
import Users from './pages/Users.js';

export const auth_routes = [
    {
        path : CATEGORY_ROUTE,
        Component : Category
    },
    {
        path : COUNTRY_ROUTE,
        Component : Producer
    },
    {
        path : PRODUCTS_ROUTE,
        Component : Products
    },
    {
        path : PRODUCT_ROUTE + '/:id',
        Component : Product
    },
    {
        path : ORDERS_ROUTE,
        Component : Orders
    },
    {
        path : USERS_ROUTE,
        Component : Users
    }
];

export const login_routes = [
    {
        path : LOGIN_ROUTE,
        Component : Auth
    }
];