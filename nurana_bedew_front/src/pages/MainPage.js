import React from 'react';
import Sidebar from '../components/SideBar.js'
import Button from '../components/Button.js'
import { send_sms_all } from '../http/adminApi.js';
import ModalContainer from '../components/ModalContainer.js';
import EditIcon from '../icons/index.js'

const MainPage = ()=>{

    return (
        <div className="w-full h-screen bg-gray-50 dark:bg-black dark:text-white">
            <div className="flex flex-column justify-start h-full overflow-y-hidden">
              <Sidebar/>
              <div className = "flex-flex-row items-center w-full">
              <div className = "font-serif flex-row w-full  h-50 text-center text-blue-600 text-5xl justify-center">
                  Nurana Bedew Pharmacy 
                  Admin Sahypasyna Hoş Geldiňiz!
              </div>
              </div>
              </div>
        </div>
    )
}

export default MainPage;