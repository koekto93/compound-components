import React from 'react';
import seapig, { OPTIONAL, REQUIRED, OPTIONALS } from 'seapig';

import './style.css';

export default class Dialog extends React.Component {
  static defaultProps = {
    open: false,
  };

  //пропсы, которые мы будем искать в children
  static resolvedPropertyNames = {
    header: REQUIRED,
    content: REQUIRED,
    actions: OPTIONALS,
  };

  dialogRef = $dialog => {
    this.$dialog = $dialog;
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.$dialog.showModal();
    }
    if (prevProps.open && !this.props.open) {
      this.close();
    }
  }

  close = () => {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
    this.$dialog.close();
  };

  backdropClick = ({ clientX, clientY }) => {
    const { top, left, bottom, right } = this.$dialog.getBoundingClientRect();
    const isInDialog =
      clientY >= top &&
      clientY <= bottom &&
      clientX >= left &&
      clientX <= right;

    if (!isInDialog) this.close();
  };

  render() {
    const { headerChildren, contentChildren, actionsChildren } = seapig(
      this.props.children,
      Dialog.resolvedPropertyNames, //Важно писать название класса, а не this
    );
    return (
      <dialog
        ref={this.dialogRef}
        className="dialog"
        onClick={this.backdropClick}
      >
        <div className="dialog-inside">
          <section className="dialog-header">{headerChildren}</section>
          <section className="dialog-content">{contentChildren}</section>
          <section className="dialog-actions">{actionsChildren}</section>
        </div>
      </dialog>
    );
  }
}
