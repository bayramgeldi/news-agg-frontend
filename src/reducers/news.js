import {
GET_CATEGORIES
} from "../actions/types";

const categories = []

const initialState = categories
    ? categories
    : [];

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CATEGORIES:
            return state;
        default:
            return state;
    }
}
