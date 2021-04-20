import './DragArea.css'

const DragArea = (props) => {

    return <div className="drag-drop">
        {props.drag
            ? <div className="drag-drop__area drop"
                onDragStart={e => props.dragStart(e)}
                onDragLeave={e => props.dragLeave(e)}
                onDragOver={e => props.dragStart(e)}
                onDrop={e => props.onDrop(e)}
            >Отпустите файл чтобы загрузить файл</div>
            : <div className="drag-drop__area"
                onDragStart={e => props.dragStart(e)}
                onDragLeave={e => props.dragLeave(e)}
                onDragOver={e => props.dragStart(e)}
            >Перетащите чтобы загрузить файл</div>
        }
    </div>
}

export default DragArea