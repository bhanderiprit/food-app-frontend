import React, { createContext, useState } from 'react'

export const Context = createContext()

 const AuthContext = ({children}) => {

    const [foodPartener, setFoodPartner] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
  return (
    <div>
        <Context.Provider value={{foodPartener,setFoodPartner,loading,setLoading,user,setUser}}>
        {children}
        </Context.Provider>
    </div>
  )
}

export default AuthContext