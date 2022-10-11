import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
    return(
        <>
        <div className="navigation">
            <Link to='/'>
            <h1>Logo</h1>
            </Link>
            <div className="navigation-links">
                <Link to='/'>
                    Home
                </Link>
                <Link to='/createCard'>
                    Nueva Tarjeta
                </Link>
            </div>
        </div>
        <Outlet></Outlet>
        </>
    )
}

export default Navigation;