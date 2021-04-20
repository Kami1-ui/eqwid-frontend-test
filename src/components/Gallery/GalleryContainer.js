import React from 'react';
import images from '../../assets/data/images.json'
import './Gallery.css'
import { connect } from 'react-redux';
import { getImages, showLightbox, nextImage, prevImage, hiddenLightbox, deleteImage, setImageInLoad, setDrag } from '../../redux/gallery-reducer';
import Gallery from './Gallery';
import Lightbox from '../Lightbox/Lightbox';
import Preloader from '../Preloader/Preloader';
import axios from 'axios';
import DragArea from '../DragArea/DragArea';


class GaleryContainer extends React.Component {
    componentDidMount() {
        this.props.getImages(images.galleryImages)
    }

    render() {

        const dragStart = (e) => {
            e.preventDefault();
            this.props.setDrag(true);
        }
        const dragLeave = (e) => {
            e.preventDefault();
            this.props.setDrag(false);
        }
        const onDrop = (e) => {
            e.preventDefault();
            this.props.setDrag(false);

            let files = [...e.dataTransfer.files];
            const formData = new FormData();

            files.forEach(f => {
                //formData.append('file',f)
                console.log(f);
            });

            //axios.post('url',formData,opttions).then()

        }

        return <>
            <DragArea
                drag={this.props.drag}
                dragStart={dragStart}
                dragLeave={dragLeave}
                onDrop={onDrop}
            />

            <Preloader show={this.props.imageInLoad.length > 0} />

            <Gallery {...this.props} />
            {this.props.lightboxShow ? <Lightbox
                hide={this.props.hiddenLightbox}
                next={this.props.nextImage}
                prev={this.props.prevImage}
                url={this.props.lightboxUrl} /> : null}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        images: state.gallery.images,
        lightboxUrl: state.gallery.lightboxUrl,
        lightboxShow: state.gallery.lightboxShow,
        trashToogle: state.gallery.trashToogle,
        imageInLoad: state.gallery.imageInLoad,
        drag: state.gallery.drag,
    }
}

export default connect(mapStateToProps, {
    getImages,
    showLightbox,
    nextImage,
    prevImage,
    hiddenLightbox,
    deleteImage,
    setImageInLoad,
    setDrag
})(GaleryContainer)