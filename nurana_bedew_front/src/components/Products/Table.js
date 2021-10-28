import React, { useEffect, useState } from 'react';
// import { Context } from '../../index.js';
import Loading from '../Loading'
import {lazy} from 'react'
// import Button from '../Button'
import ReactPaginate from 'react-paginate';
import {EditIcon, TrashIcon} from '../../icons/index';
import {AddIcon} from '../../icons/index';
import PaginationButton from '../PaginationButton'
// import { Icon } from 'react-icons-kit';
import Switch from 'react-switch'
import ImageUpload from './ImageUpload';


import { delete_product, get_products,send_sms_all, new_in_come_update, get_producers} from '../../http/adminApi.js';
import useTimeOut from '../useTimeOut';
// import { useHistory } from 'react-router';
// import { LOGIN_ROUTE } from '../../utils/consts';
import Button from '../Button';
const ModalContainer = lazy(() => import('../ModalContainer'));
const Form = lazy(() => import('./Form.js'))

function Table(admin){
    const [load, setLoad] = useState(true);
    const [products, setProducts] = useState([]);
    const [producers, setProducers] = useState([]);
    const [product_name, setProductName] = useState('');
    const [producer_id, setProducerID] = useState();
    // const [new_in_come, setNewInCome] = useState('');
    const [page, setPage] = useState(0)
    const [count, setCount] = useState()

    useEffect( async () => {
        try{
            setLoad(true)
            console.log(product_name, producer_id)
            const data = await get_products(page, 8, product_name, producer_id) 
            setProducts(data.rows.products);
            setCount(data.rows.count)
            setLoad(false)
        }catch(e){
            console.log(e)
            setLoad(false)
        }
        
    }, [product_name, producer_id, page]);
    
    const SendSMS = async () =>{
        try {
            console.log("i am in try")
            const data = await send_sms_all()
        } catch (e) {
            
        }
    }
    useEffect(() => {
        // get_categories().then(data =>setCategories(data.rows.categories));
        get_producers().then(data=> setProducers(data.rows.producers));
    }, [])

    const deleteProduct = async(id)=>{
        setLoad(true)
        delete_product(id).then(data =>{
            setLoad(false)
            setProducts(products.filter(item => item.id !== id))
        })
    }

    const newInCome = async(id, bool) =>{
        setProducts(products.map(item =>{
            if(item.id === id){
                item.miniLoad = true
            }return item
        }))
        new_in_come_update(id, bool).then(data =>{
        setProducts(products.map(item =>{
            if(item.id === id){
                item.new_in_come = bool
                item.miniLoad = false
            }return item
        }))
    })
        
    }

    let handleSearch = useTimeOut({time:1000, action:(value) => {setProductName(value); setPage(0)}})
    return(

        <>
        {load ? <Loading type = "global"/> :
        <div className = "w-full">
            <div className = "flex flex-row py-2 w-full">
                    <div className = "flex flex-row w-full p-2">
                        <input type="text" name="product_name" placeholder = "Dermanyň adyny giriziň" onChange = {e => {handleSearch(e.target.value) }}
                        className = "w-30 h-full px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"/>
                    </div> 
                    <div className = "flex flex-row w-full p-2">
                    <select value = {producer_id} name="producer_id" placeholder = "Yurdy saylan" onChange = {e => {setProducerID(e.target.value);  setPage(0)}}
                        className="px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
                    >   
                        {/* <option key = "" value = "" disabled>Yurdy saylan</option> */}
                        <option key = "" value = "">Öndürijileriň hemmesi</option>
                        {producers?.length && producers.map(item =>
                        <option key = {item.id} value = {item.id}>{item.producer_name}</option>)}
                    </select>
                    </div>
                    <div className = "flex flex-row w-full p-2">
                        <Button title = "Ulanyjylara Sms Ugrat" handleClick = {SendSMS}/>
                    </div>
                    <div>
                        <ModalContainer Button={(setClose) => <AddIcon onClick={() => setClose()} className="w-20 h-10 p-1 cursor-pointer text-indigo-600 hover:text-indigo-900"/>} title="Harydy Goşmak Formasy" size="min">
                            <Form setProducts = {setProducts} products = {products} setLoad = {setLoad}></Form>
                        </ModalContainer>
                    </div>
            </div>
        <div className = "flex flex-column w-full">
        <table className="min-w-full py-4 h-full divide-y divide-x divide-gray-200 dark:divide-gray-600">
            <thead className="w-full shadow bg-white rounded-t dark:bg-gray-800 ">
                <tr className="w-full my-2 px-4">
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Harydyň ady
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Öndüriji
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Sany
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Baha
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Möhleti
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Üýtgetmek
                    </th>
                    
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Täze gelen
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Suraty calysmak
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Pozmak
                    </th>
                </tr>
            </thead>
            <tbody className="w-full h-5 overflow-x-auto bg-white  dark:bg-gray-800 divide-y divide-x divide-gray-200 dark:divide-gray-600">
            {products && products.map(item => 
                <tr key = {item.id} className="w-full mb-4 px-4">
                <td className="px-2  py-2 whitespace-wrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.product_name}</div>
                </td>
                <td className="px-2  py-2 whitespace-wrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.producer_name}</div>
                </td>
                <td className="px-2  py-2 whitespace-wrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.stock_count}</div>
                </td>
                <td className="px-2  py-2 whitespace-wrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.price}</div>
                </td>
                <td className="px-2  py-2 whitespace-wrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{item.date_of_expire}</div>
                </td>
                <td className="py-2 px-2">
                    <div className="flex flex-row justify-between items-center">
                        <ModalContainer Button={(setClose) => <EditIcon onClick={() => setClose()} className="w-5 h-5 mx-3 cursor-pointer text-indigo-600 hover:text-indigo-900"/>} title="Harydy Üýtgetmek Formasy" size="min">
                            <Form values = {{...item}} setProducts = {setProducts} products = {products} setLoad = {setLoad}></Form>
                        </ModalContainer>
                    </div>
                </td>
                <td className="px-2  py-2 whitespace-wrap">
                        {item.miniLoad? <Loading type = "table"/>
                            :
                            <div>
                                <Switch onChange = {(value) => newInCome(item.id, value)} checked = {item.new_in_come} className = "w-auto h-5"/>
                            </div>
                        }
                 </td>
                 
                <td className="px-2  py-2 whitespace-wrap items-center">
                    <div className="flex flex-row justify-between items-center">
                        <ModalContainer Button={(setClose) => <img onClick={() => setClose()} 
                            src = {item.image ? 
                                `http://45.93.136.141:7000/${item.image}-mini.webp`
                                :
                                `http://45.93.136.141:7000/add.png`} 
                            className="h-10 w-10 cursor-pointer text-indigo-600 hover:text-indigo-900"/>} 
                            title="Harydy Üýtgetmek Formasy" 
                            size="min">
                        <ImageUpload data = {item.image} id = {item.id}/>
                       </ModalContainer>
                    </div>     
                </td>
                <td className="px-2  py-2 whitespace-wrap">
                    <TrashIcon title="pozmak" className="w-5 h-5 mx-3 cursor-pointer text-indigo-600 hover:text-indigo-900" onClick={() => deleteProduct(item.id)}/>
                </td>
            </tr>
        )}
            </tbody>
        </table>
        </div>
            <div className="fixed bottom-0 left-0 w-full flex justify-center items-center bg-gray-100 dark:bg-black">
                <ReactPaginate
                    previousLabel={<PaginationButton pageCount={count / 8} page={page} direction="previous"/>}
                    nextLabel={<PaginationButton pageCount={count / 8}  page={page} direction="next"/>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={count / 8}
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