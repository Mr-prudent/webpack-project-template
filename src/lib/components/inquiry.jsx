// 询盘组件
// inquiry.jsx

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Form from './Form.jsx';

export default class Inquiry extends Component {
  render() {
    return (
      <Form />
    );
  }
}

ReactDom.render(<Inquiry />, document.getElementById('inquiry'));
