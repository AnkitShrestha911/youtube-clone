import { useEffect, useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'
import ReplyComment from './ReplyComment'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import ReactTimeAgo from 'react-time-ago';






const Comment = ({ comments }) => {

    const [replyClick, setReplyClick] = useState(false);
    const [viewReply, setViewReply] = useState(false);




    return (

        <>
            <div className='flex  gap-5 mb-3  '>
                {(comments?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl || comments?.snippet?.authorProfileImageUrl) &&
                    <div className={`w-[40px] h-[35px] md:w-[35px] md:h-[35px] rounded-full overflow-hidden `}>
                        <img src={(comments?.snippet?.topLevelComment) ? (comments?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl) : (comments?.snippet?.authorProfileImageUrl)} className='w-full  h-full' loading='lazy' />
                    </div>
                }

                <div className={`space-y-2 w-full b rounded-lg p-2 `}>
                    <p className='text-[0.7rem] md:text-[0.8rem]'>{(comments?.snippet?.topLevelComment) ? comments?.snippet?.topLevelComment?.snippet?.authorDisplayName : comments?.snippet?.authorDisplayName}
                        <span className='text-xs ml-2 text-white/[0.5] tracking-wide'>{
                            <ReactTimeAgo date={Date.parse((comments?.snippet?.topLevelComment) ? comments?.snippet?.topLevelComment?.snippet?.publishedAt : comments?.snippet?.publishedAt)} />
                        }
                        </span></p>
                    <p className='text-[0.9rem] md:text-[1.2rem] leading-8 text-justify pr-3'>{(comments?.snippet?.topLevelComment) ? comments?.snippet?.topLevelComment?.snippet?.textOriginal : comments?.snippet?.textOriginal}</p>

                    <div className='flex items-center gap-x-2'>
                        <div className='flex items-center md:gap-3 '>
                            <div className='w-[30px] h-[30px] hover:bg-gray-700 rounded-full cursor-pointer flex justify-center items-center'>
                                <BiLike className='md:text-xl' />
                            </div>
                            <span className='text-xs md:text-xl'>{(comments?.snippet?.topLevelComment) ? comments?.snippet?.topLevelComment?.snippet?.likeCount : comments?.snippet?.likeCount}</span>
                        </div>

                        <div className='p-2  hover:bg-gray-700 rounded-full cursor-pointer'>
                            <BiDislike className='md:text-xl' />
                        </div>

                        <div className='text-xs md:text-[1rem] py-2 px-3 hover:bg-gray-700 rounded-full cursor-pointer' onClick={() => setReplyClick(true)}>
                            Reply
                        </div>
                    </div>

                    {/* do reply */}
                    <div className={`${replyClick ? 'block' : 'hidden'}`}>
                        <ReplyComment replyClick={replyClick} setReplyClick={setReplyClick} viewReply={viewReply} />
                    </div>


                    {/* Views */}
                    {comments?.replies?.comments?.length > 0 &&
                        <div className='flex items-center  justify-center gap-x-1 md:gap-x-3 text-sky-600 font-bold w-[100px] md:w-[120px] h-[40px] rounded-full hover:bg-sky-400/[0.2] cursor-pointer text-xs md:text-[1rem]' onClick={() => setViewReply(prev => !prev)}>
                            {viewReply &&

                                <FaCaretUp className='md:text-xl' />
                            }

                            {
                                !viewReply &&
                                <FaCaretDown className='md:text-xl' />
                            }
                            {comments?.replies?.comments?.length} {comments?.replies?.comments?.length > 1 ? 'replies' : 'reply'}
                        </div>
                    }

                </div>
            </div >





            <div className={`${comments?.replies ? 'ml-5 mb-3 rounded-lg px-2  py-2 bg-gray-800' : null} ${viewReply ? 'block' : 'hidden'} `}>
                {
                    comments?.replies?.comments?.map((reply) => {
                        return <Comment comments={reply} key={reply.id} />
                    })
                }



            </div>




        </>


    )
}

export default Comment
