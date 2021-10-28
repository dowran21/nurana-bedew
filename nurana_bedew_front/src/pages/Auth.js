import React, { useContext } from 'react';
import {LockClosedIcon} from '@heroicons/react/solid'
import { useForm } from 'react-hook-form';
import {login} from '../http/adminApi'
import { useHistory } from 'react-router-dom';
import {Context} from '../index.js'
import { ORDERS_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite'

const Auth = observer( () =>{
  const {admin} = useContext(Context)
  const history = useHistory()
  const {register, handleSubmit} = useForm()

  const onSubmit = async (data) =>{
   try{ 
      const {response} =  await login(data.phone, data.password)
      if (response.status === 200){
        console.log("i am in if") 
        admin.setIsAuth(true);
        history.push(ORDERS_ROUTE)
      }
    }catch(e){
      alert("Gizlin kodunyz yada telefon blginiz yalnysh tazeden synansyn")
    }
  }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 items-center">
            <div>
              <img
                className="h-15 w-15 mx-auto items-center"
                src="./nurana_bedew.png"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">NURANA BEDEW ADMIN SAHYPASYNA HOŞ GELDIŇIZ</h2>
            </div>
            <form onSubmit = {handleSubmit(onSubmit)} className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    {...register("phone")}
                    name="phone"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Telefon belgiňizi giriziň"
                  />
                </div>
                <div className="py-2 mt-5">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Gizlin koduňyzy giriziň"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Girmek
                </button>
              </div>
            </form>
          </div>
        </div>
    )
})

export default Auth;