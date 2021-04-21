import *as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { updateInputUrl, loadImage, getImages, setTrashToogle } from '../../redux/gallery-reducer';

import Header from './Header';


class HeaderContainer extends React.Component {

    render() {
        let getJson = (url) => {
            axios.get(url)
                .then(response => {
                    this.props.getImages(response.data.galleryImages);
                })
                .catch(error => {
                    alert('Json не найден');
                }
                )
        }

        let loadImagesFromUrl = () => {
            let url = this.props.inputUrl;
            let parts = url.split('.');

            if (parts.length > 1) {
                let ext = parts.pop();

                if (ext === 'json') {
                    getJson(url);
                } else if (ext === 'img' || 'png') {

                    this.props.loadImage();

                } else {
                    alert('Не верный формат файла');
                }
            } else alert('Не верный формат файла');


        }
        return <Header {...this.props} loadImagesFromUrl={loadImagesFromUrl} />
    }
}

let mapStateToProps = (state) => {
    return {
        inputUrl: state.gallery.inputUrl,
    }
}

export default connect(mapStateToProps, {
    updateInputUrl,
    loadImage,
    getImages,
    setTrashToogle
})(HeaderContainer)