import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import Logo from '../../../assets/logo.png';
import { FormattedMessage } from 'react-intl';
class HomeHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='home-header-container'>
          <div className='home-header-content'>
            <div className='left-content'>
              <i className='fas fa-bars'></i>
              {/* <img src={Logo} className='header-logo' /> */}
              <div className='header-logo'></div>
            </div>
            <div className='center-content'>
              <div className='child-content'>
                <div>
                  <b>
                    <FormattedMessage id='home-header.specialty' />
                  </b>
                </div>
                <div className='sub-title'>
                  <FormattedMessage id='home-header.search-doctor' />
                </div>
              </div>
              <div className='child-content'>
                <div>
                  <b>
                    <FormattedMessage id='home-header.health-facility' />
                  </b>
                </div>
                <div className='sub-title'>
                  <FormattedMessage id='home-header.select-room' />
                </div>
              </div>
              <div className='child-content'>
                <div>
                  <b>
                    <FormattedMessage id='home-header.doctor' />
                  </b>
                </div>
                <div className='sub-title'>
                  <FormattedMessage id='home-header.select-doctor' />
                </div>
              </div>
              <div className='child-content'>
                <div>
                  <b>
                    <FormattedMessage id='home-header.fee' />
                  </b>
                </div>
                <div className='sub-title'>
                  <FormattedMessage id='home-header.check-health' />
                </div>
              </div>
            </div>
            <div className='right-content'>
              <div className='support'>
                <i className='fas fa-question-circle'></i>
                <FormattedMessage id='home-header.support' />
              </div>
              <div className='language-vi'>VN</div>
              <div className='language-en'>EN</div>
            </div>
          </div>
        </div>
        <div className='home-header-banner'>
          <div className='content-up'>
            <div className='title1'>
              <FormattedMessage id='banner.title1' />
            </div>
            <div className='title2'>
              <FormattedMessage id='banner.title2' />
            </div>
            <div className='search'>
              <i className='fas fa-search'></i>
              <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
            </div>
          </div>
          <div className='content-down'>
            <div className='options'>
              <div className='option-child'>
                <div className='icon-child'>
                  <i className='far fa-hospital'></i>
                </div>
                <div className='text-child'>
                  <FormattedMessage id='banner.specialized-examination' />
                </div>
              </div>
              <div className='option-child'>
                <div className='icon-child'>
                  <i className='fas fa-mobile-alt'></i>
                </div>
                <div className='text-child'>
                  <FormattedMessage id='banner.remote-healthcare' />
                </div>
              </div>
              <div className='option-child'>
                <div className='icon-child'>
                  <i className='fas fa-procedures'></i>
                </div>
                <div className='text-child'>
                  <FormattedMessage id='banner.general-healthcare' />
                </div>
              </div>
              <div className='option-child'>
                <div className='icon-child'>
                  <i className='fas fa-flask'></i>
                </div>
                <div className='text-child'>
                  <FormattedMessage id='banner.medical-test' />
                </div>
              </div>
              <div className='option-child'>
                <div className='icon-child'>
                  <i className='fas fa-user-md'></i>
                </div>
                <div className='text-child'>
                  <FormattedMessage id='banner.mental-healthcare' />
                </div>
              </div>
              <div className='option-child'>
                <div className='icon-child'>
                  <i className='fas fa-briefcase-medical'></i>
                </div>
                <div className='text-child'>
                  <FormattedMessage id='banner.dental-healthcare' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
