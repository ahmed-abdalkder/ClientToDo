import React from 'react';
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Layout from './Components/Layout/Layout';
import Signin from './Components/Signin/Signin';
import Home from './Components/Home/Home';
import TodoDetails from './Components/TodoDetails/TodoDetails';
import AuthContextProvider from './Context/Auth/AuthContext';
import TodoContextProvider from './Context/Todo/TodoContext';
import Signup from './Components/Signup/Signup';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import NotFound from './Components/NotFound/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
 import { useEffect } from 'react';
import PushSubscriptionManager from './Components/PushSubscriptionManager/PushSubscriptionManager';
import { useTranslation } from 'react-i18next';
 
 
function App() {
const { i18n } = useTranslation();
  useEffect(() => {
    
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(err => {
          console.error('Service Worker registration failed:', err);
        });
    });
  }

  
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        console.log("Notification permission:", permission);
      });
    }
  }
}, []);
 
  const router = createBrowserRouter([{path:"", element: <Layout/>, children:[
    {path:"signin", element:<Signin/>},
    {path:"", element:<Signup/>},
    {path:"home", element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"tododetails/:id", element:<ProtectedRoute><TodoDetails/></ProtectedRoute>},
    {path:"*", element:<NotFound/>},
  ]}]);

 
  const queryClient = new QueryClient()
  useEffect(() => {
    const html = document.documentElement;
    if (i18n.language === 'ar') {
      html.dir = 'rtl';
      html.lang = 'ar';
    } else {
      html.dir = 'ltr';
      html.lang = 'en';
    }
  }, [i18n.language]);
   
  return (
      <>
       
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <TodoContextProvider>
            <RouterProvider router={router} />
            <PushSubscriptionManager /> 
            <div><Toaster/></div>
          </TodoContextProvider>
        </QueryClientProvider>
        </AuthContextProvider>
        
      </>
  )
}

export default App
