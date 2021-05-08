import React from 'react';
import preloader from '../../assets/preloader.gif'

class Gallery extends React.Component {

    state = {

        itemsWidth: [],
        itemsHeight: [],
        imgProportions: [],

        imgItemsSize: [],

        itemsCount: 0,
        minHeight: 100 - 4,

        screenWidth: 0,

        container: 0

    }


    setContainer = (width) => {

        this.setState({
            container: width,
        })

    }

    alignRows = (imgProportions, container) => {

        // let newImgProportions = this.state.imgProportions;

        let startRow = 0;
        // let container = 860;
        container = container - 30;
        let widthSum = 0;
        let minHeight = this.state.minHeight;
        let newItemsWidth = [];
        let newItemsHeight = [];

        let newImgItemsSize = [];


        for (let i = 0; i < this.props.galleryImages.length; i++) {
            let itemWidth = imgProportions[i] * minHeight;
            if (container < widthSum + itemWidth) {
                let div = container - widthSum;
                let addHeight = div / (i - startRow);
                for (let j = startRow; j < i; j++) {
                    let w = (imgProportions[j] * minHeight) + addHeight;
                    let h = minHeight + addHeight;
                    newImgItemsSize.push({ width: w, height: h })
                    //  newItemsWidth.push((newImgProportions[j] * minHeight) + addHeight);
                    // newItemsHeight.push(minHeight + addHeight);
                }

                startRow = i;
                widthSum = itemWidth;

            } else {
                widthSum += itemWidth;
            };
        }

        for (let i = startRow; i < this.props.galleryImages.length; i++) {

            // newItemsHeight.push(minHeight);
            // newItemsWidth.push(newImgProportions[i] * minHeight);

            let w = imgProportions[i] * minHeight;
            let h = minHeight;
            newImgItemsSize.push({ width: w, height: h })
        }


        return newImgItemsSize;
        /*  this.setItemsCount(this.props.galleryImages.length);
         this.setState({
             itemsWidth: [...newItemsWidth],
             ItemsHeight: [...newItemsHeight]
         }) */
    }

    initialItems = () => {

        let newImgProportions = [];

        for (let i = 0; i < this.props.galleryImages.length; i++) {
            newImgProportions.push(this.props.galleryImages[i].width / this.props.galleryImages[i].height);
        }

        let container = 890;
        if (window.screen.width < container) {
            container = window.screen.width;
        }
        let newImgItemsSize = this.alignRows(newImgProportions, container);

        this.setState({
            imgProportions: [...newImgProportions],
            itemsCount: this.props.galleryImages.length,
            imgItemsSize: [...newImgItemsSize]
        })
    }


    updateDimensions = () => {
        //        this.setState({ width: window.innerWidth, height: window.innerHeight });

        //console.log(window.innerWidth);


        if (window.innerWidth < 890) {
            // this.setContainer(window.innerWidth);
            let newImgItemsSize = this.alignRows(this.state.imgProportions, window.innerWidth);
            this.setState({

                imgItemsSize: [...newImgItemsSize]
            })
        }
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }


    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        // console.log(window.screen.width);
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
                        style={this.state.imgItemsSize[i] ? { width: this.state.imgItemsSize[i].width, height: this.state.imgItemsSize[i].height } : { height: this.state.minHeight, width: 'auto' }}
                        key={i}>
                        {this.props.editMode && <button className="gallery__remove" onClick={() => this.props.deleteImage(i)}>Удалить</button>}

                        {loading
                            ? <img src={preloader} className="gallery__preview" />
                            : ''
                        }

                        <img src={img.url !== null ? img.url : ''} alt="картинка" onLoad={() => this.props.setImagesInLoad(false, i)}

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