import React, {  useEffect, useState } from 'react';
// import { Context } from '../../index.js';
import Loading from '../Loading'
import {lazy} from 'react'
import {EditIcon, AddIcon} from '../../icons/index';


import { get_categories} from '../../http/adminApi.js';
const ModalContainer = lazy(() => import('../ModalContainer'));
const Form = lazy(() => import('./Form.js'))

function Table(search){
    const [load, setLoad] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect( async () => {
        const data = await get_categories()
        setCategories(data.rows.categories)
        setLoad(false)
            
    }, [])


    return(
        
        <>
        {load ? <Loading type = "global"/> :
        <div className = "w-full">
            <div>
                <ModalContainer Button={(setClose) => <AddIcon onClick={() => setClose()} className="w-20 h-10 p-1 cursor-pointer text-indigo-600 hover:text-indigo-900"/>} title="Harydy Üýtgetmek Formasy" size="min">
                    <Form setCategories = {setCategories} categories = {categories}></Form>
                </ModalContainer>
            </div>
        <div>
       
        <table className="min-w-full h-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="w-full shadow bg-white rounded-t dark:bg-gray-800 ">
                <tr className="w-full my-2 px-4">
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Kategoriýa
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Üytgetmek
                    </th>
                </tr>
            </thead>
            <tbody className="w-full h-5 overflow-x-auto bg-white  dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
            {categories && categories.map(item => 
                <tr key = {item.id} className="w-full mb-4 px-4">
                <td className="px-2  py-2 whitespace-wrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.category_name}</div>
                </td>
                <td className="py-2 px-2">
                        <div className="flex flex-row justify-between items-center">
                            <ModalContainer Button={(setClose) => <EditIcon onClick={() => setClose()} className="w-5 h-5 mx-3 cursor-pointer text-indigo-600 hover:text-indigo-900"/>} title="Ulanyjy Üýtgetmek Formasy" size="min">
                                <Form values = {{...item}} setLoad = {setLoad} categories = {categories} setCategories = {setCategories}></Form>
                            </ModalContainer>
                        </div>
                </td>
            </tr>
        )}
            </tbody>
        </table>
        </div>
        </div>
        }
        </>
    )
}

export default Table;