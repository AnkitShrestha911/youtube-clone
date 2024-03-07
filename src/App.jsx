import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import SearchResult from './pages/SearchResult'
import VideoPage from './pages/VideoPage'
import Header from './components/Header'
import NotFound from './pages/NotFound'
import { useContext } from 'react'
import PrivateRoute from './components/PrivateRoute'
import { Context } from './context/contextApi'

const App = () => {

  const { loginDetail } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname.split('/').at(-1);
  if (path.toLocaleLowerCase() === 'login') {
    navigate('/')
  }

  return (
    <div className='h-full relative bg-black' >
      {
        localStorage.getItem('accessToken') ? <Header /> : null
      }
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/searchResult/:searchQuery' element={<SearchResult />} />
          <Route path='/video/:id' element={<VideoPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
