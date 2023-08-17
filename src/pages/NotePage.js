import React, {useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    useParams,
    useNavigate
  } from 'react-router-dom'
// import notes from '../assets/data'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {
    const {id} = useParams()
    let noteId = {id}.id
    // let note = notes.find(note => note.id === Number(noteId))
    let [note, setNote] = useState(null)

    useEffect(() => {
      getNote()
    }, [noteId])

    let getNote  = async () => {
      if (noteId === 'new') return
      let response = await fetch(`http://localhost:5000/notes/${noteId}`)
      let data = await response.json()
      setNote(data)
    }

    let updateNote = async () => {
      await fetch(`http://localhost:5000/notes/${noteId}`, {method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
        },
        body: JSON.stringify({...note, 'updated':new Date()})
      })
    }

    let deleteNote = async () => {
      await fetch(`http://localhost:5000/notes/${noteId}`, {method: 'DELETE',
      headers: {
      'Content-Type': 'application/json'
        },
        body: JSON.stringify({note})
      })
    }

    let createNote = async () => {
      await fetch(`http://localhost:5000/notes/`, {method: 'POST',
      headers: {
      'Content-Type': 'application/json'
        },
        body: JSON.stringify({...note, 'updated':new Date()})
      })
    }

    let handleSubmit = () => {

      if (noteId !== 'new' && !note.body) {
        deleteNote()
      } else if (noteId !== 'new') {
        updateNote()
      } else if (noteId === 'new' && note != null) {
        createNote()
      }
    }

  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to='/'>
                    <ArrowLeft onClick = {handleSubmit} />
                </Link>
            </h3>

            {noteId !== 'new' ? (
            <Link to='/'>
              <button onClick = {deleteNote}>Delete</button>
            </Link>
            ): (
              <Link to='/'>
                <button onClick = {handleSubmit}>Done</button>
              </Link>
            )}
        </div>
        <textarea onChange={(e) => setNote({...note, 'body':e.target.value})} value={note?.body}>

        </textarea>
    </div>
  )
}

export default NotePage
