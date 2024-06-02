import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import {
  getAllPatientsForDoctorService,
  deleteBookingByPatientId,
} from '../../../services/userService';
import moment from 'moment';
import { withRouter } from 'react-router';
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: [],
    };
  }

  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    this.getDataPatient(user, formattedDate);
  }

  getDataPatient = async (user, formattedDate) => {
    let res = await getAllPatientsForDoctorService({
      doctorId: user.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formattedDate);
      }
    );
  };

  handleMakeMedicalReport = (tableData) => {
    if (this.props.history) {
      this.props.history.push(
        `/doctor/medical-report/${tableData.patientId}/${tableData.date}`
      );
    }
  };
  handleOnCancelBooking = async (item) => {
    let res = await deleteBookingByPatientId(item.patientId);
    if (res && res.errCode === 0) {
      let { user } = this.props;
      let { currentDate } = this.state;
      let formattedDate = new Date(currentDate).getTime();
      this.getDataPatient(user, formattedDate);
    }
  };
  render() {
    let { dataPatient } = this.state;
    console.log('check props from Manage Patient: ', this.props);
    console.log('check dataPatient from Manage Patient: ', dataPatient);
    return (
      <div className='manage-patient-container'>
        <div className='m-p-title'>
          <FormattedMessage id='menu.doctor.manage-patient' />
        </div>
        <div className='manage-patient-body row'>
          <div className='col-4'>
            <label>Chọn ngày khám: </label>
            <DatePicker
              className='form-control'
              onChange={this.handleOnChangeDatePicker}
              value={this.state.currentDate}
            />
          </div>
          <div className='col-12 table-manage-patient'>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Họ và Tên</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>SĐT</th>
                  <th>Địa chỉ</th>
                  <th>Thao tác</th>
                </tr>

                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, index) => {
                    if (item.patientData.birthday) {
                      let birthday = moment
                        .unix(+item.patientData.birthday / 1000)
                        .format('DD/MM/YYYY');

                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.timeTypeDataPatient.valueVi}</td>
                          <td>{item.patientData.firstName}</td>
                          <td>{item.patientData.genderData.valueVi}</td>
                          <td>{birthday}</td>
                          <td>{item.patientData.phoneNumber}</td>
                          <td>{item.patientData.address}</td>
                          <td className>
                            <button
                              className='mp-btn-confirm'
                              onClick={() => this.handleMakeMedicalReport(item)}
                            >
                              Kê đơn thuốc
                            </button>
                            <button
                              className='mp-btn-cancel'
                              onClick={() => this.handleOnCancelBooking(item)}
                            >
                              Hủy lịch hẹn
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })
                ) : (
                  <tr>No Data</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManagePatient)
);
