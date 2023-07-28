import React, {useEffect, useState} from "react";

import UserService from "../services/user.service";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Header} from "./Home/Header";
import {NewsCard} from "./NewsCard";
import {Loading} from "./Loading";

const Home = () => {
    const [news, setNews] = useState([]);
    const [count, setCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentElement, setCurrentElement] = useState(null);
    const [loading, setLoading] = React.useState(1);

    const {user: currentUser} = useSelector((state) => state.auth);

    const navigate = useNavigate(); // react-router-dom v6

    useEffect(() => {
        setLoading(1);
        UserService.getNews().then(
            (response) => {
                setNews(response.data.news);
                setCount(response.data.totalResults);
                setCurrentIndex(0);
                setLoading(0);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setLoading(0);
            }
        );
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < news.length) {
                setCurrentElement(news[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            } else {
                setCurrentElement(null);
                setCurrentIndex(0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        loading ? (<Loading/>) : (
            <>
                <div className={"alert alert-info"}><span className={"red"}>News Update:</span>
                    {news.map((element, index) => (
                        <span key={index} className={`display-element ${currentIndex === index ? 'active' : ''}`}>
                        <strong className={"red"}>&bull;</strong> {element.title}
        </span>
                    ))}
                </div>
                <Header top5={news.slice(0, 5)}/>
                <div className={"row mt-5"}>
                    <div className="d-flex justify-content-between mt-5">
                        <h1>Latest News</h1>
                        <Link className={"red"} to={'categories'}>See all</Link>
                    </div>
                    <div className={"row"}>
                        {news.slice(5, 8).map((element, index) => (
                            <NewsCard key={index} news={element}/>
                        ))}
                    </div>
                </div>
            </>
        )

    );
};

export default Home;
