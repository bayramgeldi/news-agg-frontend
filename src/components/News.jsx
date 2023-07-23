import {Link, useLocation, useParams} from "react-router-dom";
import {NewsCard} from "./NewsCard";
import React, {useEffect} from "react";
import UserService from "../services/user.service";

export const News = () => {
    const [news, setNews] = React.useState([]);
    const [count, setCount] = React.useState(0);

    let params = useParams();
    console.log(params);
    useEffect(() => {
        UserService.getNews().then(
            (response) => {
                setNews(response.data.news);
                setCount(response.data.totalResults);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        );
    }, []);
    return (
        <div className={"row mt-5"}>
            <div className="d-flex justify-content-between mt-5">
                <h1>Latest News</h1>
                <span className={"red"}>Count:{count}</span>
            </div>
            <div className={"row"}>
                {news.map((element, index) => (
                    <NewsCard key={index} news={element}/>
                ))}
            </div>
        </div>
    )
}
