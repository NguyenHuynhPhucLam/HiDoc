import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDateService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    this.setState({
      allDays: allDays,
    });
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, 'days')
            .format('dddd - DD/MM');
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, 'days')
            .locale('en')
            .format('ddd - DD/MM');
        }
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDateService(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let date = event.target.value;
      let doctorId = this.props.doctorIdFromParent;
      let res = await getScheduleDoctorByDateService(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
      console.log('check response from React: ', res);
    }
  };

  render() {
    let { allDays, allAvailableTime } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className='doctor-schedule-container'>
          <div className='all-schedule'>
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className='all-available-time'>
            <div className='text-calendar'>
              <i className='fas fa-calendar-alt'>
                <span>
                  <FormattedMessage id='patient.detail-doctor.schedule' />
                </span>
              </i>
            </div>
            <div className='time-content'>
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <React.Fragment>
                  <div className='time-content-btns'>
                    {allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          className={
                            language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'
                          }
                          key={index}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>

                  <div className='book-free'>
                    <span>
                      <FormattedMessage id='patient.detail-doctor.choose' />
                      <i className='far fa-hand-point-up'></i>
                      <FormattedMessage id='patient.detail-doctor.book-free' />
                    </span>
                  </div>
                </React.Fragment>
              ) : (
                <div className='no-schedule'>
                  <FormattedMessage id='patient.detail-doctor.no-schedule' />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal />
      </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
