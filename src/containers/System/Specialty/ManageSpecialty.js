import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import LightBox from 'react-image-lightbox';
import { CommonUtils } from '../../../utils';
import { createNewSpecialtyService } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',

      isOpen: false,
      previewImgURL: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialtyService(this.state);
    if (res && res.errCode === 0) {
      toast.success('Add new specialty successfully!');
    } else {
      toast.error('Add new specialty failed!');
      console.log('>> Check res on save new specialty error: ', res);
    }
  };
  render() {
    return (
      <div className='manage-specialty-container'>
        <div className='ms-title'>Quản lý chuyên khoa</div>
        <div className='add-new-specialty row'>
          <div className='col-6 form-group'>
            <label>Tên chuyên khoa</label>
            <input
              className='form-control'
              type='text'
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, 'name')}
            />
          </div>
          <div className='col-6 form-group'>
            <label>Ảnh chuyên khoa</label>
            <div className='preview-img-container'>
              <input
                id='previewImg'
                type='file'
                hidden
                onChange={(event) => {
                  this.handleOnChangeImage(event);
                }}
              />
              <label className='label-upload' htmlFor='previewImg'>
                Tải ảnh <i className='fas fa-upload'></i>
              </label>
              <div
                className='preview-image'
                style={{
                  backgroundImage: `url(${this.state.previewImgURL})`,
                }}
                onClick={() => this.openPreviewImage()}
              ></div>
            </div>
          </div>
          <div className='col-12'>
            <MdEditor
              style={{ height: '300px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className='col-12'>
            <button
              className='btn-save-specialty'
              onClick={() => this.handleSaveNewSpecialty()}
            >
              Save
            </button>
          </div>
        </div>
        {this.state.isOpen === true && (
          <LightBox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
