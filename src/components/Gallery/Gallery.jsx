import React from 'react';
import preloader from '../../assets/preloader.gif'

class Gallery extends React.Component {

    state = {
        imgProportions: [],
        imgItemsSize: [],
        itemsCount: 0,
        minHeight: 96,
    }

    setContainer = (width) => {
        this.setState({
            container: width,
        })
    }

    alignRows = (imgProportions, cssContainer) => {
        let startRow = 0;

        let paddingCssContainer = this.props.paddingCssContainer;
        cssContainer = cssContainer - paddingCssContainer;

        let widthSumRow = 0;

        let minHeight = this.state.minHeight;

        let newImgItemsSize = [];

        for (let i = 0; i < this.props.galleryImages.length; i++) {
            let itemWidth = imgProportions[i] * minHeight;

            if (cssContainer < widthSumRow + itemWidth) {
                let div = cssContainer - widthSumRow;
                let addHeight = div / (i - startRow);

                if (startRow === i - 1) {
                    let height = cssContainer / imgProportions[startRow];
                    let width = cssContainer;
                    newImgItemsSize[startRow] = { width, height };

                } else {
                    for (let j = startRow; j < i; j++) {
                        let width = (imgProportions[j] * minHeight) + addHeight;
                        let height = minHeight + addHeight;
                        newImgItemsSize[j] = { width, height };
                    }
                }
                startRow = i;
                widthSumRow = itemWidth;

            } else {
                widthSumRow += itemWidth;
            }

            let width = imgProportions[i] * minHeight;
            let height = minHeight;
            newImgItemsSize.push({ width, height })
        }
        return newImgItemsSize;
    }

    initialItems = () => {
        let newImgProportions = [];
        this.props.galleryImages.forEach(image => {
            newImgProportions.push(image.width / image.height)
        });

        let widthCssContainer = this.props.widthCssContainer;

        if (window.screen.width < widthCssContainer) {
            widthCssContainer = window.screen.width;
        }
        if (window.screen.width <= this.props.minWidthCssContainer) {
            widthCssContainer = this.props.minWidthCssContainer;
        }

        let newImgItemsSize = this.alignRows(newImgProportions, widthCssContainer);

        this.setState({
            imgProportions: [...newImgProportions],
            itemsCount: this.props.galleryImages.length,
            imgItemsSize: [...newImgItemsSize]
        })
    }

    updateScreenSize = () => {

        if (window.innerWidth < this.props.widthCssContainer) {
            let newImgItemsSize = this.alignRows(this.state.imgProportions, window.innerWidth);
            this.setState({
                imgItemsSize: [...newImgItemsSize]
            })
        }

        if (window.innerWidth <= this.props.minWidthCssContainer) {
            let newImgItemsSize = this.alignRows(this.state.imgProportions, this.props.minWidthCssContainer);
            this.setState({
                imgItemsSize: [...newImgItemsSize]
            })
        }
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateScreenSize);
    }

    componentDidMount() {

        window.addEventListener('resize', this.updateScreenSize);
        this.initialItems();
    }
    componentDidUpdate() {
        if (this.props.galleryImages.length !== this.state.itemsCount) {

            this.initialItems();
        }
    }

    render() {
        return <div className="gallery__row" >

            {this.props.galleryImages
                ? this.props.galleryImages.map((img, i) => {

                    let loading = this.props.imagesInLoad.some(elem => elem === i);

                    return <div className="gallery__item"
                        style={this.state.imgItemsSize[i] && { width: this.state.imgItemsSize[i].width, height: this.state.imgItemsSize[i].height }}
                        key={i}>

                        {this.props.editMode && <button className="gallery__remove" onClick={() => this.props.deleteImage(i)}>Удалить</button>}

                        {loading && <img src={preloader} alt="preloader" className="gallery__preview" />}

                        <img src={img.url} alt="картинка" onLoad={() => this.props.setImagesInLoad(false, i)}
                            className={loading ? 'hide gallery__preview' : 'gallery__preview'}
                            onClick={() => this.props.showLightbox(i)} />
                    </div>
                })

                : <span>Элементов не найдено</span>}

            <div className="gallery__item">

            </div>
        </div>;
    }
}

export default Gallery;