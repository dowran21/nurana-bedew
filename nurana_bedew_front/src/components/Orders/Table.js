import React, { useEffect, useState } from 'react';
import Loading from '../Loading'
import PaginationButton from '../PaginationButton'
import ReactPaginate from 'react-paginate';

import Button from "../Button";
import { get_orders, GeneratePdf, AcceptOrder } from '../../http/adminApi.js';
// import { useHistory } from 'react-router';
// import { LOGIN_ROUTE } from '../../utils/consts';
import useTimeOut from '../useTimeOut';
import Switch from 'react-switch';
import {CardsIcon} from '../../icons/index';
import {lazy} from 'react'
import OrderList from './OrderList';

const ModalContainer = lazy(() => import('../ModalContainer'));


function Table(){
        
    const [load, setLoad] = useState(true)
    const [orders, setOrders] = useState([])
    const [user_name, setUserName] = useState('')
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(1)

    // const history = useHistory()
  useEffect( async () => {
        try{
            const data = await get_orders({page, limit:12, user_name})
            // console.log(data.rows.orders)
            setOrders(data.rows.orders)
            setCount(data.rows.count)
            setLoad(false)
        }catch(e){
            if(e.response.status === 403){
            //    history.push(LOGIN_ROUTE)
            console.log("hello world")
            }
        }
    }, [page, user_name])

    const handlePdfDownload = async (id) => {
        const rows = await GeneratePdf(id);
        const d = new Date();
        console.log(rows)
        console.log(rows.isBase64Encoded)
        if(rows?.isBase64Encoded){
            const url = `data:application/pdf;base64,${rows.body}`;
            const link = document.createElement('a');
            document.body.appendChild(link);
            console.log(document.body.appendChild(link))
            
            let pdfWindow = window.open("")
            pdfWindow.document.write(
                `<iframe width='100%' height='100%' src='${url}'></iframe>`
            )
        
            // // Clean up and remove the link
            link.parentNode.removeChild(link);   
        }
        setOrders(orders.map(item =>{
            if (item.id === id){
                item.has_seen = true 
            }return item
        }))
    }

    const accept_order = async(id, bool) =>{
        try {
            setOrders(orders.map(item=>{
                if (item.id === id){
                    item.miniLoad = true
                }return item
            }))
            await AcceptOrder(id, bool).then( data=>
                {setOrders(orders.map(item=>{
                    if (item.id === id){
                        item.accepted = bool
                        item.miniLoad = false
                    }return item
                }))
            })
        } catch (e) {
            alert("Bir zatlar yalnys gitdi garasmagynyzy hayysh edyarin")
        }

    }

    let handleSearch = useTimeOut({time:1500, action:(value) => {setUserName(value)}})

    return(
        
        <>
        {load ? <Loading type = "global"/> :
        <div className = "w-full">
            <div className = "flex flex-row py-2 w-full">
                    <div className = "flex flex-row w-full p-2">
                        <input type="text" name="user_name" placeholder = "Ulanyjynyn adyny girizin" onChange = {e => handleSearch(e.target.value)}
                        className = "w-30 h-full px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"/>
                    </div> 
            </div>
       
       
        <table className="divide-gray-200 dark:divide-gray-600 w-full">
            <thead className="w-full shadow bg-white rounded-t dark:bg-gray-800 ">
                <tr className="w-full my-2 px-4">
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Sargydyň belgisi
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Sargyt eden
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        jemi bahasy
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Telefon belgisi
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Sargydyň wagty
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Tölegiň görnüşi
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Sargydy görkez
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Sargydy kabul et
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Çap et
                    </th>
                </tr>
            </thead>
            <tbody className={"w-full h-5 overflow-x-auto bg-white  dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600"}>
                {orders && orders.map(item =>
                 <tr key = {item.id} className="w-full mb-4 px-4">
                 <td className="px-2  py-2 whitespace-wrap">
                     <div className={
                         item.has_seen ?
                            "text-sm text-gray-900 dark:text-gray-100"
                        :
                            "text-sm text-red-900 dark:text-red-100"
                        }>{item.id}</div>
                 </td>
                 <td className="px-2  py-2 whitespace-wrap">
                     <div className={
                         item.has_seen ?
                            "text-sm text-gray-900 dark:text-gray-100"
                        :
                            "text-sm text-red-900 dark:text-red-100"
                        }>{item.full_name}</div>
                 </td>
                 <td className="px-2  py-2 whitespace-wrap">
                     <div className={
                         item.has_seen ?
                            "text-sm text-gray-900 dark:text-gray-100"
                        :
                            "text-sm text-red-900 dark:text-red-100"
                        }>{item.total_price}</div>
                 </td>
                 <td className="px-2  py-2 whitespace-wrap">
                     <div className={
                         item.has_seen ?
                            "text-sm text-gray-900 dark:text-gray-100"
                        :
                            "text-sm text-red-900 dark:text-red-100"
                        }>{item.main_phone}</div>
                 </td>
                 <td className="px-2  py-2 whitespace-wrap">
                     <div className={
                         item.has_seen ?
                            "text-sm text-gray-900 dark:text-gray-100"
                        :
                            "text-sm text-red-900 text-red-100"
                        }>{item.created_date} {item.created_time}</div>
                 </td>
                 <td className="px-2  py-2 whitespace-wrap">
                     <div className={
                         item.has_seen ?
                            "text-sm text-gray-900 dark:text-gray-100"
                        :
                            "text-sm text-red-900 text-red-100"
                        }>{item.paymant_name}</div>
                 </td>
                 <td className="px-2  py-2 whitespace-wrap">
                        <ModalContainer Button={(setClose) => <CardsIcon onClick={() => setClose()} className="w-5 h-5 cursor-pointer text-indigo-600 hover:text-indigo-900"/>} title="Sargyt" size="min">
                            <OrderList id = {item.id} setLoad = {setLoad}/>
                        </ModalContainer>
                 </td>
                
                 <td className="px-2  py-2 whitespace-wrap">
                         {item.miniLoad? <Loading type = "table"/>
                            :
                            <div>
                                <Switch   onChange = {(value) => accept_order(item.id, value)} checked = {item.accepted} className = "w-auto h-5"/>
                            </div>
                        }
                 </td>
                 <td className="px-2  py-2 whitespace-wrap">
                     <Button title="PDF Aç" type="button" handleClick={() => handlePdfDownload(item.id)}/>
                 </td>
             </tr>)}
            </tbody>
        </table>
        <div className="fixed bottom-0 left-0 w-full flex justify-center items-center bg-gray-100 dark:bg-black">
                <ReactPaginate
                    previousLabel={<PaginationButton pageCount={count / 12} page={page} direction="previous"/>}
                    nextLabel={<PaginationButton pageCount={count / 12}  page={page} direction="next"/>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={count / 12}
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