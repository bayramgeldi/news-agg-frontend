import {
    GET_CATEGORIES,
    SET_MESSAGE,
} from "./types";
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

