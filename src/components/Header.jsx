import { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../context/contextApi";
import { FaBars } from "react-icons/fa";
import {
  IoLogoYoutube,
  IoMdNotificationsOutline,
  IoMdArrowBack,
} from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import { categories } from "../utlis/constant";
import { MdOutlineVideoCall } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";



const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const removeLogoutMenu = (e) => {
      let check = false;
      if (e.target === document.querySelector('.profile-img') || e.target === infoRef?.current) return;
      Array.from(infoRef?.current?.children).map((child) => {
        if (e.target == child) {
          check = true;
        }
      })

      if (!check) {
        setProfileClick(false);
      }
    }

    window.addEventListener('click', removeLogoutMenu)

    return () => window.removeEventListener('click', removeLogoutMenu)
  }, [])



  const inputRef = useRef(null);
  const infoRef = useRef(null);

  async function logOut() {
    try {
      await signOut(auth);
    } catch (err) {
      console.log('error in signOut')
    }

    localStorage.removeItem('accessToken')
    navigate('/')
  }

  function menuToggle() {
    setMobileMenu((prev) => !prev);
    setProfileClick(false)
  }

  function searchToggle() {
    setSearchActive((prev) => !prev);
    setProfileClick(false)
  }

  function makeSearch() {
    if (localSearch) {
      setSearchText(localSearch);
      navigate(`/searchResult/${localSearch}`);
      fetchSelectedCategoryData('search', localSearch);
      setLocalSearch('');
      setSearchActive(false)
    }

  }

  function categoryHandler(name, type) {
    if (type != "menu") {
      return setSelectCategories(name);
    }
  }

  const {
    mobileMenu,
    setMobileMenu,
    selectCategories,
    setSelectCategories,
    setSearchText,
    fetchSelectedCategoryData,
    loginDetail,
  } = useContext(Context);

  const [searchActive, setSearchActive] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [profileClick, setProfileClick] = useState(false)




  return (
    <div
      className={`flex justify-between  items-center  z-30 fixed w-full h-[80px] top-0 bg-black text-white px-4 md:px-5 select-none`}
    >
      <div
        className={`h-full  items-center ${searchActive ? "hidden" : "flex"
          } md:flex`}
      >
        <FaBars
          className={`text-[20px] md:text-3xl cursor-pointer `}
          onClick={menuToggle}
        />
        <Link to={`/`} onClick={() => {
          setLocalSearch('');
          setSelectCategories('New')
        }}>
          <div className="flex justify-center items-center gap-2 ml-4 ">
            <IoLogoYoutube className=" text-[25px] md:text-[35px]" />
            <span className="font-bold md:text-xl">
              YouTube<sup className="font-extralight">IN</sup>
            </span>
          </div>
        </Link>
      </div>

      <div>
        <IoMdArrowBack
          size={35}
          onClick={searchToggle}
          className={`${searchActive ? "block" : "hidden"
            } cursor-pointer md:hidden`}
        />
      </div>

      {/* Searching */}
      <div
        className={`w-full max-w-[700px]  border  border-slate-600 rounded-[30px]  h-[50px] justify-between overflow-hidden ml-3 ${searchActive ? "flex" : "hidden"
          }  md:flex 2xl:mr-[12rem]`}
      >
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setLocalSearch(e.target.value);

          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              makeSearch();
              inputRef?.current?.blur();

            }
          }}
          value={localSearch}
          ref={inputRef}
          className="bg-transparent outline-none w-full text-xl pl-10 focus-within:border focus-within:border-sky-500 rounded-tl-[30px] rounded-bl-[30px] "
        />
        <div className="w-[100px] h-full bg-gray-800 flex justify-center items-center cursor-pointer" onClick={() => {
          makeSearch();
          inputRef?.current?.blur();

        }}>
          <IoSearchOutline size={30} />
        </div>
      </div>

      <div className="flex gap-3 md:gap-5 md:mr-10 pl-5 items-center">
        <IoSearchOutline
          className={`text-2xl md:hidden cursor-pointer ${searchActive ? "hidden" : null
            }`}
          onClick={searchToggle}
        />
        <MdOutlineVideoCall
          className={`text-2xl md:text-3xl cursor-pointer ${searchActive ? "hidden" : null
            } md:block`}
        />
        <IoMdNotificationsOutline
          className={`md:text-3xl cursor-pointer ${searchActive ? "hidden" : null
            } md:block hidden`}
        />
        <div
          className={`w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-[50%] overflow-hidden cursor-pointer ${searchActive ? "hidden" : null
            } md:block   select-none `}
          onClick={() => {
            setProfileClick(true)
          }
          }

        >
          <img
            src={loginDetail?.photoURL}
            alt="profile"
            className="w-full h-full object-cover profile-img"
          />

        </div>
        <div className={`bg-slate-800  text-white min-h-[150px] pb-5 w-[300px] absolute right-3 lg:right-10  flex-col items-center px-2 rounded-lg justify-center z-10  top-[95%] ${profileClick ? 'flex' : 'hidden'}`}
          ref={infoRef}>
          <p className="text-[1.2rem] mt-10 font-bold">Welcome, {loginDetail?.displayName}</p>
          <p className=" mt-3 font-bold text-[0.8rem] tracking-wide flex items-center ">{loginDetail?.email}</p>
          <button className="bg-black w-full py-2 font-bold rounded-lg mt-5 hover:bg-white/[0.2]" onClick={logOut}>Logout</button>
          <p className="absolute top-1 right-3 text-[0.8rem] font-bold cursor-pointer py-[0.2rem] rounded-lg px-2 bg-black hover:bg-white/[0.2]" onClick={() => setProfileClick(false)} >close</p>
        </div>
      </div>

      <div
        className={`min-h-screen md:h-[calc(100vh-80px)] bg-black  absolute top-[80%] w-[300px] z-[50]  ${mobileMenu ? "translate-x-[-20px]" : "translate-x-[-320px]"
          } flex flex-col pt-5 transition-all duration-300 ease-in-out overflow-y-auto `}
      >
        {categories.map((item, index) => {
          return (

            <div
              key={index}
              className={`text-white flex    mx-0 px-3  ${item.name === 'Settings' ? 'border-t mt-5 border-t-gray-700 ' : null}`}
              onClick={() => categoryHandler(item.name, item.type)}
            >

              <Link
                to={item.type != 'menu' ? '/' : '#'}
                className={`  flex  ${item.name === selectCategories ? "bg-gray-500" : null
                  } py-2 px-4 items-center w-full rounded-md `}
                onClick={() => setMobileMenu(false)}>
                <span className="text-2xl mr-5">{item.icon}</span>
                <span className="text-xl">
                  {item.name === "New" ? "Home" : item.name}
                </span>
              </Link>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
