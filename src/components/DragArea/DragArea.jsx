import { render } from '@testing-library/react';
import React from 'react';
import './DragArea.css'

class DragArea extends React.Component {
    state = {
        isDrop: false,
    }

    setDrop = (value) => {
        this.setState({
            isDrop: value,
        })

    }
    render() {
        const dragStart = (e) => {
            e.preventDefault();
            this.setDrop(true);
        }
        const dragLeave = (e) => {
            e.preventDefault();
            this.setDrop(false);
        }

        const onDrop = async event => {
            event.preventDefault();
            let files = [...event.dataTransfer.files];

            if (this.props.loadFiles(files) === null) {
                debugger
                this.setDrop(false);
            };
        };

        const onChangeInputFile = event => {
            let files = [...event.target.files];
            this.props.loadFiles(files);
        };


        return <div className="drag-drop">
            {this.state.isDrop
                ? <div className="drag-drop__area drop"
                    onDragStart={e => dragStart(e)}
                    onDragLeave={e => dragLeave(e)}
                    onDragOver={e => dragStart(e)}
                    onDrop={e => onDrop(e)}
                >  Отпустите файл чтобы загрузить файл</div>
                : <div className="drag-drop__area"
                    onDragStart={e => dragStart(e)}
                    onDragLeave={e => dragLeave(e)}
                    onDragOver={e => dragStart(e)}
                > <input type="file" id="input-file" name="img" onChange={onChangeInputFile} accept="image/jpeg,image/png,image/gif,json"></input>
                    <label htmlFor="input-file" className="load-btn">Выберите файл</label> или перетащите чтобы загрузить файл</div>
            }


        </div>


    }
}


export default DragArea