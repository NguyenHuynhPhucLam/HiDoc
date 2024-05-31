import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class ManageMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { hasOldData, listSpecialty } = this.state;
    return (
      <div className='manage-doctor-container'>
        <div className='manage-doctor-title'>Quản lý thông tin thuốc</div>
        <div className='more-info'>
          <div className='content-left form-group'>
            <label className='col-4'>Tên thuốc</label>
            <input className='form-control'></input>
          </div>
          <div className='content-right'>
            <label>Cách sử dụng</label>
            <textarea
              className='form-control'
              rows='3'
              onChange={(event) =>
                this.handleOnChangeText(event, 'description')
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className='more-info-extra row'>
          <div className='col-4 form-group'>
            <label>Số lượng</label>
            <input className='form-control'></input>
          </div>
          <div className='col-4 form-group'>
            <label>Đơn vị</label>
            <input className='form-control'></input>
          </div>
          <div className='col-4 form-group'>
            <label>Giá trên từng đơn vị</label>
            <input className='form-control'></input>
          </div>
        </div>

        <button className='create-content-doctor'>Lưu thông tin</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMedicine);
