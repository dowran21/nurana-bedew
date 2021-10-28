import React, { useContext } from 'react';
import SideBar from '../components/SideBar.js'
import Table from '../components/Orders/Table.js';
import { Context } from '../index.js';

const Orders = ()=>{
    const admin = useContext(Context)
    return (
        <div className="w-full bg-gray-50 dark:bg-black dark:text-white">
            <div className="flex flex-row justify-start h-full overflow-y-hidden">
              <SideBar/>
            <div className="flex flex-row w-full justify-between items-start">
                 <Table/>
            </div>           
              </div>
        </div>
    )
}
export default Orders;