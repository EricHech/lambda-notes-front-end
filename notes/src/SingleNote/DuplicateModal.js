import React from 'react';
import { Link } from 'react-router-dom';

export const DuplicateModal = props => {
  return (
    <div className="modal-layer-one">
      <div className="modal-layer-two">
        <div className="the-modal">
          <div className="modal-text">
            Are you sure you duplicate this note?
          </div>
          <Link to="/" className="each-link" onClick={props.duplicateNote}>
            <button className="modal-danger">Duplicate</button>
          </Link>
          <button className="modal-safe" onClick={props.toggleDuplicate}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
