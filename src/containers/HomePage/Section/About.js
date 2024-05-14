import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
  render() {
    return (
      <div className='section-share section-about'>
        <div className='section-about-header'>Truyền thông nói gì về HiDoc</div>
        <div className='section-about-content'>
          <div className='content-left'>
            <iframe
              width='100%'
              height='400px'
              src='https://www.youtube.com/embed/6stlCkUDG_s?list=PL4Gr5tOAPttLOY9IrWVjJlv4CtkYI5cI_'
              title='Sea waves &amp; beach drone video | Free HD Video - no copyright'
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerpolicy='strict-origin-when-cross-origin'
              allowfullscreen
            ></iframe>
          </div>
          <div className='content-right'>
            <p>
              Irure quis ea consequat ad et aliquip laboris nostrud est elit
              reprehenderit. Non dolore officia nostrud aute veniam sit laboris
              est enim. Duis enim proident adipisicing nostrud ut ullamco ad
              quis aliquip quis velit. Consectetur incididunt id pariatur veniam
              dolor officia aliquip velit ad.
            </p>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
