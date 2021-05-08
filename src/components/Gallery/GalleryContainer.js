import React from 'react';
import images from '../../assets/data/images.json'
import './Gallery.css'
import { connect } from 'react-redux';
import { loadJson, loadImage, showLightbox, nextImage, prevImage, hiddenLightbox, deleteImage, setImagesInLoad } from '../../redux/gallery-reducer';
import Gallery from './Gallery';
import Lightbox from '../Lightbox/Lightbox';
import DragArea from '../DragArea/DragArea';
import { getImage, readImageAsDataUrl, readTxt } from '../../promises/promises';


class GaleryContainer extends React.Component {

    componentDidMount() {
        this.props.loadJson(images.galleryImages)
    }


    render() {

        const loadFiles = files => {
            files.forEach(file => {
                switch (file.name.split('.').pop()) {
                    case 'json':
                        readTxt(file).then(response => {
                            this.props.loadJson(JSON.parse(response).galleryImages);
                        }).catch(() => {
                            alert('Не удалось загрузить ' + file.name);
                        })
                        break;

                    case 'jpg':
                    case 'png':
                        readImageAsDataUrl(file).then(src => {
                            getImage(src).then(response => {
                                this.props.loadImage(response);
                            })
                        }).catch(() => {
                            alert('Не удалось загрузить ' + file.name);
                        })
                        break;

                    default:
                        alert('Неверный формат файла');
                }

            });


        }

        return <>
            <DragArea loadFiles={loadFiles} />
            <Gallery {...this.props} widthCssContainer={890} minWidthCssContainer={320} paddingCssContainer={30} />
            {this.props.lightboxUrl !== ''
                ? <Lightbox
                    hide={this.props.hiddenLightbox}
                    next={this.props.nextImage}
                    prev={this.props.prevImage}
                    url={this.props.lightboxUrl} /> : null}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        galleryImages: state.gallery.galleryImages,
        lightboxUrl: state.gallery.lightboxUrl,
        lightboxShow: state.gallery.lightboxShow,
        editMode: state.gallery.editMode,
        imagesInLoad: state.gallery.imagesInLoad,
    }
}

export default connect(mapStateToProps, {
    loadImage,
    loadJson,
    showLightbox,
    nextImage,
    prevImage,
    hiddenLightbox,
    deleteImage,
    setImagesInLoad,
})(GaleryContainer)