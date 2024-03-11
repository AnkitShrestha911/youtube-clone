import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/contextApi";
import moment from "moment";
import ReactTimeAgo from "react-time-ago";
import ReactPlayer from "react-player";


const VideoCard = ({ video, index }) => {

  const { viewHandler, getVideoDetail, fetchRelatedVideoDetail, hhmmss, fetchVideoCommentDetail, searchResults, dotRef, relatedVideos, searchCardResult } = useContext(Context);
  let refs = [];

  const navigate = useNavigate();
  const imgRef = useRef(null);
  const [isPlay, setIsPlay] = useState(false);
  const [height, setHeight] = useState(0);

  if (searchResults) {
    searchResults?.map(() => {
      refs.push(useRef(null));
    })


  }
  else if (relatedVideos) {
    relatedVideos?.map(() => {
      refs.push(useRef(null));
    })



  }
  else if (searchCardResult) {
    searchCardResult?.map(() => {
      refs.push(useRef(null));
    })

  }


  useEffect(() => {
    setIsPlay(false);
    setHeight(imgRef?.current?.offsetHeight);
    const previewOnScroll = () => {
      if (window.innerWidth <= 640) {
        window.addEventListener('scroll', () => {

          let overlap = !(dotRef?.current?.getBoundingClientRect().right < refs[index]?.current?.getBoundingClientRect().left ||
            dotRef?.current?.getBoundingClientRect().left > refs[index]?.current?.getBoundingClientRect().right ||
            dotRef?.current?.getBoundingClientRect().bottom < refs[index]?.current?.getBoundingClientRect().top ||
            dotRef?.current?.getBoundingClientRect().top > refs[index]?.current?.getBoundingClientRect().bottom)

          if (overlap) {
            setIsPlay(true);
          }
          else {
            setIsPlay(false)
          }


        })
      }

    }
    const getHeight = () => {
      previewOnScroll();
      setHeight(imgRef?.current?.offsetHeight);
    }
    window.addEventListener('resize', getHeight);


    previewOnScroll();


  }, [])



  function moveToTop() {
    window.scrollTo(0, 0);
  }


  let cardThumbnail = video?.snippet?.thumbnails?.medium?.url ? video?.snippet?.thumbnails?.medium?.url : video?.thumbnail[1]?.url;
  let videoTitle = video?.snippet?.title ? video?.snippet?.title : video?.title;
  let channelTitle = video?.snippet?.channelTitle ? video?.snippet?.channelTitle : video?.channelTitle;
  let totalLengthInSecond = video?.contentDetails ? moment.duration(video?.contentDetails?.duration).asSeconds() : video?.lengthText;
  let publishedTime = video?.snippet?.publishTime ? video?.snippet?.publishTime : video?.publishedAt;
  let totalViews = video?.videoStatistics?.viewCount ? video?.videoStatistics?.viewCount : video?.viewCount;
  let channelProfile = video?.channelPicture?.thumbnails?.high?.url ? video?.channelPicture?.thumbnails?.high?.url : video?.channelThumbnail[0]?.url;


  return (

    <div className="w-full rounded-lg overflow-hidden cursor-pointer mt-2" onClick={() => {
      navigate(`/video/${video?.id?.videoId ? video?.id?.videoId : video?.videoId}`)
      moveToTop()

      async function getDetails() {
        await getVideoDetail(video?.id?.videoId ? video?.id?.videoId : video?.videoId)
        await fetchVideoCommentDetail(video?.id?.videoId ? video?.id?.videoId : video?.videoId);
        await fetchRelatedVideoDetail(video?.id?.videoId ? video?.id?.videoId : video?.videoId);
      }
      getDetails();



    }} ref={refs[index]}>
      {/* part-1 */}

      <div className={`w-full  rounded-lg  relative   border  border-slate-800`} onMouseEnter={() => {
        if (window.innerWidth > 640) {
          setIsPlay(true)
        }
      }} onMouseLeave={() => {
        if (window.innerWidth > 640)
          setIsPlay(false)
      }
      } >

        <div className={`${isPlay ? 'opacity-0' : 'opacity-100'} `}>
          <img
            src={cardThumbnail}
            className={`w-full max-h-full cursor-pointer `}
            ref={imgRef}


          />
          <span className="bg-black text-white px-2 py-1 text-[0.9rem] absolute right-1 bottom-1 rounded-md">{totalLengthInSecond === 0 ? null : totalLengthInSecond === video?.lengthText ? totalLengthInSecond : hhmmss(totalLengthInSecond)}</span>
        </div>

        {isPlay &&
          < div className={` w-full absolute h-[${height}] top-0 bottom-0 left-0 right-0 `}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video?.id?.videoId ? video?.id?.videoId : video?.videoId}`}
              width={`100%`}
              height={`100%`}
              muted={true}
              playing={isPlay}
            />
          </div>
        }

        <div className={` w-full absolute h-[${height}] top-0 bottom-0 left-0 right-0 cursor-pointer`}></div>

      </div>

      {/* Part-2 */}
      <div className="w-full flex mt-3 ">
        {/* Avator profile picture */}
        <div className="max-w-[40px] max-h-[40px] overflow-hidden   ">
          <img
            src={channelProfile}
            className="w-full h-full rounded-full"
          />
        </div>

        <div className="ml-5">
          <h2 className="text-[0.9rem]">
            {videoTitle?.length > 50 ? videoTitle?.substring(0, 50) + '...' : videoTitle}
          </h2>

          <div className="flex md:hidden  flex-wrap w-full gap-x-2 mt-1 items-center  md:gap-0 md:mt-0">
            <span className="text-[0.64rem] sm:text-[0.73rem]  text-white/[0.85]">{channelTitle}</span>
            <span className=" text-[0.68rem] sm:text-[0.75rem]  text-white/[0.6]"> {viewHandler(totalViews)} {totalViews ? 'views' : null}</span>
            <span className=" text-[0.68rem] sm:text-[0.75rem]  text-white/[0.6]">{publishedTime ? <ReactTimeAgo date={Date.parse(publishedTime)} /> : null}</span>
          </div>

          <div className="hidden md:block gap-2 text-[0.68rem] sm:text-[0.75]  text-white/[0.6]">
            <p className="text-[0.64rem] sm:text-[0.73rem]  text-white/[0.85]">{channelTitle}</p>
            <div className="flex gap-x-3 mt-1">
              <p className=" text-[0.68rem] sm:text-[0.78rem]  text-white/[0.6]"> {viewHandler(totalViews)} {totalViews ? 'views' : null}</p>
              <p className=" text-[0.68rem] sm:text-[0.78rem]  text-white/[0.6]">{publishedTime ? <ReactTimeAgo date={Date.parse(publishedTime)} /> : null}</p>
            </div>
          </div>
        </div>

      </div>
    </div>


  );
};

export default VideoCard;