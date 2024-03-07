import { useContext, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import { Context } from "../context/contextApi";
import Loader from "../components/Loader";
import { auth } from "../auth/firebase";
import { signOut } from "firebase/auth";

const Home = () => {
  const { loading, selectCategories, searchResults, fetchSelectedCategoryData, HomeError } = useContext(Context);


  async function logOut() {
    try {
      await signOut(auth);

    } catch (err) {
      console.log('error in signOut')
    }

    localStorage.removeItem('accessToken')
    navigate('/')

  }

  useEffect(() => {
    fetchSelectedCategoryData('home', selectCategories);
  }, [selectCategories])


  return (
    <div
      className={`w-screen min-h-[calc(100vh-80px)] bg-black px-5  md:px-10 mt-14 `}
    >

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 text-white  md:place-items-baseline  pb-10 pt-10 gap-5 overflow-y-auto place-content-center  mx-auto">
        {loading ?

          <Loader /> :
          <>
            {searchResults?.length > 0 &&

              searchResults?.map((item, index) => {

                return <VideoCard key={index} video={item} />;
              })
            }
          </>
        }
      </div>
      {
        HomeError?.response?.status === 403 &&
        <div className="w-full  text-white flex flex-col">
          <div className="mt-[10rem] w-full h-full text-center">
            <h1 className="text-4xl">Something went wrong....</h1>
            <button onClick={() => logOut()} className="text-xl bg-gray-700 py-2 px-4 hover:bg-gray-600 rounded-md mt-10 inline-block">Logout</button>
          </div>
        </div>
      }
    </div>
  );
};

export default Home;
