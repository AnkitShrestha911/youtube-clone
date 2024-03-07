
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='w-full text-white  flex flex-col'>
            <div className='mt-[10rem] text-center w-full h-full '>
                <h1 className='text-4xl font-bold tracking-wider'>This Page does not exist!</h1>
                <Link to={'/'} className='bg-gray-700 hover:bg-gray-600 py-2 px-4 mt-10 inline-block rounded-md'>
                    Go To Home
                </Link>
            </div>


        </div>
    )
}

export default NotFound
