import React from "react";
import { useContext } from 'react';
import NotFound from '../NotFound/NotFound'
import { AuthContext } from '../../Context/Auth/AuthContext';

type Props = {
    children: React.ReactNode  
}

const ProtectedRoute = ({children}: Props) => {
    const { token } = useContext(AuthContext);
    
  return (
    <>
      {token?children:<NotFound/>}
    </>
  )
}

export default ProtectedRoute