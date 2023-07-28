import {useParams} from "react-router-dom";
import {NewsCard} from "./NewsCard";
import React, {useEffect} from "react";
import UserService from "../services/user.service";
import NewsService from "../services/news.service";
import {Loading} from "./Loading";

export const News = () => {
    const [news, setNews] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [loading, setLoading] = React.useState(1);

    let params = useParams();
    console.log(params);
    useEffect(() => {
        setLoading(1);
        if (params.category) {
            NewsService.getNewsByCategory(params.category).then(
                (response) => {
                    setNews(response.data.news);
                    setCount(response.data.totalResults);
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
        } else {
            UserService.getNews().then(
                (response) => {
                    setNews(response.data.news);
                    setCount(response.data.totalResults);
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
        }
    }, [params]);
    return (
        (loading) ? (<Loading/>) : (
            <div className={"row mt-5"}>
                <div className="d-flex justify-content-between mt-5">
                    <h1>Latest News: {params.category}</h1>
                    <span className={"red"}>Count:{count}</span>
                </div>
                <div className={"row"}>
                    {news.map((element, index) => (
                        <NewsCard key={index} news={element}/>
                    ))}
                </div>
            </div>
        )
    )
}
