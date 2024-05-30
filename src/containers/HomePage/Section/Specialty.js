import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllSpecialtiesService } from '../../../services/userService';
import { withRouter } from 'react-router';

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialties: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialtiesService();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialties: res.data ? res.data : [],
      });
    }
  }

  handViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }

  }
  render() {
    let { dataSpecialties } = this.state;
    return (
      <div className='section-share section-specialty'>
        <div className='section-container'>
          <div className='section-header'>
            <span className='title-section'>
              <FormattedMessage id='homepage.specialty-popular' />
            </span>
            <button className='btn-section'>
              <FormattedMessage id='homepage.more-info' />
            </button>
          </div>
          <div className='section-body'>
            <Slider {...this.props.settings}>
              {dataSpecialties &&
                dataSpecialties.length > 0 &&
                dataSpecialties.map((item, index) => {
                  return (
                    <div
                      className='section-customize specialty-child'
                      key={index}
                      onClick={() => this.handViewDetailSpecialty(item)}
                    >
                      <div
                        className='bg-image section-specialty'
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className='specialty-name'>{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
