import { useNavigate } from "react-router-dom";
import VideoCard from "./VideoCard";
import { useContext } from "react";
import { Context } from "../context/contextApi";
import moment from "moment";
import ReactTimeAgo from "react-time-ago";

const SearchCard = ({ video }) => {



  const { viewHandler, hhmmss, fetchVideoCommentDetail, setCurrentVideo, fetchRelatedVideoDetail } = useContext(Context);

  const navigate = useNavigate();

  let cardThumbnail = video?.snippet?.thumbnails?.medium?.url ? video?.snippet?.thumbnails?.medium?.url : video?.snippet?.thumbnails?.default?.url;
  let videoTitle = video?.snippet?.title;
  let channelTitle = video?.snippet?.channelTitle;
  let totalLengthInSecond = moment.duration(video?.contentDetails?.duration).asSeconds();
  let publishedTime = video?.snippet?.publishTime;
  let totalViews = video?.videoStatistics?.viewCount;
  let channelProfile = video?.channelPicture?.thumbnails?.high?.url;
  let description = video?.snippet?.description;

  function moveToTop() {
    window.scrollTo(0, 0);
  }


  return (
    <>
      <div className="w-full  overflow-hidden cursor-pointer sm:pl-2   items-start mb-5 sm:flex hidden" onClick={() => {
        navigate(`/video/${video?.id?.videoId}`)
        moveToTop();

        setCurrentVideo(video)

        async function getDetails() {
          await fetchVideoCommentDetail(video?.id?.videoId);
          await fetchRelatedVideoDetail(video?.id?.videoId);
        }
        getDetails();


      }}>
        {/* part-1 */}
        <div className="min-w-[350px] overflow-hidden   rounded-[8px]  relative z-0">
          <img
            src={cardThumbnail}
            className="min-w-full h-full object-fill "
          />
          <span className="bg-black text-white px-2 py-1 text-[0.9rem] absolute right-2 bottom-1 rounded-md">{totalLengthInSecond ? hhmmss(totalLengthInSecond) : null}</span>
        </div>

        {/* Part-2 */}
        <div className="w-full flex ml-5    ">
          <div className="ml-3 space-y-6 ">
            <div>
              <h2 className="font-bold text-xl">
                {videoTitle?.length > 80 ? videoTitle?.substring(0, 80) + '...' : videoTitle}
              </h2>
              <div className="flex gap-5 mt-3">
                <p className="text-xs tracking-wide">{viewHandler(totalViews)} {totalViews ? 'views' : null} </p>
                <p className="text-xs tracking-wide">{publishedTime ? <ReactTimeAgo date={Date.parse(publishedTime)} /> : null}</p>
              </div>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-x-3 ">
              <div className="max-w-[30px] max-h-[30px]  overflow-hidden rounded-full">
                <img
                  src={channelProfile}
                  className="w-full h-full"
                />
              </div>
              <p className="text-[0.8rem] text-white/[0.7] tracking-wide ">
                {channelTitle}
              </p>
            </div>

            <p className="text-[0.9rem] text-white/[0.7] tracking-wide ">
              {description?.substring(0, 100) + '...'}
            </p>
          </div>
        </div>
      </div>

      <div className="sm:hidden block mt-5">
        <VideoCard video={video} />
      </div>
    </>

  );
};

export default SearchCard;
