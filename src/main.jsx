import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppContext } from './context/contextApi.jsx'
import { BrowserRouter } from 'react-router-dom'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'


TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppContext>
            <App />
        </AppContext>
    </BrowserRouter>

)
