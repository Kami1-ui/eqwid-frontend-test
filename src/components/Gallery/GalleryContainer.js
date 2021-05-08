import React from 'react';
import images from '../../assets/data/images.json'
import './Gallery.css'
import { connect } from 'react-redux';
import { loadJson, loadImage, showLightbox, nextImage, prevImage, hiddenLightbox, deleteImage, setImagesInLoad } from '../../redux/gallery-reducer';
import Gallery from './Gallery';
import Lightbox from '../Lightbox/Lightbox';
import DragArea from '../DragArea/DragArea';


class GaleryContainer extends React.Component {

    componentDidMount() {
        this.props.loadJson(images.galleryImages)
    }

    render() {
        const readImg = file => {
            return new Promise((res, rej) => {
                const reader = new FileReader();

                reader.onload = e => res(e.target.result);
                reader.onerror = e => rej(e);
                reader.readAsDataURL(file);
            });
        };

        const getImage = (url) => {
            return new Promise((res, rej) => {
                let image = new Image();
                image.src = url;

                image.onload = () => res(this.props.loadImage(image));
                image.onerror = () => rej(console.log(url + ' не удалось загрузить'));
            })
        }

        const readJson = file => {
            return new Promise((res, rej) => {
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = e => res(JSON.parse(e.target.result));
                reader.onerror = e => rej(e);

            });
        };



        const loadFiles = async files => {
            if (files.length !== 0) {
                const file = files[0];
                switch (file.name.split('.').pop()) {
                    case 'json':
                        let json = await readJson(file);
                        this.props.loadJson(json.galleryImages);
                        break;

                    case 'jpg':
                    case 'png':
                        let imgSrc = await readImg(file);
                        getImage(imgSrc);
                        break;

                    default:
                        console.log('неверный формат файла')
                        return null;
                }
            }
        }

        return <>
            <DragArea loadFiles={loadFiles} />

            <Gallery {...this.props} />
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