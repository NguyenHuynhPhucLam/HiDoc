import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import moment from 'moment';
import {
  getPatientById,
  getAllMedicines,
  getAllMedicinesOfPatientById,
  createNewMedicalReportService,
  postSavePatientInfo,
  getPatientInfoByPId,
  getDetailInfoDoctorService,
  postBillService,
  deleteMedicalReportByPatientId,
} from '../../../services/userService';
import Select from 'react-select';

class ManageMedicalReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: '',
      patientId: '',
      doctorPrice: '',
      patientEmail: '',

      symptom: '',
      diagnose: '',
      listMedicine: [],
      listUnit: [],
      listUsage: [],
      unit: '',
      usage: '',
      amount: '',
      totalPrice: 0,

      medicineData: [],
      medicinePrice: [],
      selectedMedicine: '',
      myMedicinesData: [],
      buildMedicineData: [],
      appointmentDate: '',
      plusPrice: 0,
      unixDate: '',
    };
  }

  async componentDidMount() {
    console.log(this.props);
    if (this.props.userInfo) {
      let res = await getDetailInfoDoctorService(this.props.userInfo.id);
      if (res && res.errCode === 0) {
        this.setState({
          doctorPrice: res.data.Doctor_Info.priceTypeData.valueVi,
        });
      }
    }
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let patientId = this.props.match.params.id;
      let date = this.props.match.params.date;
      let patientName = '';
      let formattedDate = moment.unix(date / 1000).format('dddd - DD/MM/YYYY');
      if (patientId) {
        let res = await getPatientById(patientId);
        let resMyMedicine = await getAllMedicinesOfPatientById(patientId);
        let resPatientInfo = await getPatientInfoByPId(patientId);
        console.log('resPatientInfo >>> ', resPatientInfo);
        if (res && res.errCode === 0) {
          patientName = res.data.firstName;
          this.setState({
            myMedicinesData: resMyMedicine.data,
            symptom: resPatientInfo.data.symptom,
            diagnose: resPatientInfo.data.diagnose,
            patientEmail: res.data.email,
          });
        }
      }
      let resMedicine = await getAllMedicines();
      if (resMedicine && resMedicine.errCode === 0) {
        let listMedicine = this.buildDataInputSelect(resMedicine.data, 'ME');
        let listUnit = this.buildDataInputSelect(resMedicine.data, 'UN');
        let listUsage = this.buildDataInputSelect(resMedicine.data, 'US');
        let joinedData = this.buildMyMedicineData(
          this.state.myMedicinesData,
          resMedicine.data
        );
        if (joinedData && joinedData.length > 0) {
          let totalPrice = 0;
          for (let i = 0; i < joinedData.length; i++) {
            totalPrice =
              totalPrice + joinedData[i].amount * joinedData[i].pricePerUnit;
          }
          let plusPrice = 0;
          plusPrice = parseInt(this.state.doctorPrice) + parseInt(totalPrice);
          this.setState({
            totalPrice: totalPrice,
            plusPrice: plusPrice,
          });
        }
        if (joinedData.length == 0) {
          let plusPrice = 0;
          plusPrice = parseInt(this.state.doctorPrice);
          this.setState({
            totalPrice: 0,
            plusPrice: plusPrice,
          });
        }

        this.setState({
          listMedicine: listMedicine,
          medicineData: resMedicine.data,
          listUnit: listUnit,
          listUsage: listUsage,
          buildMedicineData: joinedData,
          // totalPrice: totalPrice,
        });
      }
      this.setState({
        appointmentDate: formattedDate,
        patientId: patientId,
        patientName: patientName,
        unixDate: date,
      });
    }
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (type === 'ME') {
      if (inputData && inputData.length > 0) {
        inputData.map((item, index) => {
          let object = {};
          let label = item.name;
          object.label = label;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    if (type === 'UN') {
      if (inputData && inputData.length > 0) {
        inputData.map((item, index) => {
          let object = {};
          let label = item.unit;
          object.label = label;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    if (type === 'US') {
      if (inputData && inputData.length > 0) {
        inputData.map((item, index) => {
          let object = {};
          let label = item.usage;
          object.label = label;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  buildMyMedicineData = (myMedicinesData, medicineData) => {
    const joinedData = [];
    if (myMedicinesData && myMedicinesData.length > 0) {
      for (let i = 0; i < myMedicinesData.length; i++) {
        const medicineId = myMedicinesData[i].medicineId;
        const matchingData2 = medicineData.find(
          (item) => item.id === medicineId
        );

        if (matchingData2) {
          const mergedData = { ...myMedicinesData[i], ...matchingData2 };
          joinedData.push(mergedData);
        }
      }
    }
    console.log(joinedData);
    return joinedData;
  };
  handleChangeSelect = async (selectedOption) => {
    console.log(selectedOption.value);
    let { listUnit, listUsage } = this.state;
    let usage = '',
      unit = '';
    usage = listUsage.find((item) => {
      return item && item.value === selectedOption.value;
    });

    unit = listUnit.find((item) => {
      return item && item.value === selectedOption.value;
    });
    this.setState({
      selectedMedicine: selectedOption,
      usage: usage,
      unit: unit,
    });
  };

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
    let res = await createNewMedicalReportService({
      patientId: this.state.patientId,
      medicineId: this.state.selectedMedicine.value,
      amount: this.state.amount,
    });
    let resPatientInfo = await postSavePatientInfo({
      patientId: this.state.patientId,
      symptom: this.state.symptom,
      diagnose: this.state.diagnose,
    });
    if (
      res &&
      res.errCode === 0 &&
      resPatientInfo &&
      resPatientInfo.errCode === 0
    ) {
      toast.success('Save medicine successfully!');
      let resMyMedicine = await getAllMedicinesOfPatientById(
        this.state.patientId
      );
      if (resMyMedicine && resMyMedicine.errCode === 0) {
        let joinedData = this.buildMyMedicineData(
          resMyMedicine.data,
          this.state.medicineData
        );
        if (joinedData && joinedData.length > 0) {
          let totalPrice = this.state.totalPrice;
          for (let i = joinedData.length - 1; i < joinedData.length; i++) {
            totalPrice =
              totalPrice + joinedData[i].amount * joinedData[i].pricePerUnit;
          }
          let plusPrice = 0;
          plusPrice = parseInt(this.state.doctorPrice) + parseInt(totalPrice);
          this.setState({
            totalPrice: totalPrice,
            plusPrice: plusPrice,
          });
        }
        this.setState({
          buildMedicineData: joinedData,
        });
      }
    } else {
      toast.error('Save medicine error!');
    }
  };

  handleSendBill = async () => {
    let res = await postBillService({
      appointmentDate: this.state.appointmentDate,
      patientName: this.state.patientName,
      plusPrice: this.state.plusPrice,
      totalPrice: this.state.totalPrice,
      doctorPrice: this.state.doctorPrice,
      receiverEmail: this.state.patientEmail,
      doctorId: this.props.userInfo.id,
      patientId: this.state.patientId,
      unixDate: this.state.unixDate,
    });
    if (res && res.errCode === 0) {
      toast.success('Send bill successfully');
    } else {
      toast.error('Send bill error!');
    }
  };

  handleDeleteMedicine = async (item) => {
    let res = await deleteMedicalReportByPatientId(
      this.state.patientId,
      item.medicineId
    );
    console.log(res);
    if (res && res.errCode === 0) {
      let resMyMedicine = await getAllMedicinesOfPatientById(
        this.state.patientId
      );
      if (resMyMedicine && resMyMedicine.errCode === 0) {
        let joinedData = this.buildMyMedicineData(
          resMyMedicine.data,
          this.state.medicineData
        );
        if (joinedData && joinedData.length > 0) {
          let totalPrice = this.state.totalPrice;
          for (let i = joinedData.length - 1; i < joinedData.length; i++) {
            totalPrice =
              totalPrice + joinedData[i].amount * joinedData[i].pricePerUnit;
          }
          let plusPrice = 0;
          plusPrice = parseInt(this.state.doctorPrice) + parseInt(totalPrice);
          this.setState({
            totalPrice: totalPrice,
            plusPrice: plusPrice,
          });
        }
        if (joinedData.length == 0) {
          let plusPrice = 0;
          plusPrice = parseInt(this.state.doctorPrice);
          this.setState({
            totalPrice: 0,
            plusPrice: plusPrice,
          });
        }
        this.setState({
          buildMedicineData: joinedData,
        });
      }
    }
  };
  render() {
    console.log('check state: ', this.state);
    let { buildMedicineData, plusPrice } = this.state;

    return (
      <div className='manage-doctor-container'>
        <div className='manage-doctor-title'>
          Quản lý thông tin phiếu khám bệnh
        </div>
        <div className='more-info'>
          <div className='row'>
            <div className='col-12 form-group'>
              <label className=''>Tên bệnh nhân</label>
              <input
                className='form-control'
                value={this.state.patientName}
                disabled
              />
            </div>
            <div className='col-12 form-group'>
              <label className=''>Ngày hẹn</label>
              <input
                className='form-control'
                value={this.state.appointmentDate}
                disabled
              />
            </div>
          </div>

          <div className='content-left form-group'>
            <label className=''>Chẩn đoán</label>
            <textarea
              className='form-control'
              rows='5'
              onChange={(event) => this.handleOnChangeInput(event, 'diagnose')}
              value={this.state.diagnose}
            ></textarea>
          </div>
          <div className='content-right form-group'>
            <label>Triệu chứng</label>
            <textarea
              className='form-control'
              rows='5'
              onChange={(event) => this.handleOnChangeInput(event, 'symptom')}
              value={this.state.symptom}
            ></textarea>
          </div>
        </div>
        <div className='more-info-extra row'>
          <div className='col-3 form-group'>
            <label>Tên thuốc</label>
            <Select
              value={this.state.selectedMedicine}
              onChange={this.handleChangeSelect}
              options={this.state.listMedicine}
              placeholder={'Chọn thuốc'}
            />
          </div>
          <div className='col-3 form-group'>
            <label>Số lượng</label>
            <input
              className='form-control'
              value={this.state.amount}
              onChange={(event) => this.handleOnChangeInput(event, 'amount')}
            />
          </div>
          <div className='col-3 form-group'>
            <label>Đơn vị</label>
            <input
              className='form-control'
              value={this.state.unit.label}
              disabled
            />
          </div>
          <div className='col-3 form-group'>
            <label>Cách dùng</label>
            <input
              className='form-control'
              value={this.state.usage.label}
              disabled
            />
          </div>
        </div>

        <button
          className='create-content-doctor'
          onClick={() => this.handleSaveMedicine()}
        >
          Lưu thông tin
        </button>
        <div className='row'>
          <div className='col-2 form-group'>
            <label>Giá khám (VNĐ):</label>
            <input
              className='form-control'
              disabled
              value={this.state.doctorPrice}
            />
          </div>

          <div className='col-2 form-group'>
            <label>Giá thuốc (VNĐ):</label>
            <input
              className='form-control'
              disabled
              value={this.state.totalPrice}
            />
          </div>
          <div className='col-2 form-group'>
            <label>Tổng tiền (VNĐ):</label>
            <input
              className='form-control'
              disabled
              value={plusPrice}
              type='number'
            />
          </div>
          <button
            className='form-group'
            style={{ marginTop: '30px', background: 'orange' }}
            onClick={() => this.handleSendBill()}
          >
            Gửi hóa đơn
          </button>
        </div>

        <div className='manage-patient-container'>
          <div className='manage-patient-body row'>
            <div className='col-12 table-manage-patient'>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <th>STT</th>
                    <th>Thuốc</th>
                    <th>Đơn vị</th>
                    <th>Số lượng</th>
                    <th>Cách dùng</th>
                    <th>Thao tác</th>
                  </tr>

                  {buildMedicineData && buildMedicineData.length > 0 ? (
                    buildMedicineData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.unit}</td>
                          <td>{item.amount}</td>
                          <td>{item.usage}</td>
                          <td className>
                            <button
                              className='mp-btn-cancel'
                              onClick={() => this.handleDeleteMedicine(item)}
                            >
                              Hủy đơn thuốc
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>No Data</tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMedicalReport);
