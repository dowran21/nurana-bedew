import {makeAutoObservable} from 'mobx'; 
import { load_user } from '../http/adminApi';

export default class AdminStore  {
    constructor(){
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool 
    }

    setUser(user) {
        this._user = user
    }
    isAuth = async () =>{
        try{
            await load_user();
            this.setIsAuth(true);
            return true
        }catch(err){
            return false
        }
    }

    get user() {
        return this._user
    }
}