import {GET_AUTHORS, GET_CATEGORIES, GET_NEWS_BY_CATEGORIES, GET_SOURCES, SET_MESSAGE,} from "./types";
import NewsService from "../services/news.service";


export const getCategories = () => (dispatch) => {
    return NewsService.getCategories().then(
        (response) => {
            dispatch({
                type: GET_CATEGORIES,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
export const getSources = () => (dispatch) => {
    return NewsService.getSources().then(
        (response) => {
            dispatch({
                type: GET_SOURCES,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
export const getAuthors = () => (dispatch) => {
    return NewsService.getAuthors().then(
        (response) => {
            dispatch({
                type: GET_AUTHORS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
export const getNewsByCategories = (category) => (dispatch) => {
    return NewsService.getCategories(category).then(
        (response) => {
            dispatch({
                type: GET_NEWS_BY_CATEGORIES,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

