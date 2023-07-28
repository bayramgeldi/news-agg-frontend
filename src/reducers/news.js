import {GET_AUTHORS, GET_CATEGORIES, GET_NEWS_BY_CATEGORIES, GET_SOURCES} from "../actions/types";

const categories = []

const initialState = categories
    ? categories
    : [];

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CATEGORIES:
            return state;
        case GET_NEWS_BY_CATEGORIES:
            return state;
        case GET_SOURCES:
            return state;
        case GET_AUTHORS:
            return state;
        default:
            return state;
    }
}
