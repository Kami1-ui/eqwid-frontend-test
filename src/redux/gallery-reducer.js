const GET_IMAGES = 'GET_IMAGES';
const SHOW_LIGHTBOX = 'SHOW_LIGHTBOX';
const NEXT_IMAGE = 'NEXT_IMAGE';
const PREV_IMAGE = 'PREV_IMAGE';
const HIDDEN_LIGHTBOX = 'HIDDEN_LIGHTBOX';
const UPDATE_INPUT_URL = 'UPDATE_INPUT_URL';
const LOAD_IMG = 'LOAD_IMG';
const SET_TRASH_TOOGLE = 'SET_TRASH_TOOGLE';
const DELETE_IMAGE = 'DELETE_IMAGE';
const SET_IMAGE_IN_LOAD = 'SET_IMAGE_IN_LOAD';
const SET_DRAG = 'SET_DRAG';


const initialState = {
    images: [],
    indexShowImage: 0,
    lightboxUrl: "",
    lightboxShow: false,
    inputUrl: 'https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json',
    // inputUrl: 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg',
    trashToogle: false, //isDelete
    imageInLoad: [],
    drag: false
};

const galleryReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_IMAGES:
            let newItems = [];
            for (let i = state.images.length; i < action.images.length; i++) {
                newItems.push(i);
            }
            return {
                ...state,
                images: [...state.images, ...action.images],
                imageInLoad: [...state.imageInLoad, ...newItems],

            };
        case SHOW_LIGHTBOX:
            return {
                ...state,
                lightboxShow: true,
                lightboxUrl: state.images[action.index].url,
                indexShowImage: action.index
            };

        case HIDDEN_LIGHTBOX:
            return {
                ...state,
                lightboxShow: false,
            };

        case NEXT_IMAGE:
            let nextImg = state.indexShowImage + 1;
            if (state.images.length === nextImg) nextImg = 0;

            return {
                ...state,
                indexShowImage: nextImg,
                lightboxUrl: state.images[nextImg].url,
            };

        case PREV_IMAGE:
            let prevImg = state.indexShowImage - 1;
            if (prevImg === -1) prevImg = state.images.length - 1;

            return {
                ...state,
                indexShowImage: prevImg,
                lightboxUrl: state.images[prevImg].url,
            };

        case UPDATE_INPUT_URL:
            return {
                ...state,
                inputUrl: action.text,
            };
        case SET_TRASH_TOOGLE:
            return {
                ...state,
                trashToogle: !state.trashToogle
            };
        case DELETE_IMAGE:
            return {
                ...state,
                images: state.images.filter((img, i) => i !== action.index)
            };
        case LOAD_IMG:

            let newImg = new Image();
            newImg.src = state.inputUrl;

            let newImgItem = {
                url: state.inputUrl,
                with: newImg.width,
                height: newImg.height
            }

            return {
                ...state,
                images: [...state.images, newImgItem],
                imageInLoad: [...state.imageInLoad, state.images.length],
            };

        case SET_IMAGE_IN_LOAD:
            return {
                ...state,
                imageInLoad: action.isFetching
                    ? [state.imageInLoad, action.index]
                    : state.imageInLoad.filter(id => id !== action.index),
            };

        case SET_DRAG:
            return {
                ...state,
                drag: action.value,
            };
        default:
            return state;
    }
}

export const getImages = (images) => ({ type: GET_IMAGES, images });
export const showLightbox = (index) => ({ type: SHOW_LIGHTBOX, index });
export const hiddenLightbox = () => ({ type: HIDDEN_LIGHTBOX });
export const nextImage = () => ({ type: NEXT_IMAGE });
export const prevImage = () => ({ type: PREV_IMAGE });
export const updateInputUrl = (text) => ({ type: UPDATE_INPUT_URL, text });
export const loadImage = () => ({ type: LOAD_IMG });
export const setTrashToogle = () => ({ type: SET_TRASH_TOOGLE });
export const deleteImage = (index) => ({ type: DELETE_IMAGE, index });
export const setImageInLoad = (isFetching, index) => ({ type: SET_IMAGE_IN_LOAD, index, isFetching });
export const setDrag = (value) => ({ type: SET_DRAG, value });

export default galleryReducer;