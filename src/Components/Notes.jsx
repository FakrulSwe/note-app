import React, { useEffect, useState } from 'react'
import CreateNote from './CreateNote'
import './Notes.css'
import {v4 as uuid} from 'uuid'
import Note from './Note'



const Notes = () => {
    const data = JSON.parse(localStorage.getItem("Notes"))

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
        
        if(data){
            setNotes(data)
        }
    },[])

    useEffect(() =>{
        window.localStorage.setItem("Notes", JSON.stringify(notes))
    },[notes])

    // Pagination
    // const [currentPage, setCurrentPage] = useState(1)
    // const recordsPerpage = 5;
    // const lastIndex = currentPage * recordsPerpage;
    // const firstIndex = lastIndex - recordsPerpage;
    // // const records = data.slice(firstIndex, lastIndex);
    // const npage = Math.ceil(data.length/recordsPerpage);
    // const numbers = [...Array(npage + 1).keys()].slice(1);
    // --------

  return (
    <div>
        <div className='notes'>
        {
            // records
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
        {/* <div className='mt-4 paginationbottom'>
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href="#" className='page-link'
                        onClick={prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href="#" className='page-link'
                                onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <a href="#" className='page-link'
                        onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
        <p className='text-warning fw-bold font-light paginationbottom mt-2'>Note: Please double-click the &nbsp;
        <span className='text-danger'> Save & Delete </span> &nbsp; button when using it</p> */}
    </div>
  )
//   function prePage(){
//     if(currentPage !== 1) {
//         setCurrentPage(currentPage - 1);
//     }
//   }
//   function changeCPage(id){
//     setCurrentPage(id);
//   }
//   function nextPage(id){
//     if(currentPage !== npage){
//         setCurrentPage(currentPage + 1)
//     }
//   }
}

export default Notes