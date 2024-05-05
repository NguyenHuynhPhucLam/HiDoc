import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    console.log('Check child props: ', this.props);
    console.log('Check child open modal: ', this.props.isOpen);

    return (
      <Modal
        isOpen={this.props.isOpen}
        className={'modal-user-container'}
        toggle={() => {
          this.toggle();
        }}
        size='lg'
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a new User
        </ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='input-container'>
              <label>Email</label>
              <input type='text' />
            </div>
            <div className='input-container'>
              <label>Password</label>
              <input type='password' />
            </div>
            <div className='input-container'>
              <label>First name</label>
              <input type='text' />
            </div>
            <div className='input-container'>
              <label>Last name</label>
              <input type='text' />
            </div>
            <div className='input-container max-width-input'>
              <label>Address</label>
              <input type='text' />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            className='px-3'
            onClick={() => {
              this.toggle();
            }}
          >
            Add New
          </Button>
          <Button
            color='secondary'
            className='px-3'
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
