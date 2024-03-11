import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import SearchResult from './pages/SearchResult'
import VideoPage from './pages/VideoPage'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'
import { useContext, useEffect } from 'react'
import { Context } from './context/contextApi'



const App = () => {

  const { dotRef } = useContext(Context);

  const navigate = useNavigate();
  const location = useLocation();

  let path = location.pathname.split('/').at(-1);

  useEffect(() => {
    if (path.toLocaleLowerCase() === 'login') {
      navigate('/')
    }
  }, [path])


  return (
    <div className='h-full relative bg-black' >

      <Routes >
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/searchResult/:searchQuery' element={<SearchResult />} />
          <Route path='/video/:id' element={<VideoPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>

      <div ref={dotRef} className="block sm:hidden w-[3px] h-[3px] bg-red-700 fixed top-[35%] left-[50%] "></div>
    </div>
  )
}

export default App
