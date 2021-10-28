import React, { useEffect, useState } from 'react';
import { get_order } from '../../http/adminApi';


function OrderList ({id, setLoad, load}){
    const [order_items, setOrderItems] = useState([])
    const [order, setOrder] = useState({})
    

    useEffect(async () =>{
        const data = await get_order(id, setLoad);
        setOrderItems(data.rows.items) 
        setOrder(data.rows)    
    }, [])
    // console.log(order_items, '------')
    return (
       
       
        <div >
            <div className = "flex flex-row p-1">
               Sargyt eden: {order.full_name}
            </div>
            <div className = "flex flex-row p-1">
                Sargydyň belgisi: {order.id}
            </div>
            <div className = "flex flex-row p-1">
                Sargydyň jemi bahasy: {order.total_price}
            </div>
            <div className = "flex flex-row p-1">
                Sargydyň wagty: {order.created_date} {order.created_time}
            </div>
        <div className = "flex flex-row">
        <table className="divide-gray-200 dark:divide-gray-600 w-full">
            <thead className="w-full shadow bg-white rounded-t dark:bg-gray-800 ">
                <tr className="w-full my-2 px-4">
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Haryt
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Bahasy
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Sany
                    </th>
                </tr>
            </thead>
       
        <tbody className={"w-full h-5 overflow-x-auto bg-white  dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600"}>
        {order_items && order_items.map(item => 
                 <tr key = {item.id} className="w-full mb-4 px-4">
                 <td className="px-2  py-2 whitespace-wrap">
                     <div className=
                            "text-sm text-gray-900 dark:text-gray-100"
                        >{item.product_name}</div>
                 </td>
                 <td className="px-2  py-2 whitespace-wrap">
                     <div className=
                            "text-sm text-gray-900 dark:text-gray-100"
                        >{item.product_price}</div>
                 </td>
                 <td className="px-2  py-2 whitespace-wrap">
                     <div className=
                            "text-sm text-gray-900 dark:text-gray-100"
                        >{item.quantity}</div>
                 </td>
                 </tr>
                 )}
        </tbody>
        </table>
        </div>
        </div>
    )
}

export default OrderList;