import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/contextApi";
import moment from "moment";
import ReactTimeAgo from "react-time-ago";
import ReactPlayer from "react-player";


const VideoCard = ({ video }) => {


  const navigate = useNavigate();
  const imgRef = useRef(null);
  const [isPlay, setIsPlay] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setIsPlay(false);
    setHeight(imgRef?.current?.offsetHeight);
    const getHeight = () => {
      setHeight(imgRef?.current?.offsetHeight);
    }
    window.addEventListener('resize', getHeight);

  }, [])



  const { viewHandler, getVideoDetail, fetchRelatedVideoDetail, hhmmss, fetchVideoCommentDetail } = useContext(Context);


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

    <div className="w-full rounded-lg overflow-hidden cursor-pointer " onClick={() => {
      navigate(`/video/${video?.id?.videoId ? video?.id?.videoId : video?.videoId}`)
      moveToTop()

      async function getDetails() {
        await getVideoDetail(video?.id?.videoId ? video?.id?.videoId : video?.videoId)
        await fetchVideoCommentDetail(video?.id?.videoId ? video?.id?.videoId : video?.videoId);
        await fetchRelatedVideoDetail(video?.id?.videoId ? video?.id?.videoId : video?.videoId);
      }
      getDetails();



    }}>
      {/* part-1 */}

      <div className={`w-full  rounded-lg  relative   border  border-slate-800`} onMouseEnter={() => setIsPlay(true)} onMouseLeave={() => setIsPlay(false)}>
        <div className={`${isPlay ? 'opacity-0' : 'opacity-100'} `} >
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

          <div className="flex gap-5 mt-1 items-center md:block md:gap-0 md:mt-0">
            <p className="text-[0.73rem]  text-white/[0.8]">{channelTitle}</p>
            <div className="flex gap-5 text-[0.75rem]  text-white/[0.6]">
              <p> {viewHandler(totalViews)} {totalViews ? 'views' : null}</p>
              <p>{publishedTime ? <ReactTimeAgo date={Date.parse(publishedTime)} /> : null}</p>
            </div>
          </div>

        </div>
      </div>
    </div >

  );
};

export default VideoCard;