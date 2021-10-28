import React from 'react';
// import { useState} from "react";
import {HomeIcon, MedicineBoxIcon} from '../icons/index';
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import { Icon } from 'react-icons-kit';
import {EarthSharpIcon} from '../icons/index.js'

import {building} from 'react-icons-kit/fa/building'
import {ic_supervised_user_circle} from 'react-icons-kit/md/ic_supervised_user_circle';
// import {IoEarthSharp} from 'react-icons-kit/md/IoEarthSharp'

import {ic_people} from 'react-icons-kit/md/ic_people'
import { COUNTRY_ROUTE, MAIN_PAGE_ROUTE, ORDERS_ROUTE, PRODUCTS_ROUTE, USERS_ROUTE } from '../utils/consts';

function SideBar (){
    let match = useRouteMatch();
    let location = useLocation();
    console.log(match.url)
    const isLocationSame = (url) =>{
        let path = location.pathname.split('/')
        return path[1] === url
    }
    return (
        <div className="bg-white dark:bg-gray-800 pt-2">
            <div className="relative w-40 h-full translate-x-0 overflow-hidden ease-in-out transition-all duration-300 z-30" >
                <div className="flex flex-col justify-start items-start mt-4">
                        <Link 
                            to = {ORDERS_ROUTE}
                            className={
                                isLocationSame(ORDERS_ROUTE.replace('/','')) ?
                                "relative w-full flex flex-row justify-start items-center dark:text-white text-purple-700 my-1 py-2 cursor-pointer"
                                :
                                "relative w-full flex flex-row justify-start items-center text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-purple-600 my-1 py-2 cursor-pointer"
                        }  >
                            {isLocationSame(ORDERS_ROUTE.replace('/','')) && <div className="absolute top-0 left-0 border-r-4 rounded-r border-purple-700 h-full"></div>}
                            <Icon size={24} icon={fileText2} className="absolute top-1 left-0 text-lg w-6 h-6 mr-2 ml-3"/>
                            <span className="text-base font-base ml-12">Sargytlar</span>
                        </Link>
                        <Link 
                            to = {PRODUCTS_ROUTE}
                            className={
                                isLocationSame(PRODUCTS_ROUTE.replace('/','')) ?
                                "relative w-full flex flex-row justify-start items-center dark:text-white text-purple-700 my-1 py-2 cursor-pointer"
                                :
                                "relative w-full flex flex-row justify-start items-center text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-purple-600 my-1 py-2 cursor-pointer"
                        } >
                            {isLocationSame(PRODUCTS_ROUTE.replace('/','')) && <div className="absolute top-0 left-0 border-r-4 rounded-r border-purple-700 h-full"></div>}
                            <MedicineBoxIcon size={24} icon={building} className="absolute top-1 left-0 text-lg w-6 h-6 mr-2 ml-3"/>
                            <span className="text-base font-base ml-12">Önumler</span>
                        </Link>
                        <Link 
                            to ={USERS_ROUTE}
                            className={
                                isLocationSame(USERS_ROUTE.replace('/','')) ?
                                "relative w-full flex flex-row justify-start items-center dark:text-white text-purple-700 my-1 py-2 cursor-pointer"
                                :
                                "relative w-full flex flex-row justify-start items-center text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-purple-600 my-1 py-2 cursor-pointer"
                        }>
                            {isLocationSame(USERS_ROUTE.replace('/','')) && <div className="absolute top-0 left-0 border-r-4 rounded-r border-purple-700 h-full"></div>}
                            <Icon size={24} icon={ic_people} className="absolute top-1 left-0 text-lg w-6 h-6 mr-2 ml-3"/>
                            <span className="text-base font-base ml-12">Ulanyjylar</span>
                        </Link>
                        <Link 
                            to = {COUNTRY_ROUTE}
                            className={
                                isLocationSame(COUNTRY_ROUTE.replace('/','')) ?
                                "relative w-full flex flex-row justify-start items-center dark:text-white text-purple-700 my-1 py-2 cursor-pointer"
                                :
                                "relative w-full flex flex-row justify-start items-center text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-purple-600 my-1 py-2 cursor-pointer"
                        }>
                            {isLocationSame(COUNTRY_ROUTE.replace('/','')) && <div className="absolute top-0 left-0 border-r-4 rounded-r border-purple-700 h-full"></div>}
                            <EarthSharpIcon size={24} icon={ic_supervised_user_circle} className="absolute top-1 left-0 text-lg w-6 h-6 mr-2 ml-3"/>
                            <span className="text-base font-base ml-12">Öndürijiler</span>
                        </Link>
                                                
                   </div>
    
                </div>
            </div>
    )
}

export default SideBar