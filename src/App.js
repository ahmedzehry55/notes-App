import React ,{  useEffect, useState} from 'react';
import './App.css';
import Message from './component/Message';
import Preview from './component/Preview';
import NoteContainer from './component/Note/NoteContainer';
import NoteList from './component/Note/NoteList';
import Note from './component/Note/Note';
import NoteForm from './component/Note/NoteForm';
import Alert from './component/Alert';
function App() {
  const [notes , setNotes] = useState([]);
  const [title , setTitle] = useState('');
  const [content , setContent] = useState('');
  const [creatnig , setCreating] = useState(false);
  const [editing , setEditing] = useState(false);
  const [selectedNote , setSelectedNote] = useState(null);
  const [validationErrors , setValidation] = useState([]);

  useEffect(()=> {
    if(localStorage.getItem('notes')) {
      setNotes(JSON.parse(localStorage.getItem('notes')));
      }else{
        localStorage.setItem('notes', JSON.stringify([]))
      };
  },[])
  useEffect(()=> {
    if(validationErrors.length !== 0){
      setTimeout(()=>{
        setValidation([]);
      },3000)
    }
  },[validationErrors])
  /////////////////////
  // save to local storge function
  const saveToLocalStorge = (key , value) => {
    localStorage.setItem(key , JSON.stringify(value))
  };  
  ///////////////////////
  // add note display 
  const  addNoteHandelr = ()=>{
    setCreating(true);
    setSelectedNote(null)
    }
    //////////////////////
    //seleced note preview
    const selectedNoteHandler = noteId => {
      setSelectedNote(noteId)
    }
    //////////////////////
    // change note title
    const changeTitleHandler= (event) => {
      setTitle(event.target.value)
    }
    ////////////////////
     // change note content
    const changeContentHandler= (event) => { 
      setContent(event.target.value)
    }
    ///////////////////
    // save fuanction
    const savHandler = ()=> {
      if (!validate()) return ; 
      const note = {
      id : new Date(),
      title : title,
      content: content
      }
      const updateNotes = [...notes,note]
      saveToLocalStorge('notes' , updateNotes)
      setCreating(false)
      setNotes(updateNotes)
      setSelectedNote(note.id)
      setContent('')
      setTitle('')
    }
    /////////////////////////////
//edit handler        
    const editNoteHandler = () => {
      const note = notes.find(note => note.id === selectedNote)   
      setEditing(true)
      setContent(note.content)
      setTitle(note.title)
    }  
    ////////////////////////
    //delet note 
    const deletNoteHandler = ()=> {
      const updatedNotes = [...notes]
      const noteIndex = updatedNotes.findIndex(note=> note.id === selectedNote)
      notes.splice(noteIndex, 1)
      saveToLocalStorge('notes' , notes)
      setNotes(notes)
      setSelectedNote(null)
    }
    //////////////////////
    const updateNoteHandler = ()=> {
      if (!validate()) return ; 
      const updatedNotes = [...notes];
      const noteIndex = notes.findIndex(note=> note.id === selectedNote)
      updatedNotes[noteIndex] = {
        id: selectedNote,
        content:content,
        title:title
      }
      saveToLocalStorge('notes' , updatedNotes)
      setNotes(updatedNotes);
      setContent('')
      setTitle('')
      setEditing(false)

    }  
    ///////////////////////
    //validate function
    const validate = () => {
      const validationErrors = []
      let passed = true
      if (!title) {
        validationErrors.push('plase enter note title')
        passed= false;
      }
      if (!content) {
        validationErrors.push('plase enter note content')
        passed =false
      }
      setValidation(validationErrors)
      return passed;
    }
    const note = notes.find(note => {
      return note.id === selectedNote
        })
   const getAddNote = () => {
    if(selectedNote !== null){
      setCreating(false);
    }
    return (
      <NoteForm
          formTitle='add new note'
          title={title}
          content={content}
          titlechanged={changeTitleHandler}
          contentChanged ={changeContentHandler}
          submitText='save'
          submitClicked={savHandler}
          />
    );
  };
  const getPreview = () => {
    const note = notes.find(note => note.id === selectedNote)
    
      
    if(notes.length === 0 ){
      return <Message title='no note'/>
    }
    if( selectedNote === null) {
      return <Message title='plase select note '/>
    }
    let noteDisplay= (
      <div>
        <h2>{note.title}</h2> 
        <p>{note.content}</p>
      </div>
    )
    if(editing){
      noteDisplay = ( 
        <div>
          <NoteForm
          formTitle='edit note'
          title={title}
          content={content}
          
          titlechanged={changeTitleHandler}
          contentChanged ={changeContentHandler}
          submitText='update'
          submitClicked={updateNoteHandler}
          />
        </div>
      )
    }
    return (
      <div>
      {!editing && 
        <div className='note-operations'>
            <a href='#' onClick={editNoteHandler}>
              <i className='fa fa-pencil-alt'  />
            </a>
            <a href='#' onClick={deletNoteHandler}>
              <i className='fa fa-trash' />
            </a>
        </div>
      }
     {noteDisplay}
    </div>
    );
  };

   
  return (
    <div className="App">
    <NoteContainer>
      <NoteList>
        {notes.map(note=>
         <Note 
             key={note.id}
             title={note.title}
              noteClicked={()=> selectedNoteHandler(note.id)}
              active={selectedNote=== note.id}
         />
        )}
                            
      </NoteList>
      <button className="add-btn" onClick={addNoteHandelr}>+</button>
    </NoteContainer>
    <Preview>
       {creatnig ? getAddNote():  getPreview()} </Preview>
       {validationErrors.length !== 0 && <Alert validationMessage={validationErrors} />}
  </div>

  )
}

export default App;
