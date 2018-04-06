import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteNote, editNote, addNote, addCollab } from '../Redux/actions';
import LeftBar from '../LeftBar/LeftBar';
import { DeleteModal } from './DeleteModal';
import { DuplicateModal } from './DuplicateModal';
import { EditNoteFields } from './EditNoteFields';
import './SingleNote.css';

class SingleNote extends Component {
  state = {
    note: {},
    title: '',
    content: '',
    editButtonPressed: false,
    deleteButtonPressed: false,
    duplicateButtonPressed: false,
    usernameField: '',
  };

  componentWillMount() {
    this.fetchNotes(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.fetchNotes(newProps);
  }

  fetchNotes = props => {
    const date = props.match.params.id;
    const thisNote = props.notes.filter(each => each.date === date)[0];
    this.setState({
      note: thisNote,
      title: thisNote.title,
      content: thisNote.content,
    });
  };

  displayState = key => {
    return this.state[key];
  };

  updateState = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  editNote = event => {
    event.preventDefault();

    const editedNote = {
      title: this.state.title,
      content: this.state.content,
    };
    this.props.editNote(editedNote, this.state.note._id, this.props.history);

    this.setState({
      title: '',
      content: '',
      editButtonPressed: !this.state.editButtonPressed,
    });
  };

  //
  // ─── TRYING THIS OUT ────────────────────────────────────────────────────────────
  addCollab = () => {
    const collabInfo = {
      username: this.state.usernameField,
      id: this.state.note._id,
    };

    this.props.addCollab(collabInfo);

    this.setState({
      usernameField: '',
    });
  };
  // ─── TRYING THIS OUT ────────────────────────────────────────────────────────────
  //

  deleteNote = () => {
    this.props.deleteNote(this.state.note._id);
  };

  toggleDelete = () => {
    this.setState({ deleteButtonPressed: !this.state.deleteButtonPressed });
  };

  toggleEdit = () => {
    this.setState({ editButtonPressed: !this.state.editButtonPressed });
  };

  toggleDuplicate = () => {
    this.setState({
      duplicateButtonPressed: !this.state.duplicateButtonPressed,
    });
  };

  duplicateNote = () => {
    const completedNote = {
      title: this.state.title + ' (copy)',
      content: this.state.content,
      userId: this.props.userId,
    };

    this.props.addNote(completedNote);

    this.setState({
      title: '',
      content: '',
    });
  };

  render() {
    return (
      <div>
        {this.state.editButtonPressed ? (
          <EditNoteFields
            updateState={this.updateState}
            editNote={this.editNote}
            displayState={this.displayState}
          />
        ) : (
          <div className="container">
            <LeftBar />
            <div className="single-note_content">
              <div className="edit-delete_links">
                <div className="links">
                  <div className="each-link" onClick={this.toggleEdit}>
                    edit
                  </div>
                  <div className="each-link" onClick={this.toggleDelete}>
                    delete
                  </div>
                  <div className="each-link" onClick={this.toggleDuplicate}>
                    duplicate
                  </div>
                </div>
              </div>
              {/* ////////////////////
// trying this out//
//////////////////// */}
              <form type="submit">
                <div className="title-div">
                  <input
                    type="text"
                    className="title-input"
                    placeholder="username"
                    onChange={this.updateState}
                    name="usernameField"
                    value={this.state.usernameField}
                  />
                </div>
                <Link to="/" className="each-link" onClick={this.addCollab}>
                  <input type="submit" value="Save" className="submit-button" />
                </Link>
              </form>
              {/* ////////////////////
// trying this out//
//////////////////// */}
              <div className="single-note_header">{this.state.note.title}</div>
              <div className="single-note_text">{this.state.note.content}</div>
            </div>
            {this.state.deleteButtonPressed && (
              <DeleteModal
                toggleDelete={this.toggleDelete}
                deleteNote={this.deleteNote}
              />
            )}
            {this.state.duplicateButtonPressed && (
              <DuplicateModal
                toggleDuplicate={this.toggleDuplicate}
                duplicateNote={this.duplicateNote}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    userId: state.auth.user,
  };
};

export default connect(mapStateToProps, { deleteNote, editNote, addNote, addCollab })(
  SingleNote
);
