import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { createNewMedicineService } from '../../../services/userService';
class ManageMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pricePerUnit: '',
      unit: '',
      usage: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleSaveMedicine = async () => {
    let res = await createNewMedicineService({
      name: this.state.name,
      pricePerUnit: this.state.pricePerUnit,
      unit: this.state.unit,
      usage: this.state.usage,
    });
    if (res && res.errCode === 0) {
      toast.success('Save medicine successfully!');
    } else {
      toast.error('Save medicine error!');
    }
    console.log('check state: ', this.state);
    this.setState({
      name: '',
      pricePerUnit: '',
      unit: '',
      usage: '',
    });
  };
  render() {
    return (
      <div className='manage-doctor-container'>
        <div className='manage-doctor-title'>Quản lý thông tin thuốc</div>
        <div className='more-info'>
          <div className='content-left form-group'>
            <label className='col-4'>Tên thuốc</label>
            <input
              className='form-control'
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, 'name')}
            />
          </div>
          <div className='content-right'>
            <label>Cách sử dụng</label>
            <textarea
              className='form-control'
              rows='3'
              onChange={(event) => this.handleOnChangeInput(event, 'usage')}
              value={this.state.usage}
            ></textarea>
          </div>
        </div>
        <div className='more-info-extra row'>
          <div className='col-6 form-group'>
            <label>Đơn vị</label>
            <input
              className='form-control'
              value={this.state.unit}
              onChange={(event) => this.handleOnChangeInput(event, 'unit')}
            />
          </div>
          <div className='col-6 form-group'>
            <label>Giá trên từng đơn vị</label>
            <input
              className='form-control'
              value={this.state.pricePerUnit}
              onChange={(event) =>
                this.handleOnChangeInput(event, 'pricePerUnit')
              }
            />
          </div>
        </div>

        <button
          className='create-content-doctor'
          onClick={() => this.handleSaveMedicine()}
        >
          Lưu thông tin
        </button>
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
