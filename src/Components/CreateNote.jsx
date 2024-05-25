import React from 'react'

const CreateNote = ({inputTitle, inputText, setInputText, setInputTitle, saveHandler}) => {
    const char = 100;
    const charLimit = char - inputText.length;

  return (
    <div className='note'>
        <p className='fs-5'>Title</p>
        <input 
        type="text" 
        placeholder='Type...'
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        maxLength={25}
        />
        <p className='fs-5'>Description</p>
        <textarea className='fs-6'
        cols={10}
        rows={5}
        placeholder='Type...'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        maxLength={100}
        >
        </textarea>
        <div className="note_footer">
            <span className='label text-white'>{charLimit}Left</span>
            <button className='note_save btn btn-success' onClick={saveHandler}>Save</button>
        </div>
    </div>
  )
}

export default CreateNote