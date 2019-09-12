
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';

class SidebarComponent extends React.Component{
    constructor() {
        super();
        this.state = { 
            addingNote:false,
            title:null
        }
        this.newNoteBtnClick = this.newNoteBtnClick.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.newNote = this.newNote.bind(this);
        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    newNoteBtnClick(){
        this.setState({
            addingNote:!this.state.addingNote,
            title:null
        })
    }
    updateTitle(txt){
       this.setState({title:txt})
    }

    newNote(){
         console.log(this.state)
    }


    selectNote(n,i){
         this.props.selectNote(n,i)
    }

    deleteNote(){
        console.log("deleted note");
    }

    render() {
        const { notes,classes,selectedNoteIndex } = this.props; 
       if(notes){
            return (
                <div className={classes.sidebarContainer} >
                    <Button
                        onClick={this.newNoteBtnClick}
                        className={classes.newNoteBtn}
                    >
                        {this.state.addingNote 
                    ?"cancel"
                    :"new Note"}</Button>
                    {
                        this.state.addingNote ? <div>
                            <input 
                            type="text"
                            className = {classes.newNoteInput}
                            placeholder = "Enter Note title"
                            onKeyUp = {(e)=> this.updateTitle(e.target.value)}
                            >
                            </input>
                            <Button 
                            className={classes.newNoteSubmitBtn}
                            onClick ={ this.newNote} >Submit Note </Button>
                        </div>:null
                    }
                    <List>
                        {
                        notes.map((_note,_index)=>{
                            return (
                                <div key={_index}>
                                    <SidebarItemComponent
                                        _note={_note}
                                        _index={_index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={this.selectNote}
                                        deleteNote={this.deleteNote}></SidebarItemComponent>
                                    <Divider></Divider>
                                </div>
                            )
                        })  
                        }
                    </List>
                </div>
            )
       }else{
           return(<div>Add a Note</div>)
       }
    }


}
export default withStyles(styles)(SidebarComponent);