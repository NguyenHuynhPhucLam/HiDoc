import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {
  render() {
    return (
      <div className='home-footer'>
        <p>
          &copy; 2024 MyDoctor Lam&Thinh {'\t'}
          <a target='_blank' href='https://github.com/NguyenHuynhPhucLam/HiDoc'>
            More Information
          </a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
