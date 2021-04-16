import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI } from '../../../config/redux/action'
import './dashboard.scss'

class Dashboard extends Component {

    state = {
        title: '',
        content: '',
        date: '',
        textBtn: 'SIMPAN',
        noteId: ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'))
        // this.props.getNotes(userData.uid)
    }

    handleSaveNotes = () => {
        const { title, content, textBtn, noteId } = this.state
        const { saveNotes, updateNotes } = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }
        if (textBtn === 'SIMPAN') {

            saveNotes(data)
        } else {
            data.noteId = noteId
            updateNotes(data)
        }
        console.log(data)
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    updateNotes = (note) => {
        console.log('Coba: ', note)
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textBtn: 'UPDATE',
            noteId: note.id
        })
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textBtn: 'SIMPAN'
        })
    }

    deleteNote = (e, note) => {
        e.stopPropagation()
        const { deleteNotes } = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        deleteNotes(data)
    }

    render() {
        const { title, content, date, textBtn } = this.state
        const { notes } = this.props
        const { updateNotes, cancelUpdate } = this;
        console.log('notes', notes)
        return (
            <div className='container'>
                <div className="input-form">
                    <input placeholder='title' className='input-title' value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea placeholder='content' className='input-content' value={content} onChange={(e) => this.onInputChange(e, 'content')} >

                    </textarea>
                    <div className='action-wrapper'>
                        {
                            textBtn === 'UPDATE' ? (

                                <button className='save-btn cancel' onClick={this.handleSaveNotes} onClick={cancelUpdate}>Cancel</button>
                            ) : null
                        }
                        <button className='save-btn' onClick={this.handleSaveNotes} >{textBtn}</button>
                    </div>
                </div>
                <hr />
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className='card-content' key={note.id} onClick={() => updateNotes(note)}>
                                            <p className='title'>{note.data.title}</p>
                                            <p className='date'>{note.data.date}</p>
                                            <p className='content'>{note.data.content}</p>
                                            <div className='delete-btn' onClick={(e) => this.deleteNote(e, note)}>X</div>
                                        </div>
                                    )
                                })
                            }

                        </Fragment>

                    ) : null
                }

            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataAPI(data)),
})

export default connect(reduxState, reduxDispatch)(Dashboard)