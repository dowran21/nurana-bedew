import React from 'react';
import {forceUpdate} from 'react'
import Sidebar from '../components/SideBar';
import Table from '../components/Users/Table';
import ModalContainer from '../components/ModalContainer'
import Form from '../components/Users/Form'; 
import {EditIcon} from '../icons/index'

const Users = ()=>{
    return (
        <div className="w-full bg-gray-50 dark:bg-black dark:text-white">
            <div className="flex flex-row justify-start h-full overflow-y-hidden">
              <Sidebar/>
                 <Table /> 
            </div>
        </div>
    )
}

export default Users;