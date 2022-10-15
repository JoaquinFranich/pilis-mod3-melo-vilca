import { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Navigation.css";
import { FcLandscape } from "react-icons/fc";
import { FaHome } from "react-icons/fa";

const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        const userStored = localStorage.getItem('currentUser')
        if (userStored) {
            setCurrentUser(JSON.parse(userStored))
        }
        // eslint-disable-next-line
    }, [])

    const handleSignOut = () => {
        setCurrentUser(null);
        localStorage.setItem('currentUser', null)
    }

    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <h1><FcLandscape></FcLandscape>Weather 6</h1>
                </Link>
                <div className="navigation-links">
                    <Link className="home" to='/'>
                       <FaHome></FaHome> Home
                    </Link>
                    {currentUser ? (
                        <Link className="card" to='/createCard'>
                            Nueva Tarjeta
                        </Link>
                    ) : (
                        <span className="card" style={{ color: 'grey' }}>
                            Nueva Tarjeta
                        </span>
                    )}
                    {currentUser ? (
                        <span className="logout" onClick={handleSignOut}>
                            Cerrar Sesion
                        </span>
                    ) : (
                        <Link className="login" to='/login'>
                            Iniciar Sesion
                        </Link>
                    )}
                </div>
            </div>
            <Outlet></Outlet>
        </>
    )
}

export default Navigation;