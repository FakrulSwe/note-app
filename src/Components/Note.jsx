import React from 'react'

const Note = ({id, text, title, editHandler, deleteHandler}) => {
  return (
    <div className='note'>
        <div className="note-body">{title}</div>
        <div className="note-body">{text}</div>
        <div className="note-footer justify-align-content-end">
            <button className='note_save btn btn-sm btn-danger'onClick={() =>deleteHandler(id)}>Delete</button> &nbsp;
            <button className='note_save btn btn-sm btn-primary' onClick={() => editHandler(id, title, text)}>Edit</button>
        </div>
    </div>
  )
}

export default Note