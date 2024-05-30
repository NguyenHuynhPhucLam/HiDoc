import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorByIdService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorByIdService(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      //   this.getInfoDoctor(this.props.doctorId);
    }
  }

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
          : moment
              .unix(+dataTime.date / 1000)
              .locale('en')
              .format('ddd - DD/MM/YYYY');
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>Miễn phí đặt lịch</div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescriptionDoctor, dataTime } = this.props;
    let nameVi = '';
    let nameEn = '';
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    console.log('check props: ', dataTime);
    return (
      <div className='profile-doctor-container'>
        <div className='intro-doctor'>
          <div
            className='content-left'
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ''
              })`,
            }}
          ></div>
          <div className='content-right'>
            <div className='up'>
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>

            <div className='down'>
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        <div className='price'>
          Giá khám:{' '}
          {dataProfile &&
            dataProfile.Doctor_Info &&
            language === LANGUAGES.VI && (
              <NumberFormat
                className='currency'
                value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'VNĐ'}
              />
            )}
          {dataProfile &&
            dataProfile.Doctor_Info &&
            language === LANGUAGES.EN && (
              <NumberFormat
                className='currency'
                value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'USD'}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);