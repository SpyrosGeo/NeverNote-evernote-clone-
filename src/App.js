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
    this.newNote = this.newNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.noteUpdate = this.noteUpdate.bind(this);
  }

  newNote(){

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
    console.log(id,noteObj);
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
