import React from 'react';
import './App.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

const firebase = require('firebase');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      selectedNoteIndex:null,
      selectedNote:null,
      notes:null
    }
    
    this.selectNote = this.selectNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.noteUpdate = this.noteUpdate.bind(this);
  }

  newNote = async(title) =>{
    const note = {
      title:title,
      body:''
    };
    const newFromDB = await firebase.firestore().collection('notes').add({
      title:note.title,
      body:note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    const newID = newFromDB.id;
    await this.setState({
      notes:[...this.state.notes,note]});
    const newNoteIndex = this.state.notes
    .indexOf(this.state.notes.filter(_note =>_note.id === newID)[0])
    this.setState({
      selectedNote:this.state.notes[newNoteIndex],
      selectedNoteIndex:newNoteIndex
    })
  
  }

  selectNote(note,index){
    this.setState({
      selectedNoteIndex:index,
      selectedNote:note
    })
  }

  deleteNote(){

  }

  noteUpdate(id,noteObj){
    //update firebase
    firebase.firestore().collection('notes').doc(id).update({
      title:noteObj.title,
      body:noteObj.body,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
  }


  render(){
    return (
    <div className="app-container" >
    <SidebarComponent
     selectedNoteIndex = {this.state.selectedNoteIndex}
      notes ={ this.state.notes}
      deleteNote={this.deleteNote}
      selectNote={this.selectNote}
      newNote={this.newNote}
    />
   {
     this.state.selectedNote ?
     <EditorComponent
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              noteUpdate={this.noteUpdate}
     
     />:null
   }
    </div>)
  }

  componentDidMount = () =>{
    firebase
    .firestore()
    .collection('notes')
    .onSnapshot(serverUpdate =>{
      const notes = serverUpdate.docs.map(_doc =>{
        const data = _doc.data();
        data['id'] =_doc.id;
        return data;
      });
      console.log('====================================');
      console.log(notes);
      console.log('====================================');
      this.setState({notes:notes});
    });
  }

}

export default App;
