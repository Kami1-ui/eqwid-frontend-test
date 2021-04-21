import logo from '../../assets/logo.png'
import './Header.css'

const Header = (props) => {
    let onChangeInputText = (e) => {
        let text = e.target.value;
        props.updateInputUrl(text);
    }

    return <header className="header">
        <div className="container">

            <div className="header__body">

                <div className="header__logo">
                    <img src={logo} alt="" />
                </div>

                <div className="header__tools">
                    <div className="header__add add-img">
                        <input type="text" placeholder="Введите url или json" value={props.inputUrl} onChange={onChangeInputText}
                            className="add-img__input" onKeyDown={e => e.key === 'Enter' ? props.loadImagesFromUrl() : null} />

                        <input type="button" className="add-img__btn header__btn"
                            onClick={() => props.loadImagesFromUrl()} value="Импорт" />
                    </div>
                    <input type="button" className="header__edit-btn header__btn" onClick={props.setTrashToogle} value="Радактировать" />
                </div>
            </div>
        </div>
    </header>
}

export default Header
