import React, { useContext } from 'react';
import Table from '../components/Products/Table.js';
import SideBar from '../components/SideBar.js';
import { Context } from '../index.js';

const Products = ()=>{
    const {admin} = useContext(Context) 
    return (
        <div className="w-full h-full bg-gray-50 dark:bg-black dark:text-white">
        <div className="flex flex-row justify-start h-full overflow-y-hidden">
          <SideBar/>
          <div className="flex flex-row w-full h-full justify-between items-start">
          <Table admin = {admin}/>
          </div>
          
          </div>
    </div>
    )
}

export default Products;