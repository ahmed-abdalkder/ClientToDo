
import React from "react";
import { NavLink, useNavigate } from "react-router-dom"
import userImage from "../../assets/user.jpeg"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Auth/AuthContext";
import { useTranslation } from 'react-i18next';
 
const Navbar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userName, token, setToken, setUserName } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };
    const signout = () => {
        localStorage.removeItem("tkn");
        sessionStorage.removeItem("tkn");
        localStorage.removeItem("name");
        sessionStorage.removeItem("name");

        setToken(null);
        setUserName(null);
        navigate("/signin");
    }

    useEffect(() => {
        setIsDropdownOpen(false); 
      }, [location.pathname, userName]);

    return (
        <div className="shadow border-b border-b-slate-200 bg-main-color">
            <div className='container py-3 flex items-center justify-between '>
                <div className="text-center text-2xl font-medium">
                    <h1>TO
                        <span className="text-sky-600">D<i className="text-3xl fa-regular fa-circle-check"></i></span>
                    </h1>
                </div>
                {/* right side */}
                <div className="relative flex items-center gap-x-4">
                    {/* dropdown */}
                    <div className="space-x-2">
                    <button onClick={() => changeLanguage('en')} className="px-1 py-1 border border-blue-600 rounded cursor-pointer hover:bg-green-200">EN</button>
                     <button onClick={() => changeLanguage('ar')} className="px-1 py-1 border border-blue-600 rounded cursor-pointer hover:bg-green-200">AR</button>
                      </div>
                    {token && (
                        <>
                            <NavLink to={"/home"} className="px-2.5 text-lg font-medium cursor-pointer hover:bg-sky-200 rounded-2xl transition-colors duration-200 ">
                                {t('home')}
                            </NavLink>
                            <button onClick={() => setIsDropdownOpen((prev) => !prev)}
                                className="cursor-pointer font-medium rounded-4xl text-sm text-center flex items-center sm:bg-sky-400 sm:px-3 py-1">
                                <span className="hidden sm:inline mr-2 text-white">{userName}</span>
                                <div className="w-8 h-8 rounded-full relative">
                                    <img src={userImage} alt="user" className="rounded-full"/>
                                    <i className="absolute right-0.5 bottom-0 rounded-full bg-slate-300 text-[10px] p-0.5 fa-solid fa-angle-down"></i>
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 absolute !right-0 !top-full">
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li>
                                            <span className="block px-4 py-2 hover:bg-gray-100">
                                                {userName}
                                            </span>
                                        </li>
                                        <li>
                                            <span
                                                onClick={signout}
                                                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {t('signOut')}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;
