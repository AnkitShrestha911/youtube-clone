import { useContext, useEffect, useRef, useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { Context } from "../context/contextApi";

const ReplyComment = ({ replyClick, setReplyClick }) => {
  const [commentText, setCommentText] = useState("");
  const inputRef = useRef();
  const { loginDetail } = useContext(Context);


  function handleComment(event) {
    event.preventDefault();
    setCommentText('');
    setReplyClick(false)
  }

  useEffect(() => {
    inputRef?.current?.focus();
  }, [replyClick]);

  return (
    <form
      className={` mt-10 ${replyClick ? "block" : "hidden"} `} onSubmit={handleComment}
    >
      <div className="flex gap-5">
        <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full overflow-hidden">
          <img
            src={loginDetail?.photoURL}
            alt="profile"
          />
        </div>

        <input
          type="text"
          placeholder="Add a comment..."
          className="bg-transparent outline-none border-b w-full md:pl-5 border-b-gray-600 focus-within:border-b-white text-[0.9rem] md:text-xl  "
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
          ref={inputRef}
        />
      </div>

      <div className={`flex items-center justify-between ml-14 mt-3`}>
        <BsEmojiSunglasses className="text-xs md:text-2xl cursor-pointer" />

        <div className="flex gap-x-2 md:gap-5">
          {/* cancel */}
          <div
            className="text-xs md:text-[1rem] py-1 px-2 md:py-2 md:px-4 rounded-full hover:bg-gray-600 flex items-center justify-center gap-2 cursor-pointer "
            onClick={() => setReplyClick(false)}
          >
            Cancel
          </div>

          {/* comment btn */}
          <button
            className={`text-xs py-1 px-2 md:py-2 md:px-4 rounded-full  flex items-center justify-center gap-2 md:text-[1rem] ${commentText.length > 0 ? "cursor-pointer" : "pointer-events-none"
              } ${commentText.length > 0
                ? "hover:bg-gray-700"
                : "bg-gray-700/[0.2] "
              }`}
          >
            Comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReplyComment;
