import React, { useEffect, useState } from 'react'
import CreateNote from './CreateNote'
import './Notes.css'
import {v4 as uuid} from 'uuid'
import Note from './Note'


const Notes = () => {
    const [inputTitle, setInputTitle] = useState('')
    const [inputText, setInputText] = useState('')
    const [notes, setNotes] = useState([])
    const [editToggle, setEditeToggle] = useState(null)

    const editHandler = (id,title,text) =>{
        setEditeToggle(id)
        setInputTitle(title)
        setInputText(text)
    }
    const saveHandler = () =>{
        if(editToggle){
            setNotes(notes.map((note) => (
                note.id === editToggle ?
                {...note, title:inputTitle, text: inputText}
                :note
            )))
        }else{
            setNotes((prevNotes) => [
                ...prevNotes, {
                    id: uuid(),
                    title: inputTitle,
                    text: inputText
                }
            ])
        }
        setInputText("")
        setInputTitle("")
        setEditeToggle(null)
    }

    const deleteHandler = (id) =>{
        const newNotes = notes.filter(n => n.id !== id)
        setNotes(newNotes)
    }

    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem("Notes"))
        if(data){
            setNotes(data)
        }
    },[])

    useEffect(() =>{
        window.localStorage.setItem("Notes", JSON.stringify(notes))
    },[notes])
  return (
    <div className='notes'>
        {
            notes.map((note) => (
                editToggle === note.id ? 
                <CreateNote
                inputTitle = {inputTitle}
                inputText = {inputText}
                setInputTitle = {setInputTitle}
                setInputText = {setInputText}
                saveHandler = {saveHandler  }
                />
                :
                <Note 
                    key={note.id}
                    id={note.id}
                    title={"Title: "+ note.title}
                    text={"Description: "+ note.text}
                    editHandler = {editHandler}
                    deleteHandler = {deleteHandler}
                >

                </Note>
            ))
        }
        {
            editToggle === null ?
            <CreateNote
            inputTitle = {inputTitle}
            inputText = {inputText}
            setInputTitle = {setInputTitle}
            setInputText = {setInputText}
            saveHandler = {saveHandler  }
            /> : <></>
        }
    </div>
  )
}

export default Notes