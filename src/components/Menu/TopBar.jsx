import React, { useContext, useEffect } from 'react'
import useToggle from '../../hooks/useToggle';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { app_name } from '../../config/variables';

export default function TopBar() {

  const navigate = useNavigate();

  const breakpoint = 640;
  const [visible, toggleVisibility, changeVisibility] = useToggle(true)
  const {user} = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("resize", () => checkToToogleShow(window.innerWidth));
    checkToToogleShow(window.innerWidth)

    function checkToToogleShow(width){
      if(width > breakpoint){
        changeVisibility(true);
      }else{
        changeVisibility(false);
      }
    }
  }, []);

  function logout(){
    localStorage.removeItem('user')
    Cookies.remove('token')
    return navigate("/");
  }

  return (
    <nav className="flex md:hidden items-center justify-between flex-wrap bg-gray-50 dark:bg-gray-800 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <NavLink to='/' className="font-semibold text-xl tracking-tight">{app_name}</NavLink>
        </div>
        <div className="block lg:hidden">
          <button 
            onClick={toggleVisibility}
            className="flex items-center px-3 py-3 border text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg className="fill-current h-3 w-3" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        { visible && (
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">
              
              </div>
              <div>
                { user ? (
                  <button
                    onClick={logout()}
                    type="button"
                    to="/logout"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded  border-white border-transparent mt-4 lg:mt-0 text-teal-500 bg-white"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isPending,isActive  }) =>
                      isPending ? "" : isActive ? 
                                "inline-block text-sm px-4 py-2 leading-none border rounded  border-white border-transparent mt-4 lg:mt-0 text-teal-500 bg-white" 
                              : "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                    }
                  >
                    Login
                  </NavLink>
                  
                )}
              </div>
            </div>
          )
        }
      </nav>
  )
}
