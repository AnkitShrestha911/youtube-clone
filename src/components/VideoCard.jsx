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
      <div className={`w-full  ${height === 0 ? 'h-[249px]' : `h-[${height}px]`} overflow-hidden rounded-lg  relative   border border-slate-800`} >

        <img
          src={cardThumbnail}
          className={`w-full h-[175px] min-[500px]:h-[249px] 2xl:h-[249px] absolute ${isPlay ? '-z-10' : 'z-0'}`}
          ref={imgRef}

        />
        <span className="bg-black text-white px-2 py-1 text-[0.9rem] absolute right-1 bottom-1 rounded-md">{totalLengthInSecond === 0 ? null : totalLengthInSecond === video?.lengthText ? totalLengthInSecond : hhmmss(totalLengthInSecond)}</span>

        {isPlay &&
          <div>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video?.id?.videoId}`}
              width={`100%`}
              height={`${height}px`}
              muted={true}
              playing={isPlay}
            />
          </div>
        }

        <div className={`w-full h-[${height}px] absolute left-0 right-0 top-0 bottom-0`} onMouseEnter={() => setIsPlay(true)} onMouseLeave={() => setIsPlay(false)}></div>

      </div>

      {/* Part-2 */}
      <div className="w-full flex mt-3">
        {/* Avator profile picture */}
        <div className="max-w-[40px] max-h-[40px] overflow-hidden   ">
          <img
            src={channelProfile}
            className="w-full h-full rounded-full"
          />
        </div>

        <div className="ml-5">
          <h2 className="font-bold">
            {videoTitle?.length > 50 ? videoTitle?.substring(0, 50) + '...' : videoTitle}
          </h2>
          <p className="text-[0.8rem] sm:text-[0.9rem]">{channelTitle}</p>

          <div className="flex gap-5 text-[0.8rem] sm:text-[0.9rem]">
            <p> {viewHandler(totalViews)} {totalViews ? 'views' : null}</p>
            <p>{publishedTime ? <ReactTimeAgo date={Date.parse(publishedTime)} /> : null}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default VideoCard;
