import *as axios from 'axios';

export const readImageAsDataUrl = file => {
    return new Promise((res, rej) => {
        const reader = new FileReader();

        reader.onload = e => res(e.target.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
    });
};


export const readTxt = file => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = e => res(e.target.result);
        reader.onerror = e => rej(e);

    });
};

export const getImage = (url) => {
    return new Promise((res, rej) => {
        let image = new Image();
        image.src = url;
        image.onload = () => res(image);
        image.onerror = e => rej(e);
    })
}

export const getJson = (url) => {
    return axios.get(url).then(response => response.data.galleryImages);
}
