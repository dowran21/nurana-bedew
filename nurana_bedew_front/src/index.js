import React, { createContext, Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProductStore from './store/ProductStore';
import AdminStore from './store/AdminStore';
import UsersStore from './store/UsersStore';
import './index.css'
export const Context = createContext (null)
// import Suspense from ''

ReactDOM.render(
  <Context.Provider value = {{
    admin : new AdminStore(),
    products: new ProductStore(),
    user: new UsersStore()
  }}>
    <Suspense fallback={<div>Loading... </div>}>
        <App/>
    </Suspense>,
   
  </Context.Provider>,
  document.getElementById('root')
);
