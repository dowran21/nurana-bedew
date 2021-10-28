import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { add_product, add_product_image, get_producers, update_product} from "../../http/adminApi";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FinderSelect from 'react-finderselect'
import 'react-finderselect/dist/index.css'
import SelectSearch from 'react-select-search';


function Form({values, setClose, setProducts, products, setLoad}){
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({ 
    resolver: yupResolver(schema),
    defaultValues:values,
  });
  const [producers, setProducers] = useState([])
  const [producer, setProducer] = useState(false)
  const [file, setFile] = useState(null)
  
  const ChangeImage = (e)=>{
    console.log(e.target.files)
    setFile(e.target.files[0])
  }
  const ChangeProducerID = async (id)=>{
    setValue('producer_id', id);
  }
  useEffect (()=>{
    get_producers().then(data=>
      setProducers(data.rows.producers));
  }, [])

  const onSubmit = async (data) => {
    setLoad(true)
    if(values){
      try {
        console.log(data)
        update_product(data).then(data => setClose())
        setProducts(products.map(item => {
          if(item.id === data.id){
            return data
          }return item
        }))
        setLoad(false)
        setClose()
      } catch (e) {
        console.log(e)
        setLoad(false)
        setClose()
      }
    }else{
      try {
        console.log("i am in try")
        const id_data = await add_product(data);
        console.log(id_data)
        const id = id_data.rows.id;
        console.log(id)
        const im = new FormData();
        im.append('picture', file)
        console.log(im)
        await add_product_image(id, im);
        setProducts([id_data.rows, ...products ])
        setLoad(false)
        setClose()
      } catch (e) {
        // alert (e.response.status)  
        console.log(e)      
        setLoad(false)
        setClose()
      }
    }
  }  
  
  return(
    <div className="flex flex-col justify-start px-4 pb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
        <div className="relative w-full mt-5 flex flex-col justify-start items-start">
          <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs font-medium mb-2" htmlFor="email">
            Harydyň ady
          </label>
          <input {...register("product_name")} type="text" name="product_name" placeholder="Harydyň ady"
            className={ errors.product_name ? 
              "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full"
              :         
              "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
            }
          />
          <div className="absolute top-14 left-0 text-xs text-red-500 font-normal mt-2">{errors.product_name?.message}</div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center">
        <div className="relative w-full mt-3 ">
          <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2" htmlFor="email">
            Öndüriji
          </label>
          <div>

            {producer ?<FinderSelect 
              data={producers} 
              label='producer_name' 
              
              value = "id"
              name='producer' 
              className= "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600  "
              placeholder='Öndüriji saýlaň'
              onClick={e => console.log()} 
              onChange={(e) =>{ ChangeProducerID(e.value)}}  />
            :
            <div               className= "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600  "
              onClick = {() => setProducer(true)}>
                {values ? values.producer_name : "Öndüriji saýlaň"}
            </div>
            }
        </div>
            <div className="absolute top-14 left-0 text-xs text-red-500 font-normal mt-2">{errors.producer_country_id?.message}</div>
        </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="relative w-full mt-3 px-2">
            <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2" htmlFor="email">
              Sany
            </label>
            <input {...register("stock_count")} type="number" name="stock_count" placeholder="Galan sany"
              className={ errors.stock_count ? 
                "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full"
                :
                "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
              }              
              style={{ transition: "all .15s ease" }}
            />
            <div className="absolute text-sm text-red-600 font-base mt-1">{errors.stock_count?.message}</div>
          </div>
          <div className="relative w-full mt-3 px-2">
            <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2" htmlFor="email">
              Bahasy
            </label>
            <input {...register("price")} type="number" step = "0.01" name="price" placeholder="Bahasy"
              className={ errors.price ? 
                "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full"
                :
                "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
              }                
              style={{ transition: "all .15s ease" }}
            />
            <div className="absolute text-sm text-red-600 font-base mt-1">{errors.price?.message}</div>
          </div>
          <div className="relative w-full mt-3 px-2">
            <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2" htmlFor="email">
              Gutudaky sany
            </label>
            <input {...register("quantity")} type="number" name="quantity" placeholder="sany"
              className={ errors.quantity ? 
                "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full"
                :
                "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
              }              
              style={{ transition: "all .15s ease" }}
            />
            <div className="absolute text-sm text-red-600 font-base mt-1">{errors.quantity?.message}</div>
          </div>
          <div className="relative w-full-1 mt-3 ">
            <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2" htmlFor="email">
              Srogy
            </label>
            <input {...register("date_of_expire")} type="date" name="date_of_expire" placeholder="Srogy"
              className={"px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"}
              style={{ transition: "all .15s ease" }}
            />
            <div className="absolute text-sm text-red-600 font-base mt-1"></div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="relative w-full mt-3 px-2">
            <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2">
              Harydyň düşündirişi tm
            </label>
            <textarea {...register("description_tm")} type="text" name="description_tm" placeholder="Düzümi"
              className={ errors.email ? 
                "px-3 py-2 w-auto placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full"
                :
                "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
              }
              style={{ transition: "all .15s ease" }}
            />
          </div>
        </div>
          {!values && 
          <div className="relative w-full mt-5 flex flex-col justify-start items-start">
          <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs font-medium mb-2" htmlFor="email">
            Harydyň suraty
          </label>
          <input type="file" onChange = {ChangeImage} multiple =""
            className=  "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"/>
          <div className="absolute top-14 left-0 text-xs text-red-500 font-normal mt-2">{errors.fullname?.message}</div>
        </div>

          }
        <div className="text-center mt-12 mb-2">
          <button
            className="bg-purple-700 hover:bg-purple-600 text-white  active:bg-gray-700 text-sm font-medium uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full"
            type="submit" 
          >
            {values ? "Üýtgetmek" : "Goşmak"}
          </button>
        </div>
      </form>
    </div>
  )
}

const schema = Yup.object().shape({
  product_name: Yup.string().min(3, "Azyndan 3 simwol bolmaly!").max(100, "Iň köp 100 simwol bolmaly!")
      .required("Hökman gerek"),
  stock_count: Yup.number().min(0, "Noldan kiçi bolmaly däl").max(999999)
    .required("Required"),
  price: Yup.number().min(1, "Minimum bahasy 1-den kici bolup bilmez").max(999999, "Maksimum bahasy 999999")
    .required("Hokmany"),
  quantity: Yup.number().min(1, 'Gutudaky sanny 1-den az bolmaly dal').max(100000, "Maksimum 100000 kop nolmaly dal")
    .required("Hokmany"),
  description_tm: Yup.string().min(0, "Minimum 10 simwol bolmaly").max(2000, "maksimum 2000 simwol bolmaly"),
  description_tm: Yup.string().min(0, "Minimum 10 simwol bolmaly").max(2000, "maksimum 2000 simwol bolmaly"),
});

export default Form;
