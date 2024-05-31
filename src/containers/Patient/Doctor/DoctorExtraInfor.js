import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfor.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { getExtraInfoDoctorByIdService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInfoDoctorByIdService(
        this.props.doctorIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      let res = await getExtraInfoDoctorByIdService(
        this.props.doctorIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfo } = this.state;
    let { language } = this.props;
    return (
      <div className='doctor-extra-infor-container'>
        <div className='content-up'>
          <div className='text-address'>
            <FormattedMessage id='patient.extra-infor-doctor.text-address' />
          </div>
          <div className='name-clinic'>
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
          </div>
          <div className='detail-address'>
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ''}
          </div>
        </div>
        <div className='content-down'>
          {isShowDetailInfor === false && (
            <div className='short-infor'>
              <FormattedMessage id='patient.extra-infor-doctor.price' />
              {extraInfo &&
                extraInfo.priceTypeData &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    className='currency'
                    value={extraInfo.priceTypeData.valueVi}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'VNĐ'}
                  />
                )}
              {extraInfo &&
                extraInfo.priceTypeData &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    className='currency'
                    value={extraInfo.priceTypeData.valueEn}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'USD'}
                  />
                )}
              <span
                className='detail'
                onClick={() => this.showHideDetailInfor(true)}
              >
                <FormattedMessage id='patient.extra-infor-doctor.detail' />
              </span>
            </div>
          )}

          {isShowDetailInfor === true && (
            <>
              <div className='title-price'>
                <FormattedMessage id='patient.extra-infor-doctor.price' />
              </div>
              <div className='detail-infor'>
                <div className='price'>
                  <span className='left'>
                    <FormattedMessage id='patient.extra-infor-doctor.price' />
                  </span>
                  <span className='right'>
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          className='currency'
                          value={extraInfo.priceTypeData.valueVi}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={'VNĐ'}
                        />
                      )}
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          className='currency'
                          value={extraInfo.priceTypeData.valueEn}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={'USD'}
                        />
                      )}
                  </span>
                </div>
                <div className='note'>
                  {extraInfo && extraInfo.note ? extraInfo.note : ''}
                </div>
              </div>
              <div className='payment'>
                <FormattedMessage id='patient.extra-infor-doctor.payment' />{' '}
                {extraInfo &&
                extraInfo.paymentTypeData &&
                language === LANGUAGES.VI
                  ? extraInfo.paymentTypeData.valueVi
                  : ''}
                {extraInfo &&
                extraInfo.paymentTypeData &&
                language === LANGUAGES.EN
                  ? extraInfo.paymentTypeData.valueEn
                  : ''}
              </div>
              <div className='hide-price'>
                <span onClick={() => this.showHideDetailInfor(false)}>
                  <FormattedMessage id='patient.extra-infor-doctor.hide-price' />
                </span>
              </div>
            </>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
