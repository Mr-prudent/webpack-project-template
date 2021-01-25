// Form组件

import React, { Component } from 'react';

export default class Form extends Component {
  state = {
    formData: {
      phone: '',
      email: '',
      content: '',
    },
    rules: [
      {
        key: 'phone',
        pattern: 'phone',
      },
      {
        key: 'email',
        required: true,
        minLen: 6,
        maxLen: 10,
      },
    ],
    errors: {
      name: {
        required: '必填',
        minLen: '太短了',
        maxLen: '太长了',
      },
      phone: {
        pattern: '手机格式不对',
      },
    },
  };
  handleChange = (e) => {
    const { target } = e;
    const { formData } = this.state;
    let domId = $(target).attr('id');
    let newForm = { ...formData };
    if (domId === 'in-phone') {
      // 存入手机号
      newForm.phone = target.value;
      this.setState({
        formData: newForm,
      });
    } else if (domId === 'in-email') {
      // 存入邮箱
      newForm.email = target.value;
      this.setState({
        formData: newForm,
      });
    } else if (domId === 'in-content') {
      // 存入内容
      newForm.content = target.value;
      this.setState({
        formData: newForm,
      });
    }
  };
  // TODO: 验证规则没写
  validate = (e) => {
    const { target } = e;
  }
  render() {
    return (
      <div className='send-inquiry'>
        <form className='inquiry-form'>
          <input type='text' id='in-phone' placeholder='Phone' onChange={this.handleChange} onBlur={this.validate}/>
          <input type='text' id='in-email' className='require' placeholder='E-mail&#42;' onChange={this.handleChange} />
          <textarea
            id='in-content'
            cols='30'
            rows='10'
            className='require'
            placeholder='Content&#42;'
            onChange={this.handleChange}
          ></textarea>
        </form>
        <div className='send-btn hvr-icon-wobble-horizontal hvr-bounce-to-right'>
          <div className='span'>Send a Message</div>
          <div className='span'>
            <i className='iconfont icon-angle-right hvr-icon' aria-hidden='true'></i>
          </div>
        </div>
      </div>
    );
  }
}
