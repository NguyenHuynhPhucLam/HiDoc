import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post('/api/login', { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log('check data from service: ', data);
  return axios.post('/api/create-new-user', data);
};

const deleteUserService = (userId) => {
  return axios.delete('/api/delete-user', { data: { id: userId } });
};

const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctorService = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDoctorDetailService = (data) => {
  return axios.post('/api/save-info-doctor', data);
};

const getDetailInfoDoctorService = (inputId) => {
  return axios.get(`/api/get-doctor-detail-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctorService = (data) => {
  return axios.post('/api/bulk-create-schedule', data);
};

const getScheduleDoctorByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInfoDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookAppointmentService = (data) => {
  return axios.post('/api/patient-book-appointment', data);
};
const postVerifyBookAppointmentService = (data) => {
  return axios.post('/api/verify-book-appointment', data);
};
const createNewSpecialtyService = (data) => {
  return axios.post('/api/create-new-specialty', data);
};
const getAllSpecialtiesService = () => {
  return axios.get(`/api/get-all-specialties`);
};
const getDetailSpecialtyByIdService = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const getAllPatientsForDoctorService = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const createNewMedicineService = (data) => {
  return axios.post('/api/save-info-medicine', data);
};
const getPatientById = (patientId) => {
  return axios.get(`/api/get-patient-by-id?patientId=${patientId}`);
};
const getAllMedicines = () => {
  return axios.get(`/api/get-all-medicines`);
};
const getAllMedicinesOfPatientById = (patientId) => {
  return axios.get(
    `/api/get-all-medicines-of-patient-by-id?patientId=${patientId}`
  );
};
const createNewMedicalReportService = (data) => {
  return axios.post('/api/create-medical-report', data);
};
const postSavePatientInfo = (data) => {
  return axios.post('/api/save-patient-info', data);
};
const getPatientInfoByPId = (patientId) => {
  return axios.get(`/api/get-patient-info-by-pid?patientId=${patientId}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorService,
  saveDoctorDetailService,
  getDetailInfoDoctorService,
  saveBulkScheduleDoctorService,
  getScheduleDoctorByDateService,
  getExtraInfoDoctorByIdService,
  getProfileDoctorByIdService,
  postPatientBookAppointmentService,
  postVerifyBookAppointmentService,
  createNewSpecialtyService,
  getAllSpecialtiesService,
  getDetailSpecialtyByIdService,
  getAllPatientsForDoctorService,
  createNewMedicineService,
  getPatientById,
  getAllMedicines,
  getAllMedicinesOfPatientById,
  createNewMedicalReportService,
  postSavePatientInfo,
  getPatientInfoByPId,
};
