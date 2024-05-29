import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorService,
  saveDoctorDetailService,
} from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService('GENDER');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log('fetchGenderStart: ', e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('POSITION');
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log('fetchPositionStart: ', e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('ROLE');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log('fetchRoleStart: ', e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Create a new user Successfully!');
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Create a new user failed!');
        dispatch(saveUserFailed());
      }
    } catch (e) {
      toast.error('Create a new user failed!');
      dispatch(saveUserFailed());
      console.log('createNewUser error: ', e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers('ALL');
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
      console.log('fetchAllUsersStart: ', e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success('Delete the user successfully!');
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Delete the user failed!');
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error('Delete the user failed!');
      dispatch(deleteUserFailed());
      console.log('deleteAUser error: ', e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Update the user successfully!');
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Update the user failed!');
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error('Update the user failed!');
      dispatch(editUserFailed());
      console.log('editAUser error: ', e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService('7');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_TOP_DOCTORS_FAILED: ', e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_ALL_DOCTORS_FAILED: ', e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

export const saveDoctorDetail = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDoctorDetailService(data);
      if (res && res.errCode === 0) {
        toast.success('Save doctor information successfully!');
        dispatch({
          type: actionTypes.SAVE_DOCTOR_DETAIL_SUCCESS,
          dataDr: res.data,
        });
      } else {
        toast.error('Save doctor information failed!');
        dispatch({
          type: actionTypes.SAVE_DOCTOR_DETAIL_FAILED,
        });
      }
    } catch (e) {
      toast.error('Save doctor information failed!');
      console.log('SAVE_DOCTOR_DETAIL_FAILED: ', e);
      dispatch({
        type: actionTypes.SAVE_DOCTOR_DETAIL_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = (type) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('TIME');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START,
      });
      let resPrice = await getAllCodeService('PRICE');
      let resPayment = await getAllCodeService('PAYMENT');
      let resProvince = await getAllCodeService('PROVINCE');

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = {
          resPrice: resPrice,
          resPayment: resPayment,
          resProvince: resProvince,
        };
        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInfoFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInfoFailed());
      console.log('fetchGenderStart: ', e);
    }
  };
};

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
