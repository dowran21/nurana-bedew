
// import {lazy} from "react";

import { GeneratePdf } from "../../http/adminApi";
import Button from "../Button";


function TableRow({order, setLoad}){

    const handlePdfDownload = async (id) => {
        const rows = await GeneratePdf(id);
        const d = new Date();
        console.log(rows.isBase64Encoded)
        if(rows?.isBase64Encoded){
            //generatePDF(rows)
            console.log("i am in if")
            const url = `data:application/pdf;base64,${rows.body}`;
            const link = document.createElement('a');
            console.log(link)
            link.href = url;
            link.setAttribute(
                'download',
                `Şahadatnama ${d.getMilliseconds()}.pdf`,
            );
            // Append to html link element page
            document.body.appendChild(link);
            
            // Start download
            link.click();
        
            // Clean up and remove the link
            link.parentNode.removeChild(link);
        }
    }
    const {created_at,id,  full_name, main_phone, total_price} = order
    console.log("i am in table row")
    return (
        <tr key = {id} className="w-full mb-4 px-4">
            <td className="px-2  py-2 whitespace-wrap">
                <div className="text-sm text-center text-gray-900 dark:text-gray-100">{id}</div>
            </td>
            <td className="px-2  py-2 whitespace-wrap">
                <div className="text-sm  text-gray-900 dark:text-gray-100">{full_name}</div>
            </td>
            <td className="px-2  py-2 whitespace-wrap">
                <div className="text-sm text-center text-gray-900 dark:text-gray-100">{total_price}</div>
            </td>
            <td className="px-2  py-2 whitespace-wrap">
                <div className="text-sm text-center text-gray-900 dark:text-gray-100">{main_phone}</div>
            </td>
            <td className="px-2  py-2 whitespace-wrap">
                <div className="text-sm text-center text-gray-900 dark:text-gray-100">{created_at}</div>
            </td>

            <td className="px-2  py-2 whitespace-wrap">
                <Button title="PDF Aç" type="button" handleClick={() => handlePdfDownload(id)}/>
            </td>
        </tr>
    )
}

export default TableRow;