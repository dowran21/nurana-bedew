import { useForm } from "react-hook-form";

import { add_category, update_category} from "../../http/adminApi";


function Form({values, setClose, categories, setCategories}){
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    defaultValues:values
  });
  

  

  const onSubmit = async (data) => {
    console.log(data)
    console.log("I am in on submit")
    if(values){
      try {
        await update_category(data.id, data)
        setCategories(categories.map(item => {
          if(item.id === data.id){
            return data
          }return item
        }))
        setClose()
      } catch (e) {
        console.log("i am in errror")
        console.log(e)
      }
    }else{
      try {
        const da = await add_category(data)
        setCategories([da.rows, ...categories])
        setClose()
      } catch (e) {
        console.log("i am in error")
      }
    }
  }  

  return(
    <div className="flex flex-col justify-start px-4 pb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
        <div className="relative w-full mt-5 flex flex-col justify-start items-start">
          <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs font-medium mb-2" htmlFor="email">
            kategoriýanyň ady
          </label>
          <input {...register("category_name")} type="text" name="category_name" placeholder="Ady, Familýa"
            className={ errors.fullname ? 
              "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full"
              :         
              "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
            }
          />
        <div className="text-center mt-12 mb-2">
          <button
            className="bg-purple-700 hover:bg-purple-600 text-white  active:bg-gray-700 text-sm font-medium uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full"
            type="submit" 
          >
            {values ? "Üýtgetmek" : "Goşmak"}
          </button>
        </div>
        </div>
      </form>
    </div>
  )
}

// const schema = Yup.object().shape({
//   fullname: Yup.string().min(3, "Azyndan 3 simwol bolmaly!").max(100, "Iň köp 100 simwol bolmaly!")
//       .required("Hökman gerek")
//       .matches(
//       /^[0-9a-z A-Zа-яА-ЯЁёýÝüÜöÖňŇäÄŽžşŞçÇ*/\\.,;:!?#-/$%&*+="@()]{3,100}$/,
//       "Laýyk gelenok!"
//   ),
//   email: Yup.string().min(6, "Azyndan 6 simwol bolmaly").max(100, "Iň köp 100 simwol")
//     .required("Required")
//     .matches(
//     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
//     "Email bolmaly"
//   ),
//   password: Yup.string().min(8, "Azyndan 8 simwol").max(50, "Iň köp 50 simwol").required('Required')
//   .matches(
//     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//     "Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly"
//   ),

//   role_id:Yup.string().min(1, "Roly hökman gerek!").matches(
//     /^[0-9]*$/,
//     "Roly hökman gerek!"
//   ),
// });

export default Form;
