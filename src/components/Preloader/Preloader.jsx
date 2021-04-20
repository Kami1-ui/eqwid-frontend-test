import './Preloader.css'
const Preloader = (props) => {
    return <div className={`preloader ${props.show ? 'show' : 'hide'}`} >
        <div className="preloader__loader loading-whell"></div>
    </div>
}
export default Preloader