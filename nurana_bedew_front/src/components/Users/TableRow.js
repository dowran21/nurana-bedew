import React from 'react'
import {EditIcon} from '../../icons/index';//
import {lazy} from "react";
import Button from '../Button'
import { delete_user } from '../../http/adminApi';

// const Form = lazy(() => import('./Form'));
const ModalContainer = lazy(() => import('../ModalContainer'));
const Form = lazy(() => import('./Form.js'))

function TableRow({user, setLoad, update_user_store, remove_user}){


    const deleteUser = async (id) =>{
        
        try{
            await delete_user(id)
            let da = {"id":id}
            remove_user(da)
        }catch(e){

        }
    }

    const {id, full_name, main_phone, email} = user
    console.log("i am in a table row of users")
    return (
        <tr key = {id} className="w-full mb-4 px-4">
            <td className="px-2  py-2 whitespace-wrap">
                <div className="text-sm text-gray-900 dark:text-gray-100">{id}</div>
            </td>
            <td className="px-2  py-2 whitespace-wrap">
                <div className="text-sm text-gray-900 dark:text-gray-100">{full_name}</div>
            </td>
            <td className="px-2  py-2 whitespace-wrap">
                <div className="text-sm text-gray-900 dark:text-gray-100">{main_phone}</div>
            </td>
            <td className="px-2  py-2 whitespace-wrap">
                <div className="text-sm text-gray-900 dark:text-gray-100">{email}</div>
            </td>
            

            <td className="py-2 px-2">
                <div className="flex flex-row justify-between items-center">
                    <ModalContainer Button={(setClose) => <EditIcon onClick={() => setClose()} className="w-5 h-5 mx-3 cursor-pointer text-indigo-600 hover:text-indigo-900"/>} title="Ulanyjy Üýtgetmek Formasy" size="min">
                        <Form values = {{id, full_name, main_phone, email}} setLoad = {setLoad} update_user_store={update_user_store} ></Form>
                    </ModalContainer>
                </div>
            </td>
            <td className="px-2  py-2 whitespace-wrap">
            <Button title="pozmak" type="button" handleClick={() => deleteUser(id)}/>
            </td>
        </tr>
    )
}

export default TableRow;