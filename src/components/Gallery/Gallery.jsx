import preloader from '../../assets/preloader.gif'

const Gallery = (props) => {
    return <div className="gallery__row">

        {props.images
            ? props.images.map((img, i) => {
                let loading = props.imageInLoad.some(elem => elem === i);

                return <div className="gallery__item" key={i}>
                    {props.isTrashActive ? <button className="gallery__remove" onClick={() => props.deleteImage(i)}>Удалить</button> : ''}

                    {loading
                        ? <img src={preloader} className="gallery__preview" />
                        : ''
                    }

                    <img src={img.url !== null ? img.url : ''} alt="картинка" onLoad={() => props.setImageInLoad(false, i)} className={loading
                        ? 'hide gallery__preview' : 'gallery__preview'} onClick={() => props.showLightbox(i)} />

                </div>
            })

            : <span>Элементов не найдено</span>}

        <div className="gallery__item">

        </div>
    </div>;
}

export default Gallery;