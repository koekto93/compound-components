import React from 'react';

import DialogActions from './DialogActions';
import DialogContent from './DialogContent';
import DialogHeader from './DialogHeader';

import './style.css';

export default class Dialog extends React.Component {
  //Dialog отвечает за открыт или закрыт, а не за местоположение детей
  static defaultProps = {
    open: false,
  };

  //херня, которая нужна для мемоизации
  static resolvedComponentNames = [
    DialogContent.name,
    DialogHeader.name,
    DialogActions.name,
  ];

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

  getComponentChildren = () => {
    return React.Children.toArray(this.props.children).reduce(
      (result, element) => {
        console.log(element);
        if (Dialog.resolvedComponentNames.includes(element.type.name)) {
          result[element.type.name] = element;
        }
        return result;
      },
      {},
    );
  };

  render() {
    const {
      [DialogHeader.name]: dialogHeader,
      [DialogContent.name]: dialogContent,
      [DialogActions.name]: dialogActions,
    } = this.getComponentChildren();
    return (
      <dialog
        ref={this.dialogRef}
        className="dialog"
        onClick={this.backdropClick}
      >
        <div className="dialog-inside">
          {dialogHeader}
          {dialogContent}
          {dialogActions}
        </div>
      </dialog>
    );
  }
}
