import { useState, createContext } from 'react'
export const UserContext = createContext();

const UserProvider = ({children}) =>{
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={null}>
      {children}
    </UserContext.Provider >
  )
}

export default UserProvider

