import { createContext, useState, useEffect } from 'react'
import { fetchDataFromApi, fetchDataFromRapidApi } from '../utlis/api'
import { auth } from '../auth/firebase';
import { signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';





export const Context = createContext();

export const AppContext = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [readmore, setReadMore] = useState(false);
    const [searchResults, setSearchResults] = useState();
    const [HomeError, setHomeError] = useState();
    const [suggestionError, setSuggestionError] = useState();
    const [searchCardResult, setSearchCardResult] = useState([]);
    const [commentDetails, setCommentDetails] = useState([]);
    const [currentVideo, setCurrentVideo] = useState();
    const [relatedVideos, setRelatedVideo] = useState([]);
    const [selectCategories, setSelectCategories] = useState('New');
    const [mobileMenu, setMobileMenu] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [loginDetail, setLoginDetail] = useState();


    // setCommentsData((prev) => { return { ...prev } }) // this means we forcefully tell the react to re-render it

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (!localStorage.getItem('accessToken')) {
                    localStorage.setItem('accessToken', currentUser.accessToken);
                }
                setLoginDetail(currentUser);
            }
            else {
                setLoginDetail(null)
            }

        })

    }, [])




    async function googleSignIn() {
        navigate('/')
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider)


    }
    function checkDecimal(view, base) {
        //means decimal found
        if ((view / base) % 1 != 0) {
            return (view / base).toFixed(1);
        }

        // when decimal not found
        return Math.floor((view / base)).toFixed(0);

    }



    function viewHandler(view) {
        //Billion
        if (view >= 1000000000) {

            return checkDecimal(view, 1000000000) + 'B';

        }
        //Millions
        else if (view >= 1000000) {
            return checkDecimal(view, 1000000) + 'M';
        }

        //Thousands 
        else if (view >= 100000 || view >= 10000 || view >= 1000) {
            return checkDecimal(view, 1000) + 'K';
        }

        else {
            return view;
        }


    }



    function likeHandler(view) {
        //Billion
        if (view >= 1000000000) {

            return checkDecimal(view, 1000000000) + 'B';

        }
        //Millions
        else if (view >= 1000000) {
            return checkDecimal(view, 1000000) + 'M';
        }

        //Thousands 
        else if (view >= 100000 || view >= 10000 || view >= 1000) {
            return checkDecimal(view, 1000) + 'K';
        }

        else {
            return view;
        }

    }

    const hhmmss = (value) => {
        if (value < 3600) {
            return moment.utc(value * 1000).format('mm:ss');
        }
        else {
            return moment.utc(value * 1000).format('HH:mm:ss');
        }
    }



    useEffect(() => {
        async function getCategoryDetail() {
            await fetchSelectedCategoryData('home', selectCategories);
        }

        if (loginDetail) {
            getCategoryDetail();
        }

    }, [selectCategories])


    async function fetchSelectedCategoryData(type, query) {
        setLoading(true);
        try {
            const { items } = await fetchDataFromApi(`search?q=${query}&part=snippet,id&maxResults=50&type=video`);


            if (type === 'home') {
                await Promise.all(items?.map(async (video) => {
                    const data = await fetchDataFromApi(`channels?id=${video?.snippet?.channelId}&part=snippet,statistics`)
                    const response = await fetchDataFromApi(`videos?id=${video?.id?.videoId}&part=statistics,contentDetails`)
                    video.channelStatistics = data?.items[0]?.statistics;
                    video.channelPicture = data?.items[0]?.snippet;
                    video.videoStatistics = response?.items[0]?.statistics;
                    video.contentDetails = response?.items[0]?.contentDetails;
                })
                )
                setSearchResults(items);
            }

            else {

                await Promise.all(items?.map(async (video) => {
                    const data = await fetchDataFromApi(`channels?id=${video?.snippet?.channelId}&part=snippet,statistics`)
                    const response = await fetchDataFromApi(`videos?id=${video?.id?.videoId}&part=statistics,contentDetails`)
                    video.channelStatistics = data?.items[0]?.statistics;
                    video.channelPicture = data?.items[0]?.snippet;
                    video.videoStatistics = response?.items[0]?.statistics;
                    video.contentDetails = response?.items[0]?.contentDetails;
                })
                )

                setSearchCardResult(items);

            }

        } catch (err) {
            console.log('error in fetchSelectedCategoryData')
            setHomeError(err)
        }

        setLoading(false)
    }

    async function fetchRelatedVideoDetail(videoId) {
        setLoading(true);


        const { data, error } = await fetchDataFromRapidApi(`related?id=${videoId}`);

        if (data?.length > 0) {
            setRelatedVideo(data);
        }
        else {
            setSuggestionError(error);
        }

        setLoading(false);
    }





    async function getVideoDetail(videoId) {
        setLoading(true);

        try {
            const { items } = await fetchDataFromApi(`videos?id=${videoId}&part=snippet,id,statistics,contentDetails`);
            const data = await fetchDataFromApi(`channels?id=${items[0]?.snippet?.channelId}&part=snippet,statistics`);
            await Promise.all(items?.map((video) => {
                video.channelPicture = data?.items[0]?.snippet;
                video.channelStatistics = data?.items[0]?.statistics;
            })).then(() => {
                if (items?.length != 0) {
                    setCurrentVideo(items[0]);
                    setReadMore(false)
                } else {
                    setCurrentVideo({})
                }
            })

        } catch (err) {
            console.log(err)
        }


        setLoading(false);

    }


    async function fetchVideoCommentDetail(videoId) {
        setLoading(true);
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&maxResults=50&key=${import.meta.env.VITE_YOUTUBE_DATA_V3_API_KEY}`);
            const { items } = await response.json();
            setCommentDetails(items);

        } catch (err) {
            console.log(err);
        }

        setLoading(false)

    }


    return (
        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                setSearchResults,
                selectCategories,
                setSelectCategories,
                mobileMenu,
                setMobileMenu,
                viewHandler,
                likeHandler,
                searchText,
                setSearchText,
                getVideoDetail,
                relatedVideos,
                fetchSelectedCategoryData,
                searchCardResult,
                setSearchCardResult,
                hhmmss,
                fetchVideoCommentDetail,
                commentDetails,
                googleSignIn,
                loginDetail,
                setLoginDetail,
                currentVideo,
                setCurrentVideo,
                suggestionError,
                fetchRelatedVideoDetail,
                readmore,
                setReadMore,
                HomeError,


            }}
        >
            {props.children}
        </Context.Provider>
    )

}




