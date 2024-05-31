import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() { }

    async componentDidUpdate(prevProps, prevState, snapshot) { }

    render() {
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>

                </div>
            </div>;
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
