import React from 'react';
import Sidebar from '../components/SideBar.js'
import Table from '../components/Categories/Table'

const Category = () =>{
    return (
        <div className="w-full h-screen bg-gray-50 dark:bg-black dark:text-white">
            <div className="flex flex-row justify-start h-full overflow-y-hidden">
              <Sidebar/>
              <Table/>
              </div>
        </div>
    )
}

export default Category;