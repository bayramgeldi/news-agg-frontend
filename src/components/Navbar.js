import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import React, {useEffect} from "react";
import NewsService from "../services/news.service";

const Navbar = (props) => {
    const [categories, setCategories] = React.useState([]);
    useEffect(() => {
        NewsService.getCategories().then(
            (response) => {
                console.log("rrs", response.data);
                setCategories(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setCategories([]);
            }
        );
    }, []);
    return (<nav className="navbar navbar-expand-lg navbar-dark black-bg white">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link to={"/"} className="navbar-brand">
                    {process.env.REACT_APP_NAME}
                </Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
                        {categories && categories.map((category, index) => (
                            <li key={category.id} className="nav-item mx-2">
                                <Link to={"/categories/"+category.name} className="nav-link">
                                    {category.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                {props.currentUser ? (
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {props.currentUser.name}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={props.onClick}>
                                Logout
                            </a>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    </nav>);
}
Navbar.propTypes = {
    currentUser: PropTypes.any,
    onClick: PropTypes.func
};
export default Navbar;
