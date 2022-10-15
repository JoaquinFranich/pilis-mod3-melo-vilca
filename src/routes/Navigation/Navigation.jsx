import { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

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
                <Link to='/'>
                    <h1>Logo</h1>
                </Link>
                <div className="navigation-links">
                    <Link to='/'>
                        Home
                    </Link>
                    {currentUser ? (
                        <Link to='/createCard'>
                            Nueva Tarjeta
                        </Link>
                    ) : (
                        <span style={{ color: 'red' }}>
                            Nueva Tarjeta
                        </span>
                    )}
                    {currentUser ? (
                        <span onClick={handleSignOut}>
                            Cerrar Sesion
                        </span>
                    ) : (
                        <Link to='/login'>
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