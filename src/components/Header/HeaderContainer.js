import *as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { loadImage, loadJson, setEditMode } from '../../redux/gallery-reducer';

import Header from './Header';


class HeaderContainer extends React.Component {
    state = {
        inputUrl: '',
        fileExtend: ''
    }




    getJson = (url) => {
        axios.get(url)
            .then(response => {

                let images = response.data.galleryImages;
                this.props.loadJson(images);
            })
            .catch(error => {
                alert('Json файл не найден');
            }
            )
    }

    getImage = (url) => {
        return new Promise((res, rej) => {
            let image = new Image();
            image.src = url;

            image.onload = () => res(this.props.loadImage(image));
            image.onerror = () => rej(console.log(url + ' не удалось загрузить'));
        })
    }


    loadUrl = () => {
        switch (this.state.fileExtend) {
            case 'json':
                this.getJson(this.state.inputUrl);
                break;

            case 'jpg':
            case 'png':
                // this.props.loadImage(this.state.inputUrl);
                this.getImage(this.state.inputUrl);
                break;

            default:
                console.log('Неверный формат файла')
        }
    }

    updateInputUrl = (text) => {
        let ext = text.split('.').pop();

        this.setState({
            inputUrl: text,
            fileExtend: ext
        })
    }

    render() {
        return <Header {...this.props} inputUrl={this.state.inputUrl} loadUrl={this.loadUrl} updateInputUrl={this.updateInputUrl} />
    }
}

let mapStateToProps = (state) => {
    return {
        // inputUrl: state.gallery.inputUrl,
    }
}

export default connect(mapStateToProps, {
    loadImage,
    loadJson,
    setEditMode
})(HeaderContainer)