import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { update_image } from '../../http/adminApi';
import CloseIcon from '../../icons/CloseIcon';

function ImageUpload({ data, id, setClose }) {

    const { handleSubmit } = useForm();
    const [close1, setClose1] = useState(false)
    const [file, setFile] = useState(null)

    const ChangeImage = (e)=>{
        console.log(e.target.files)
        setFile(e.target.files[0])
        console.log(file)
    }

    const checkMimeType = (event, file) => {
        let err = ''
        const mime_types = ['image/png', 'image/jpeg', 'image/jpg']
        if (mime_types.every(type => file?.type !== type)) {
            err += file?.type + ' goldanýan format däl\n';
        }
        if (err !== '') { // if message not same old that mean has error 
            event.target.files = null // discard selected file
            toast.error(err);
            return false;
        } return true;
    }

    const checkFileSize = (event, file) => {
        if (file?.size > 1048576) {
            event.target.files = null
            return false
        } return true
    }

    const onSubmit = async ()=>{
        const im = new FormData();
        im.append('picture', file)
        update_image(id, im).then(data =>
            setClose()
        )
    }

    const onChangeHandler = (event) => {
        const file = event.target.files[0];
        if (typeof file === 'object' && file !== undefined && file !== null) {
            if (checkMimeType(event, file) && checkFileSize(event, file)) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = async function (e) {
                    // setImage({ image: e.target.result, type: file.type });
                    event.target.files = null;
                    event.target.value = '';
                }
            }
        }
    }
    return (
        <>
            <div className="relative z-50 overflow-hidden w-full h-full flex flex-col shadow-inner rounded-lg border">
                {data && <label htmlFor="actual-btn" className={`relative cursor-pointer w-full h-80 lg:h-64 p-1`}>
                    <div className={`${data ? 'hidden' : ''} absolute w-full h-full flex justify-center items-center z-30`}>
                        <div className="w-32 py-2 text-center bg-primary rounded-lg font-medium active:bg-yellow-400">
                            Surat Saýla
                        </div>
                    </div>
                    {!close1 ?
                        <img src={data ? `http://45.93.136.141:7000/${data}-big.webp` : '/stock/product.jpg'} className="object-cover rounded-lg w-full h-full opacity-80" alt="upload images" />
                    :
                    <input type="file" onChange={onChangeHandler} id="actual-btn" hidden />}
                </label>}
                <div onClick={() => {setClose1(true); console.log(close1)}} className={`${data ? '' : 'hidden'} absolute z-50 cursor-pointer text-white top-3 right-3 w-8 h-8 flex justify-center items-center bg-red-500 rounded-lg mr-1 mt-1`}>
                    <CloseIcon className="text-4xl" />
                </div>
                <div className="relative w-full mt-5 flex flex-col justify-start items-start">
                <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs font-medium mb-2" htmlFor="email">
                    {data ? "Harydyň suratyny uytgetmek"
                    : "Harydyn suratyny"
                    }
                </label>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file"  onChange = {ChangeImage} multiple =""
                        className=  "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"/>
                    <div className="absolute top-14 left-0 text-xs text-red-500 font-normal mt-2"></div>
                    <button
                        className="bg-purple-700 hover:bg-purple-600 text-white  active:bg-gray-700 text-sm font-medium uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit" 
                    >
                        {data ? "Uytgetmek" : "Gosmak"}
                    </button>
                </form>
            </div>
            </div>
        </>
    )
}

export default ImageUpload;