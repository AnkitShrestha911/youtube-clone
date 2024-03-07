import { useContext, useEffect } from "react";
import SearchCard from "../components/SearchCard";
import { Context } from "../context/contextApi";
import Loader from "../components/Loader";
import { useParams, Link } from "react-router-dom";

const SearchResult = () => {
  const { loading, searchText, searchCardResult, fetchSelectedCategoryData } = useContext(Context);
  const { searchQuery } = useParams();



  useEffect(() => {
    fetchSelectedCategoryData('search', searchQuery);
  }, [])






  return (
    <div className="w-screen min-h-[100vh] bg-black px-2">
      {
        loading ? <Loader /> :
          <div className="w-full max-w-[1200px]  px-2 xl:pl-10 h-[calc(100%-100px)] mx-auto mt-[5rem] text-white  pb-10">
            <p className="text-xl py-5">{`Search Result for: ${searchText.length > 0 ? searchText : searchQuery}`}</p>
            {searchCardResult?.map((item, index) => {

              return <SearchCard key={index} video={item} />;
            })}

            {
              (!loading && searchCardResult.length === 0) &&
              <div className="w-full  text-white flex flex-col">
                <div className="mt-[10rem] w-full h-full text-center">
                  <h1 className="text-4xl">Result not found for {searchQuery}</h1>
                  <Link to={`/`} className="text-xl bg-gray-700 py-2 px-4 hover:bg-gray-600 rounded-md mt-10 inline-block">Go To Home</Link>
                </div>
              </div>
            }

          </div>

      }

    </div>
  );
};

export default SearchResult;