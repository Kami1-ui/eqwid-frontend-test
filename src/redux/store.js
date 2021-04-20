import { combineReducers, createStore } from "redux";
import galleryReducer from "./gallery-reducer";



let reducers = combineReducers({
    gallery: galleryReducer
});

let store = createStore(reducers);

export default store;
window.store = store;