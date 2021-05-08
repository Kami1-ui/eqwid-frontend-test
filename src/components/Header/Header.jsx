import logo from '../../assets/logo.png'
import './Header.css'

const Header = (props) => {
    let onChangeInputUrl = (e) => {
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
                        <input type="text" placeholder="Введите url или json" value={props.inputUrl} onChange={onChangeInputUrl}
                            className="add-img__input" onKeyDown={e => e.key === 'Enter' ? props.loadUrl() : null} />

                        <input type="button" className="add-img__btn header__btn"
                            onClick={props.loadUrl} value="Импорт" />
                    </div>
                    <input type="button" className="header__edit-btn header__btn" onClick={props.setEditMode} value="Радактировать" />
                </div>
            </div>
        </div>
    </header>
}

export default Header
