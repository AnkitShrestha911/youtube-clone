import { useContext } from "react";
import { Outlet } from "react-router-dom"
import Header from "./Header";
import { Context } from "../context/contextApi";
import Login from "../pages/Login";
import Loader from "./Loader";


const PrivateRoute = () => {

    const { loginDetail } = useContext(Context);

    if (loginDetail === undefined) {
        return <Loader />
    }
    else if (loginDetail === null) {
        return <Login />
    }
    else {

        return (
            !localStorage.getItem('accessToken') ? <Login /> :
                (<>
                    {localStorage.getItem('accessToken') ? <Header /> : null}
                    < Outlet />
                </>
                )


        )
    }
}

export default PrivateRoute
