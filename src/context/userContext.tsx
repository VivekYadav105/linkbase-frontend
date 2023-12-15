import React from "react"
import { useContext, useReducer, useState, ReactNode, createContext } from "react"
import { userInterface } from "../interface"

interface userContextType{
    user:userInterface|null,
    setUser:React.Dispatch<React.SetStateAction<userInterface>>;
}

const UserContext = createContext<userContextType>({
    user:{
        _id:"",
        userName:"",
        sharedLinks:0,
        storedLinks:0,
        publicLink:""
    },setUser(){}})

interface MyComponentPropsprops{
    children:ReactNode
}

function UserProvider({ children }: MyComponentPropsprops){
    const [user,setUser] = useState<userInterface>({
        _id:"",
        userName:"",
        sharedLinks:0,
        storedLinks:0,
        publicLink:""
    })
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
export {UserContext};