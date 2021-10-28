import React, { useContext, useEffect, useState } from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import { Context } from '../index';
import { auth_routes, login_routes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite'

const AppRouter = observer( ()=>{
    const {admin} = useContext(Context);
    const history = useHistory();

    const [isAuth, setAuth] = useState(false);
    useEffect( () => {
        if(isAuth === false){
            admin.isAuth().then(data => {
                if(!data){
                    history.push(LOGIN_ROUTE);
                }else{
                    setAuth(true)
                }
         })}
        },[isAuth, admin, history]);
    return (
        <div>
            <Switch>
                {login_routes.map(({path, Component}) =>
                    <Route key = {path} path = {path} component = {Component} exact />
                )
                }
                {auth_routes.map(({path, Component}) =>
                    <Route key = {path} path = {path} component = {Component} exact />
                )}
                <Redirect to = {LOGIN_ROUTE}/>
            </Switch>
        </div>
    )
}
)


export default AppRouter;