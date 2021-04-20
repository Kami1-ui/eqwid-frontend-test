const Gallery = (props) => {

    return <div className="gallery__row">

        {props.images
            ? props.images.map((img, i) => {

                return <div className="gallery__item" key={i}>
                    {props.trashToogle ? <a href="#" className="gallery__remove" onClick={() => props.deleteImage(i)}>Удалить</a> : ''}

                    <a href="#" className="gallery__preview" onClick={() => props.showLightbox(i)}>

                        <img src={img.url !== null ? img.url : ''} alt="картинка" onLoad={() => props.setImageInLoad(false, i)} />
                    </a>
                </div>
            }
            )
            : <span>Элементов не найдено</span>}

        <div className="gallery__item">

        </div>
    </div>;
}

export default Gallery;