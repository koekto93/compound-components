import React from 'react';

import Dialog from '../../components/Dialog@4.0.0';
import './style.css';

export default class Demo extends React.Component {
  state = {
    isDialogOpen: false,
  };

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  render() {
    //здесь тоже разделены на children, но т.к вывод одинаков для всех, то
    //мы можем выставлять флаги в виде header, content...
    const { isDialogOpen } = this.state;
    return (
      <div className="container">
        <button onClick={this.openDialog}>Click me</button>
        <Dialog onClose={this.closeDialog} open={isDialogOpen}>
          <b header>Some header</b>
          <h1 content>Some content</h1>
          <button actions onClick={this.closeDialog}>
            Close
          </button>
          <button actions onClick={this.closeDialog}>
            Apply
          </button>
        </Dialog>
      </div>
    );
  }
}
