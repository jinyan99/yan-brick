import React, {FC, useState, DragEvent} from 'react'
import classNames from 'classnames';

interface DraggerProps {
    onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
    const {onFile, children} = props;
    //dragOver状态值用来控制区域拖拽感应背景变色提示
    const [dragOver, setDragOver] = useState(false)
    const klass = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    })
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files)
    }
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault();
        setDragOver(over);
    }

    return (
        <div
            className={klass}
            onDragOver={e => {handleDrag(e, true)}}
            onDragLeave={e => {handleDrag(e, false)}}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}
export default Dragger;