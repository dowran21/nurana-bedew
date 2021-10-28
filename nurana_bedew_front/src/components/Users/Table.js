import React, { useContext, useEffect, useState } from 'react';
import Loading from '../Loading'
import {EditIcon, AddIcon, TrashIcon} from '../../icons/index';//
import {lazy} from "react";
import useTimeOut from '../useTimeOut';
import PaginationButton from '../PaginationButton'
import ReactPaginate from 'react-paginate';


import { delete_user, get_users} from '../../http/adminApi.js';

const ModalContainer = lazy(() => import('../ModalContainer'));
const Form = lazy(() => import('./Form.js'))


function Table(){
    const [load, setLoad] = useState(true)
    const [users, setUsers] = useState([])
    const [user_name, setUserName] = useState('')
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(12)
    const deleteUser = async (id) =>{
        
        try{
            setLoad(true)
            await delete_user(id)
            let da = {"id":id}
            setUsers(users.filter(item => item.id !== id))
            setLoad(false)
        }catch(e){
            console.log("hello world")
        }
    }

        useEffect( async () => {
            try{
                console.log(user_name)
                const data = await get_users({page, limit, user_name});
                setUsers(data.rows.users);
                setCount(data.rows.count)
                setLoad(false)
            }catch(e){

            }
        }, [user_name, page])

        let handleSearch = useTimeOut({time:1500, action:(value) => {setUserName(value)}})
        console.log(users)

    return(
        
        <>
        {load ? <Loading type = "global"/> :
        <div className = "w-full">
            
            <div className = "flex flex-row py-2">
                <div className = "flex flex-row p-2 w-full">
                    <input type="text" name="user_name" placeholder = "Ulanyjyny adyny giriziň" onChange = {e => {handleSearch(e.target.value) }}
                    className = "w-30 h-full px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"/>
                </div>
                <div className="flex flex-row p-2 w-full justify-between items-start">
                            <ModalContainer Button={(setClose) => <AddIcon onClick={() => setClose()} className="w-10 h-10 cursor-pointer text-indigo-600 hover:text-indigo-900"/>} title="Ulanyjy Üýtgetmek Formasy" size="min">
                        <Form users = {users} setUsers = {setUsers} setLoad = {setLoad}></Form>
                        </ModalContainer>
                </div>
            </div>
            <div className = "flex flex-column">
            <table className="min-w-full divide-gray-200 dark:divide-gray-600">
                <thead className="w-full shadow bg-white rounded-t dark:bg-gray-800 ">
                    <tr className="w-full my-2 px-4">
                        <th scope="col" className="px-2 py-2 w-20 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Ady we familiýasy
                        </th>
                        <th scope="col" className="px-2 py-2 w-20 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Telefon nomeri
                        </th>
                        <th scope="col" className="px-2 py-2 w-20 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Ulanyjynyň email-y
                        </th>
                        
                        <th scope="col" className="px-2 py-2 w-20 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Gizlyn kody
                        </th>
                        <th scope="col" className="px-2 py-2 w-20 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Üytgetmek
                        </th>
                        <th scope="col" className="px-2 py-2 w-5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Ulanyjyny pozmak
                        </th>
                    </tr>
                </thead>
                <tbody className="w-full h-5 overflow-x-auto bg-white  dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                {users && users.map(item =>
                    <tr key = {item.id} className="w-full mb-4 px-4">
                    <td className="px-2  py-2 whitespace-wrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{item.full_name}</div>
                    </td>
                    <td className="px-2  py-2 whitespace-wrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{item.main_phone}</div>
                    </td>
                    <td className="px-2  py-2 whitespace-wrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{item.email}</div>
                    </td>
                    <td className="px-2  py-2 whitespace-wrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{item.password}</div>
                    </td>
                    <td className="py-2 px-2">
                        <div className="flex flex-row justify-between items-center">
                            <ModalContainer Button={(setClose) => <EditIcon onClick={() => setClose()} className="w-5 h-5 mx-3 cursor-pointer text-indigo-600 hover:text-indigo-900"/>} title="Ulanyjy Üýtgetmek Formasy" size="min">
                                <Form values = {{...item}} setLoad = {setLoad} users = {users} setUsers = {setUsers}></Form>
                            </ModalContainer>
                        </div>
                    </td>
                    <td className="px-2  py-2 whitespace-wrap">
                    <TrashIcon title="pozmak" className="w-5 h-5 mx-3 cursor-pointer text-indigo-600 hover:text-indigo-900" onClick={() => deleteUser(item.id)}/>
                    </td>
                </tr>
                )}
                </tbody>
            </table>
            </div>
            <div className="fixed bottom-0 left-0 w-full flex justify-center items-center bg-gray-100 dark:bg-black">
                <ReactPaginate
                    previousLabel={<PaginationButton pageCount={count / limit} page={page} direction="previous"/>}
                    nextLabel={<PaginationButton pageCount={count / limit}  page={page} direction="next"/>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={count / limit}
                    forcePage={page}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(page) => setPage(page.selected)}
                    containerClassName={'list-none flex flex-row justify-center items-center w-full max-w-sm mx-auto'}
                    activeClassName={'list-none p-1 text-white rounded-lg shadow-md bg-gradient-to-r from-indigo-500 via-indigo-500 to-indigo-700 text-white pagination-active-link select-none'}
                    pageClassName={'list-none p-1  rounded-lg mx-1 text-sm text-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white select-none'}
                    pageLinkClassName={'list-none  py-1 px-2 w-full h-full focus:outline-none outline-none z-50 select-none'}
                    previousLinkClassName={'list-none cursor-pointer focus:outline-none outline-none select-none'}
                    nextLinkClassName={'list-none cursor-pointer focus:outline-none outline-none select-none'}
                />
            </div>
        </div>
        }
        </>
    )
}

export default Table;