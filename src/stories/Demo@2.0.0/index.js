import React from 'react';

import Dialog, {
  DialogHeader,
  DialogContent,
  DialogActions,
} from '../../components/Dialog@2.0.0';
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
    const { isDialogOpen } = this.state;
    //используем этот вариант, если у отображаемого child есть своё поведение( смена местоположения, стейт, запрос к серверу)
    //дилигирование отображения(местороложения) самому компоненту, а не условиями в Dialog
    return (
      <div className="container">
        <button onClick={this.openDialog}>Click me</button>
        <Dialog onClose={this.closeDialog} open={isDialogOpen}>
          <DialogHeader bottom>
            <b>Some header</b>
          </DialogHeader>
          <DialogContent>
            <h1>Some content</h1>
          </DialogContent>
          <DialogActions top>
            <button onClick={this.closeDialog}>Close</button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
