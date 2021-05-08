import React from 'react';
import './Lightbox.css';

class Lightbox extends React.Component {
    constructor(props) {
        super(props);
        this.LightboxDiv = React.createRef();
    }

    componentDidMount() {
        this.LightboxDiv.current.focus();
    }

    render() {
        return <div className="lightbox" tabIndex="0" ref={this.LightboxDiv}
            onKeyDown={(e) => {
                switch (e.key) {
                    case 'ArrowRight':
                        this.props.next();
                        break;
                    case 'ArrowLeft':
                        this.props.prev();
                        break;
                    case 'Escape':
                        this.props.hide();
                        break;
                    default:
                }
            }} >
            <div className="lightbox__overlay" onClick={() => this.props.hide()} ></div>
            <div className="lightbox__content">
                <div className="lightbox__body">
                    <img src={this.props.url} alt="lightbox" />
                    <div className="lightbox__navigate">
                        <span className="lightbox__prev" onClick={() => this.props.prev()} >prev</span> <br />
                        <span className="lightbox__next" onClick={() => this.props.next()}>next</span>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default Lightbox
