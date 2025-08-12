import React, { useEffect, useState } from "react";
import API from '../services/api'
import { createContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            const stored = JSON.parse(localStorage.getItem('user'))
            setUser(stored);
            
        }
    }, [])

    const login = (data) =>{
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
    }

    const logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}