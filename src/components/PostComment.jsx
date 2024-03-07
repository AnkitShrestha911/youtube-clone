import { useContext, useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { Context } from "../context/contextApi";



const PostComment = () => {

    const [commentText, setCommentText] = useState('');
    const [inputClick, setInputClick] = useState(false);
    const { loginDetail } = useContext(Context);


    function handleComment(event) {
        event.preventDefault();
        setCommentText('');
        setInputClick(false)
    }
    function inputClickHandler() {
        setInputClick((prev) => !prev);
    }

    return (
        <form className='mt-10 max-w-[1200px]' onSubmit={handleComment} >
            <div className='flex gap-5'>
                <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full overflow-hidden'>
                    <img src={loginDetail?.photoURL} alt="profile" />
                </div>

                <input
                    type='text'
                    placeholder='Add a comment...'
                    className={`bg-transparent outline-none border-b w-full  border-b-gray-600 focus-within:border-b-white text-xs md:text-xl `}
                    onChange={(e) => setCommentText(e.target.value)}
                    onClick={() => setInputClick(true)}
                    value={commentText}
                />
            </div>

            <div className={`flex items-center justify-between ml-14 mt-3 ${inputClick ? 'flex' : 'hidden'}`}>
                <BsEmojiSunglasses className='text-2xl cursor-pointer' />

                <div className='flex gap-5'>
                    {/* cancel */}
                    <div className=' py-2 px-4 rounded-full hover:bg-gray-600 flex items-center justify-center gap-2 cursor-pointer text-xs md:text-[1rem]' onClick={inputClickHandler}>

                        Cancel
                    </div>

                    {/* comment btn */}
                    <button className={`py-2 px-4 rounded-full bg-gray-700/[0.3]  flex items-center justify-center gap-2 ${commentText.length > 0 ? 'cursor-pointer' : 'pointer-events-none'} ${commentText.length > 0 ? 'hover:bg-gray-700' : null} text-xs  md:text-[1rem]`}  >

                        Comment
                    </button>
                </div>


            </div>
        </form>
    )
}

export default PostComment
