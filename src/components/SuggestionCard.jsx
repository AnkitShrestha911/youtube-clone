import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/contextApi";


const SuggestionCard = ({ video }) => {

  const { viewHandler, fetchRelatedVideoDetail, getVideoDetail, fetchVideoCommentDetail } = useContext(Context);
  const navigate = useNavigate();

  let cardThumbnail = video?.thumbnail[0]?.url;
  let videoTitle = video?.title;
  let channelTitle = video?.channelTitle;
  let totalLengthInSecond = video?.lengthText;
  let publishedTime = video?.publishedTimeText;
  let totalViews = video?.viewCount;

  function moveToTop() {
    window.scrollTo(0, 0);
  }

  return (

    <div className="w-full rounded-lg overflow-hidden flex  items-start mb-5 cursor-pointer" onClick={() => {
      navigate(`/video/${video?.videoId}`)
      moveToTop();
      async function getDetails() {
        await getVideoDetail(video?.videoId)
        await fetchVideoCommentDetail(video?.videoId);
        await fetchRelatedVideoDetail(video?.videoId);
      }
      getDetails();


    }}>
      {/* part-1 */}
      <div className="min-w-[200px]     overflow-hidden rounded-lg relative -z-0  ">
        <img
          src={cardThumbnail}
          className="min-w-full min-h-full "
        />

        <span className="bg-black text-white px-2 py-1 text-xs absolute right-1 bottom-1 rounded-md">{totalLengthInSecond === 0 ? null : totalLengthInSecond}</span>
      </div>

      {/* Part-2 */}
      <div className="max-w-full flex ">
        <div className="ml-3 ">
          <h2 className="font-bold text-[0.9rem]">
            {videoTitle.length > 25 ? videoTitle.substring(0, 25) + '...' : videoTitle}
          </h2>
          <p className="text-xs mt-2">{channelTitle}</p>

          <div className="flex gap-5 mt-3">
            <p className="text-xs ">{viewHandler(parseInt(totalViews))} views </p>
            <p className="text-xs">{publishedTime}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SuggestionCard;
