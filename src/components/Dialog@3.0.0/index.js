import React from 'react';

import './style.css';

export default class Dialog extends React.Component {
  static defaultProps = {
    open: false,
  };

  //пропсы, которые мы будем искать в children
  static resolvedPropertyNames = ['header', 'content', 'actions'];

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
        //смотрим, есть ли зарезервированные пропсы в передаваемых children'ax
        const resolvedElementProperty = Object.keys(element.props).find(prop =>
          Dialog.resolvedPropertyNames.includes(prop),
        );
        if (resolvedElementProperty) {
          //если будет несколько child с одинаковыми пропсами, то нужно их записать в массив
          const elementCollectionName = `${resolvedElementProperty}Children`;
          if (!result[elementCollectionName]) {
            result[elementCollectionName] = [];
          }
          result[elementCollectionName] = [
            ...result[elementCollectionName],
            element,
          ];
        }
        return result;
      },
      {},
    );
  };

  render() {
    const {
      headerChildren,
      contentChildren,
      actionsChildren,
    } = this.getComponentChildren();
    console.log(this.getComponentChildren());
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
