import { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Navigation.css";

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
                    <h1>Logo</h1>
                </Link>
                <div className="navigation-links">
                    <Link className="home" to='/'>
                        Home
                    </Link>
                    {currentUser ? (
                        <Link className="card" to='/createCard'>
                            Nueva Tarjeta
                        </Link>
                    ) : (
                        <span style={{ color: 'red' }}>
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