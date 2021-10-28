import { useForm } from "react-hook-form";
import { add_user, update_user } from "../../http/adminApi";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import generator from 'generate-password'

function Form({values, setClose, users, setUsers, setLoad}){
 
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({ 
    resolver: yupResolver(schema),
    defaultValues:values
  });
  console.log(users)

  const GeneratePassword = async () =>{
    let pass = generator.generate({
      length: 6,
      numbers: true,
      symbols: false,
      lowercase: false,
      uppercase: false
    })
    console.log(pass)
    setValue('password',pass)
  }


  const onSubmit = async (data) => {
    setLoad(true)
    if(values){
      try{
        await update_user( data.full_name, data.email, data.main_phone, data.id)
        setUsers(users.map(item => {
          if(item.id === data.id){
            return data
          }return item
        }))
        setLoad(false)
        setClose()
      }catch(e){
        console.log("I am in upadte user error")
        console.log(e)
      }
    }else{
      try{
        const da = await add_user(data)
        await setUsers(users => [...users, da.rows]);
        setLoad(false)
        setClose();
      }catch(e){
        console.log("I am in add user error")
        console.log(e)
      }

    }
  }
  
  return(
    <div className="flex flex-col justify-start px-4 pb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
        <div className="relative w-full mt-5 flex flex-col justify-start items-start">
          <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs font-medium mb-2" htmlFor="email">
            Ady, Familýa
          </label>
          <input {...register("full_name")} type="text" name="full_name" placeholder="Ady, Familýa"
            className={ errors.full_name ? 
              "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full"
              :         
              "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
            }
          />
          <div className="absolute top-14 left-0 text-xs text-red-500 font-normal mt-2">{errors.full_name?.message}</div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center">
        <div className="relative w-full mt-3">
          <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input {...register("email")} type="email" name="email" placeholder="Email"
            className={ errors.email ? 
              "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full"
              :
              "px-3 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
            }
            style={{ transition: "all .15s ease" }}
          />
          <div className="absolute text-sm text-red-600 font-base mt-1">{errors.email?.message}</div>
        </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center">
        <div className="relative w-full mt-3">
          <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2" htmlFor="email">
            Telefon belgisi
          </label>
          <div>
          <div className = "absolute px-3 py-2 text-sm">+993</div>
            <input {...register("main_phone")} type="number" name="main_phone" placeholder="65555555"
              className={ errors.main_phone ? 
                "px-12 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none ring-1 ring-red-500 w-full"
                :
                "px-12 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
              }
              style={{ transition: "all .15s ease" }}
            />
          </div>
          <div className="absolute text-sm text-red-600 font-base mt-1">{errors.main_phone?.message}</div>
        </div>
        </div>
        {!values &&
        <div className="flex flex-col md:flex-row md:justify-between items-center">
        <div className="relative w-full mt-3">
          <label className="block uppercase text-gray-700 dark:text-gray-200 text-xs text-left font-medium mb-2" htmlFor="email">
            Gizlin kody
          </label>
          <div>
          <input className = "absolute px-3 py-2 text-sm rounded" type = "button" value = "Kody generirle" onClick = {GeneratePassword}/>
            <input {...register("password")} type="number" name="password" 
              className="px-40 py-2 placeholder-gray-400 text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 rounded text-sm focus:outline-none  border-0 ring-1 ring-gray-300 dark:ring-gray-800 focus:ring-purple-700 dark:focus:ring-2 dark:focus:ring-gray-600 w-full"
              
              style={{ transition: "all .15s ease" }}
            />
          </div>
          <div className="absolute text-sm text-red-600 font-base mt-1">{errors.password?.message}</div>
        </div>
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
  full_name: Yup.string().min(3, "Azyndan 3 simwol bolmaly!").max(100, "Iň köp 100 simwol bolmaly!")
      .required("Hökman gerek")
      .matches(
      /^[0-9a-z A-Zа-яА-ЯЁёýÝüÜöÖňŇäÄŽžşŞçÇ*/\\.,;:!?#-/$%&*+="@()]{3,100}$/,
      "Laýyk gelenok!"
  ),
  email: Yup.string().min(6, "Azyndan 6 simwol bolmaly").max(100, "Iň köp 100 simwol")
    .required("Required")
    .matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    "Email bolmaly"
  ),
  password: Yup.string().min(6, "Azyndan 8 simwol").max(6, "Iň köp 6 simwol").required('Required'),

  main_phone:Yup.string().min(8, "Telefon nomeri 8 simwoldan az bolmaly dal!").
  max(8, "Telefon nomeri 8 simwoldan kop bolmaly dal").required("Telefon nomeri hokman gerek").matches(
    /^[0-9]*$/,
    "Telefon hökman gerek!"
  ),
});

export default Form;
