import {makeAutoObservable} from 'mobx'

export default class UsersStore {
    constructor(){
        this._users = []
        makeAutoObservable(this)
    }
    setUsers(data) {
        console.log(data)
        this._users = []
        this._users = data
    }
    setaddUser(user){
        console.log(user);
        this._users = this._users.concat(user)
    }
    setUpdateUser(user){
        console.log(user);
        for(let i=0; i<this._users.length; i++){
            if (this._users[i].id === user.id){
                console.log(this._users[i])
                this._users[i] = user
                console.log(this._users[i])
            }
        }
    }

    deleteUser(id){
        this._users = this._users.filter(item => item.id !== id);
    }

    get users (){
        return this._users
    }
}