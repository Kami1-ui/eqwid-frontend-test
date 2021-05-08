import React from 'react';
import { connect } from 'react-redux';
import { getImage, getJson } from '../../promises/promises';
import { loadImage, loadJson, setEditMode } from '../../redux/gallery-reducer';

import Header from './Header';


class HeaderContainer extends React.Component {
    state = {
        inputUrl: '',
        fileExtend: ''
    }

    loadUrl = () => {

        let url = this.state.inputUrl;
        switch (this.state.fileExtend) {
            case 'json':
                getJson(url).then(response => {
                    this.props.loadJson(response);
                }).catch(() => {
                    alert('Не удалось загрузить json ' + url);
                })
                break;

            case 'jpg':
            case 'png':
                getImage(url).then(response => {
                    this.props.loadImage(response);
                }).catch(() => {
                    alert('Не удалось загрузить изображеение ' + url);
                })
                break;

            default:
                alert('Неверный формат файла ' + url);
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

    }
}

export default connect(mapStateToProps, {
    loadImage,
    loadJson,
    setEditMode
})(HeaderContainer)