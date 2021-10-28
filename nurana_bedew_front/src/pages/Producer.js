import React from 'react';
import SideBar from '../components/SideBar.js'
import Table from '../components/Countries/Table.js';

const Producer = ()=>{
    return (
        <div className="w-full h-screen bg-gray-50 dark:bg-black dark:text-white">
            <div className="flex flex-row justify-start h-full overflow-y-hidden">
              <SideBar/>
              <Table/>
              </div>
        </div>
    )
}
export default Producer;