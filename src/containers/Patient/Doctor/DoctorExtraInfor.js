import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfor.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDateService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        };
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>Phòng khám Đa khoa Meditec</div>
                    <div className='detail-address'>52 Bà Triệu - Hoàn Kiếm - Hà Nội</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div>
                            GIÁ KHÁM: 300.000đ.
                            <span onClick={() => this.showHideDetailInfor(true)}>
                                Xem chi tiết
                            </span>
                        </div>
                    }

                    {isShowDetailInfor === true &&
                        <>
                            <div>GIÁ KHÁM: </div>
                            <div>
                                Giá khám
                                Giá khám chưa bao gồm chi phí chụp chiếu xét nghiệm
                                300.000đ
                            </div>
                            <div>
                                Người bệnh có thể trả bằng tiền mặt hoặc thẻ ngân hàng
                            </div>
                            <span onClick={() => this.showHideDetailInfor(false)}>
                                Ẩn bảng giá
                            </span>
                        </>
                    }

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
