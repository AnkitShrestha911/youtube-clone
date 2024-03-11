import { useContext, useEffect, useRef } from "react";
import VideoCard from "../components/VideoCard";
import { Context } from "../context/contextApi";
import Loader from "../components/Loader";


const Home = () => {
  const { loading, selectCategories, searchResults, fetchSelectedCategoryData, HomeError, logOut } = useContext(Context);

  useEffect(() => {
    fetchSelectedCategoryData('home', selectCategories);
  }, [selectCategories])


  return (
    <div
      className={`w-screen min-h-[calc(100vh-80px)]  overflow-y-auto bg-black md:px-8 mt-14 relative `}
    >

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 text-white  md:place-items-baseline  pb-10 pt-10 gap-5 overflow-y-auto place-content-center  mx-auto">
        {loading ?

          <Loader /> :
          <>
            {(HomeError?.response?.status != 403 && searchResults?.length > 0) &&

              searchResults?.map((item, index) => {

                return <VideoCard key={index} video={item} index={index} />;
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
