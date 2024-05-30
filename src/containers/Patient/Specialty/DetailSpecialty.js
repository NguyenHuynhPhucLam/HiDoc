import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [44, 40],
        };
    }

    async componentDidMount() { }

    async componentDidUpdate(prevProps, prevState, snapshot) { }

    render() {
        let { arrDoctorId } = this.state;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='description-specialty'></div>

                {arrDoctorId && arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index) => {
                        <div className='each-doctor' key={index}>
                            <div className='content-left'>

                            </div>
                            <div className='content-right'>
                                <div className='doctor-schedule'>
                                    <DoctorSchedule
                                        doctorIdFromParent={item}
                                    />
                                </div>
                                <div className='doctor-extra-info'>
                                    <DoctorExtraInfor
                                        doctorIdFromParent={item}
                                    />
                                </div>


                            </div>
                        </div>

                    })
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
