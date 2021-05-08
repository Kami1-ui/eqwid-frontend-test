const LOAD_JSON = 'LOAD_JSON';
const LOAD_IMAGE = 'LOAD_IMAGE';
const SET_IMAGE_IN_LOAD = 'SET_IMAGE_IN_LOAD';

const SET_EDIT_MODE = 'SET_EDIT_MODE';
const DELETE_IMAGE = 'DELETE_IMAGE';

const SHOW_LIGHTBOX = 'SHOW_LIGHTBOX';
const HIDDEN_LIGHTBOX = 'HIDDEN_LIGHTBOX';
const NEXT_IMAGE = 'NEXT_IMAGE';
const PREV_IMAGE = 'PREV_IMAGE';


const initialState = {
    galleryImages: [],
    imagesInLoad: [],
    editMode: false,
    indexShowImage: 0,
    lightboxUrl: '',
};


const galleryReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_JSON:

            let newItems = [];
            for (let i = state.galleryImages.length; i < action.images.length; i++) {
                newItems.push(i);
            }
            return {
                ...state,
                galleryImages: [...state.galleryImages, ...action.images],
                imagesInLoad: [...state.imagesInLoad, ...newItems],
            };

        case LOAD_IMAGE:


            let newImgItem = {
                url: action.image.src,
                width: action.image.width,
                height: action.image.height
            }

            return {
                ...state,
                galleryImages: [...state.galleryImages, newImgItem],
                imagesInLoad: [...state.imagesInLoad, state.galleryImages.length],
            };

        case SHOW_LIGHTBOX:
            return {
                ...state,
                lightboxUrl: state.galleryImages[action.index].url,
                indexShowImage: action.index
            };

        case HIDDEN_LIGHTBOX:
            return {
                ...state,
                lightboxUrl: ''
            };

        case NEXT_IMAGE:
            let nextImg = state.indexShowImage + 1;
            if (state.galleryImages.length === nextImg) nextImg = 0;

            return {
                ...state,
                indexShowImage: nextImg,
                lightboxUrl: state.galleryImages[nextImg].url,
            };

        case PREV_IMAGE:
            let prevImg = state.indexShowImage - 1;
            if (prevImg === -1) prevImg = state.galleryImages.length - 1;

            return {
                ...state,
                indexShowImage: prevImg,
                lightboxUrl: state.galleryImages[prevImg].url,
            };


        case SET_EDIT_MODE:
            return {
                ...state,
                editMode: !state.editMode
            };

        case DELETE_IMAGE:
            return {
                ...state,
                galleryImages: state.galleryImages.filter((img, i) => i !== action.index)
            };

        case SET_IMAGE_IN_LOAD:
            return {
                ...state,
                imagesInLoad: action.isFetching
                    ? [state.imagesInLoad, action.index]
                    : state.imagesInLoad.filter(id => id !== action.index),
            };

        default:
            return state;
    }
}

export const loadJson = (images) => ({ type: LOAD_JSON, images });
export const loadImage = (image) => ({ type: LOAD_IMAGE, image });


export const showLightbox = (index) => ({ type: SHOW_LIGHTBOX, index });
export const hiddenLightbox = () => ({ type: HIDDEN_LIGHTBOX });
export const nextImage = () => ({ type: NEXT_IMAGE });
export const prevImage = () => ({ type: PREV_IMAGE });

export const setEditMode = () => ({ type: SET_EDIT_MODE });
export const deleteImage = (index) => ({ type: DELETE_IMAGE, index })
export const setImagesInLoad = (isFetching, index) => ({ type: SET_IMAGE_IN_LOAD, index, isFetching });

export default galleryReducer;