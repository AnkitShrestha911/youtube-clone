import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { FaCheck } from "react-icons/fa6";
import {
  IoMdNotifications,
  IoIosArrowDown,
  IoMdNotificationsOff,
} from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { IoPersonRemoveSharp } from "react-icons/io5";
import SuggestionCard from "../components/SuggestionCard";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/contextApi";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { CgPlayListAdd } from "react-icons/cg";
import { BsThreeDots } from "react-icons/bs";
import { MdSort } from "react-icons/md";
import Comment from "../components/Comment";
import PostComment from "../components/PostComment";
import Loader from "../components/Loader";
import ReactTimeAgo from 'react-time-ago'
import VideoCard from "../components/VideoCard";


const VideoPage = () => {
  const videoId = useParams();

  // You can  access paramter only on that page where you defined it
  //Example i defined paramter in VideoPage like '/video/:id' i need to use param only in VideoPage to access this
  //:id else i cannot access :id on another page
  //Jispe page ke liye tumne url pe paramter diya hai only ussi page ke andr param ka use krke parameter ko access kr
  //skte hai  

  const [isMuted, setIsMuted] = useState(true)
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDisLike] = useState(false);
  const mainPage = useRef(null);




  const [SubscribedMenuClick, setSubscribedMenuClick] = useState(false);
  const {
    loading,
    likeHandler,
    viewHandler,
    currentVideo,
    mobileMenu,
    getVideoDetail,
    relatedVideos,
    fetchVideoCommentDetail,
    fetchRelatedVideoDetail,
    commentDetails,
    suggestionError,
    readmore,
    setReadMore,
    HomeError,
    logOut

  } = useContext(Context);


  const [likeCount, setLikeCount] = useState(parseInt(currentVideo?.statistics?.likeCount));


  const [SubscribedMenu, setSubscribedMenu] = useState({
    isSubscribed: false,
    isAll: false,
    isPersonalized: false,
    isNone: false,
    isUnsubcribed: true,
  });

  function SubscribedMenuClickHandler() {
    setSubscribedMenuClick((prev) => !prev);
  }

  function SubscribedMenuHandler(text) {
    if (text === "subscribed") {
      setSubscribedMenu(() => {
        return {
          isSubscribed: true,
          isAll: true,
          isPersonalized: false,
          isNone: false,
          isUnsubcribed: false,
        };
      });
    }
  }

  function notificationHandler(text) {
    switch (text) {
      case "all":
        setSubscribedMenu(() => {
          return {
            isSubscribed: true,
            isAll: true,
            isPersonalized: false,
            isNone: false,
            isUnsubcribed: false,
          };
        });
        break;

      case "personalized":
        setSubscribedMenu(() => {
          return {
            isSubscribed: true,
            isAll: false,
            isPersonalized: true,
            isNone: false,
            isUnsubcribed: false,
          };
        });
        break;

      case "none":
        setSubscribedMenu(() => {
          return {
            isSubscribed: true,
            isAll: false,
            isPersonalized: false,
            isNone: true,
            isUnsubcribed: false,
          };
        });
        break;

      case "unsubscribed":
        setSubscribedMenu(() => {
          return {
            isSubscribed: false,
            isAll: false,
            isPersonalized: false,
            isNone: false,
            isUnsubcribed: true,
          };
        });
        break;

      default:
        setSubscribedMenu(() => {
          return {
            isSubscribed: false,
            isAll: false,
            isPersonalized: false,
            isNone: false,
            isUnsubcribed: false,
          };
        });
        break;
    }
  }


  useEffect(() => {
    async function getDetails() {
      await getVideoDetail(videoId?.id);
      await fetchRelatedVideoDetail(videoId?.id);
      await fetchVideoCommentDetail(videoId?.id);
    }
    getDetails();

  }, [videoId?.id])



  useEffect(() => {
    setLikeCount(parseInt(currentVideo?.statistics?.likeCount));

  }, [currentVideo])


  let videoTitle = currentVideo?.snippet?.title;
  let channelTitle = currentVideo?.snippet?.channelTitle;
  let publishedTime = currentVideo?.snippet?.publishedAt;
  let totalViews = currentVideo?.videoStatistics?.viewCount ? currentVideo?.videoStatistics?.viewCount : currentVideo?.statistics?.viewCount;
  let subscribers = currentVideo?.channelStatistics?.subscriberCount;
  let totalComment = currentVideo?.videoStatistics?.commentCount ? currentVideo?.videoStatistics?.commentCount : currentVideo?.statistics?.commentCount;
  let description = currentVideo?.snippet?.description;

  function shortDescription(description) {
    return description.split('\n');
  }

  return (
    <div className={`w-full min-h-screen overflow-y-auto bg-black text-white pb-5 `}>

      {loading ?
        <Loader /> :
        HomeError?.response?.status === 403 ? (
          <div className="w-full  text-white flex flex-col">
            <div className="mt-[10rem] w-full h-full text-center">
              <h1 className="text-4xl">Something went wrong....</h1>
              <button onClick={() => logOut()} className="text-xl bg-gray-700 py-2 px-4 hover:bg-gray-600 rounded-md mt-10 inline-block">Logout</button>
            </div>
          </div>
        )
          :
          (currentVideo != undefined && Object.keys(currentVideo).length === 0) ?
            (<div className="w-full  text-white flex flex-col">
              <div className="mt-[10rem] w-full h-full text-center">
                <h1 className="text-4xl">Video not found !</h1>
                <Link to={`/`} className="text-xl bg-gray-700 py-2 px-4 hover:bg-gray-600 rounded-md mt-10 inline-block">Go To Home</Link>
              </div>
            </div>
            )
            :
            (
              < div className="max-w-[1600px]  mt-[80px]  justify-center  gap-x-5 h-full mx-auto flex flex-wrap xl:flex-nowrap ">
                {/* Part-1 */}
                <div className="w-full" >
                  <div className={` max-w-[1200px]   overflow-hidden rounded-lg border  border-gray-900  relative pt-[56.25%]`}>
                    <div className="w-full h-full absolute -z-0 left-0 top-0" >
                      <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoId?.id}`}
                        width={`100%`}
                        height={`100%`}
                        controls={true}
                        playing={true}
                        muted={isMuted ? true : false}
                        onStart={() => setIsMuted(false)}
                      />


                    </div>
                  </div>

                  <div className="mt-5  ">
                    <h2 className="text-white md:text-2xl font-bold tracking-wide px-2">
                      {videoTitle?.length > 80 ? videoTitle?.substring(0, 80) + '...' : videoTitle}
                    </h2>

                    {/* main div */}
                    <div className="mt-5 w-full flex justify-between flex-wrap min-[960px]:flex-nowrap gap-5 ">
                      {/* left div */}
                      <div className="w-full px-2">
                        <div className="flex gap-x-5  items-center flex-wrap    w-full">
                          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                            <img
                              src={currentVideo?.channelPicture?.thumbnails?.high?.url}
                              alt="profile"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <p className="flex items-center gap-x-2 tracking-wide text-[0.75rem]">
                              {channelTitle}{" "}
                              <span className="w-[16px] h-[16px] rounded-full bg-gray-400 inline-flex justify-center items-center text-black text-xl p-[2px]">
                                <FaCheck />
                              </span>
                            </p>
                            <p className="text-white/[0.5] text-[0.8rem] tracking-tight">
                              {viewHandler(subscribers)} subscribers
                            </p>
                          </div>


                          {/* left right div */}

                          <div
                            className={`bg-white text-black font-bold sm:font-normal py-2 text-[0.8rem] sm:text-[1rem] flex max-[331px]:mt-5   justify-center items-center cursor-pointer px-4 rounded-full  ${SubscribedMenu.isSubscribed ? "hidden" : "flex"
                              }`}
                            onClick={() => SubscribedMenuHandler("subscribed")}
                          >
                            Subscribe
                          </div>

                          <div className={`${!mobileMenu ? "relative" : null}`}>
                            {SubscribedMenu.isSubscribed && (
                              <div
                                className="flex flex-wrap max-[343px]:mt-5 py-2 items-center justify-between bg-gray-700 font-bold gap-x-2 rounded-full px-5 cursor-pointer  h-full"
                                onClick={SubscribedMenuClickHandler}
                              >
                                {SubscribedMenu.isAll &&
                                  SubscribedMenu.isSubscribed && (
                                    <MdNotificationsActive className="text-xl" />
                                  )}

                                {SubscribedMenu.isPersonalized && (
                                  <IoMdNotifications className="text-xl" />
                                )}

                                {SubscribedMenu.isNone && (
                                  <IoMdNotificationsOff className="text-xl" />
                                )}
                                <p className="flex items-center justify-between gap-x-2">
                                  <span className="hidden md:inline">Subscribed</span>{" "}
                                  <span className="text-xl">
                                    <IoIosArrowDown />
                                  </span>
                                </p>
                              </div>
                            )}

                            {/* Options */}
                            <div
                              className={`absolute z-10 ${!mobileMenu ? "top-[105%]" : "left-[18.5%]"
                                } max-[400px]:top-[110%]  ${mobileMenu ? "hidden" : "block"} left-0  bg-gray-700 rounded-xl ${SubscribedMenuClick ? "block" : "hidden"
                                }`}
                            >
                              <div
                                className="flex items-center hover:bg-gray-400 rounded-full font-bold gap-x-2  px-8 py-3 cursor-pointer "
                                onClick={() => {
                                  notificationHandler("all");
                                  SubscribedMenuClickHandler();
                                }}
                              >
                                <MdNotificationsActive className="text-xl" />
                                <p className="flex items-center justify-between gap-x-2">
                                  <span className="hidden min-[448px]:inline-block">All</span>{" "}
                                </p>
                              </div>

                              <div
                                className="flex items-center hover:bg-gray-400 rounded-full font-bold gap-x-2  px-8 py-3 cursor-pointer "
                                onClick={() => {
                                  notificationHandler("personalized");
                                  SubscribedMenuClickHandler();
                                }}
                              >
                                <IoMdNotifications className="text-xl" />
                                <p className="flex items-center justify-between gap-x-2">
                                  <span className="hidden min-[448px]:inline-block">Personalized</span>{" "}
                                </p>
                              </div>

                              <div
                                className="flex items-center hover:bg-gray-400 rounded-full  font-bold gap-x-2  px-8 py-3 cursor-pointer "
                                onClick={() => {
                                  notificationHandler("none");
                                  SubscribedMenuClickHandler();
                                }}
                              >
                                <IoMdNotificationsOff className="text-xl" />
                                <p className="flex items-center justify-between gap-x-2">
                                  <span className="hidden min-[448px]:inline-block" >None</span>{" "}
                                </p>
                              </div>

                              <div
                                className="flex items-center hover:bg-gray-400 rounded-full font-bold gap-x-2  px-8 py-3 cursor-pointer "
                                onClick={() => {
                                  notificationHandler("unsubscribed");
                                  SubscribedMenuClickHandler();
                                }}
                              >
                                <IoPersonRemoveSharp className="text-xl" />
                                <p className=" items-center justify-between gap-x-2 flex">
                                  <span className="hidden min-[448px]:inline-block">Unsubscribed</span>{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* right div */}
                      <div className="flex pl-2 items-center  overflow-x-auto lg:overflow-visible  gap-2 no-scrollbar">
                        {/* Like  */}
                        <div className=" flex items-center justify-between w-[120px] h-[38px]  cursor-pointer mr-7 ">
                          <div className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 h-full w-full  rounded-l-full px-3" onClick={() => {
                            setIsLike(true);
                            setIsDisLike(false);
                            setLikeCount(prev => prev + 1);

                          }}>
                            {
                              !isLike &&
                              <BiLike className="text-xl" />
                            }
                            {
                              isLike &&
                              <BiSolidLike className="text-xl" />
                            }
                            {likeHandler(likeCount)}

                          </div>

                          <div className="flex items-center pl-2 justify-center bg-gray-700  hover:bg-gray-600 w-full h-full border-l rounded-r-full border-l-gray-500 px-4 " onClick={() => {
                            setIsDisLike(true);
                            setIsLike(false);
                            setLikeCount(prev => prev - 1);
                          }}>
                            {
                              !isDislike &&
                              <BiDislike className="text-xl  " />
                            }
                            {
                              isDislike &&
                              <BiSolidDislike className="text-xl" />
                            }
                          </div>
                        </div>

                        {/* share */}

                        <div className="bg-gray-700 py-2 px-4 rounded-full hover:bg-gray-600 flex items-center justify-between gap-2 cursor-pointer">
                          <PiShareFat className="text-xl" />
                          Share
                        </div>

                        {/* Download */}
                        <div className="bg-gray-700 py-2 px-4 rounded-full hover:bg-gray-600 flex items-center justify-between gap-2 cursor-pointer">
                          <LiaDownloadSolid className="text-xl" />
                          Download
                        </div>

                        {/* save */}
                        <div className="bg-gray-700 py-2 px-4 rounded-full hover:bg-gray-600 flex items-center justify-between gap-2 cursor-pointer">
                          <CgPlayListAdd className="text-xl" />
                          Save
                        </div>

                        {/* save */}
                        <div className="bg-gray-700 py-2 px-2 rounded-full hover:bg-gray-600 flex items-center justify-between gap-2 cursor-pointer">
                          <BsThreeDots className="text-xl" />
                        </div>
                      </div>
                    </div>

                    {/* description */}
                    <div className="w-full px-1 md:px-0">
                      <div
                        className={`max-w-[1200px] min-h-[100px] bg-slate-800 rounded-xl mt-5 overflow-x-auto px-4 space-y-2 flex flex-col flex-wrap pb-[20px] text-[0.9rem]`}
                      >
                        <p className="flex gap-x-2 pt-2 flex-wrap ">
                          <span>{viewHandler(totalViews)} views</span> <span><ReactTimeAgo date={publishedTime ? Date.parse(publishedTime) : new Date()?.getTime()} /> </span>{" "}
                          {
                            !readmore &&
                            currentVideo?.snippet?.tags?.map((tag, index) => {
                              if (index >= 4) return;
                              return <span key={index}>#{tag}</span>
                            })

                          }
                          {
                            readmore &&
                            currentVideo?.snippet?.tags?.map((tag, index) => {
                              return <span key={index}>#{tag}</span>
                            })
                          }
                        </p>

                        <div className="space-y-5 text-justify pr-1 lg:pr-10 leading-5 md:leading-8 text-[0.9rem]">
                          {!readmore && (
                            <div>
                              {description?.length > 50
                                ? shortDescription(description?.substring(0, 50)).map((text, index) => {
                                  return <p key={index}>{text}{index === shortDescription(description?.substring(0, 50)).length - 1 ? '.....' : null}</p>
                                })
                                : description?.split('\n').map((text, index) => {
                                  return <p key={index}>{text}</p>
                                })}

                            </div>

                          )}

                          {readmore &&
                            <div>
                              {description?.split('\n').map((text, index) => {
                                return <p key={index}>{text}</p>
                              })}
                            </div>
                          }
                        </div>

                        {description?.length > 50 &&
                          <span
                            className="cursor-pointer text-sky-500"
                            onClick={() => setReadMore((prev) => !prev)}
                          >
                            {readmore ? "Showless" : "Showmore"}
                          </span>
                        }
                      </div>
                    </div>

                    <div className="w-full xl:w-auto mt-10 m  xl:hidden grid grid-cols-1 sm:grid-cols-2  gap-5 ">
                      {" "}

                      {(relatedVideos.length > 0) &&
                        relatedVideos?.map((item, index) => {
                          if (item.type != 'video') return false;
                          return <VideoCard key={index} video={item} />;
                        })}
                    </div>

                    {/* comment */}

                    <div >
                      {/* comment counter and sort by  */}
                      <div className="flex gap-x-10 mt-5 items-end pl-2 sm:pl-0 ">
                        <div className="text-xl md:text-2xl font-semibold">
                          {totalComment ? parseInt(totalComment).toLocaleString() : 0} Comments
                        </div>
                        <div className="flex items-center font-bold gap-x-2  px-4 rounded-full cursor-pointer  ">
                          <MdSort className="text-2xl md:text-4xl" />
                          Sort by
                        </div>
                      </div>

                      {/* comment insertion */}
                      <PostComment />

                      {/* Posted comment */}
                      <div className="mt-10  max-w-[1200px] pl-2 sm:pl-0">
                        {/* Show comment */}
                        {
                          commentDetails?.map((comment) => {
                            return <Comment comments={comment} key={comment.id} />
                          })
                        }
                      </div>
                    </div>

                  </div>
                </div>

                {/* right part main */}
                <div className="w-[calc(100%-1000px)]  mt-16  xl:mt-0  hidden xl:block   ">
                  {" "}
                  {(relatedVideos.length > 0) &&
                    relatedVideos?.map((item, index) => {
                      if (item.type != 'video') return false;
                      return <SuggestionCard key={index} video={item} />;
                    })}

                  {
                    (suggestionError?.code === 403 || relatedVideos.length === 0) &&
                    <h2 className="text-2xl text-center">No Suggestion Found</h2>
                  }
                </div>
              </div>
            )
      }


    </div >

  );
};

export default VideoPage;
