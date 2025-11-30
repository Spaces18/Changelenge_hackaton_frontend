import axios from 'axios';

const API_BASE = '/student'; // Прокси на http://localhost:8000/student

export const getAllCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE}/courses`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error fetching courses';
  }
};

export const getMyCourses = async (userEmail) => {
  try {
    const response = await axios.get(`${API_BASE}/my_courses?user_email=${userEmail}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error fetching my courses';
  }
};

export const enrollInCourse = async (userEmail, courseId) => {
  try {
    const response = await axios.put(`${API_BASE}/get_courses?user_email=${userEmail}&course_id=${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error enrolling in course';
  }
};

export const getMyAnswers = async (taskId, userEmail) => {
  try {
    const response = await axios.get(`${API_BASE}/tasks/${taskId}/my-answers?user_id=${userEmail}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error fetching answers';
  }
};

export const submitHomework = async (taskId, userEmail, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE}/answers?task_id=${taskId}&user_email=${userEmail}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error submitting homework';
  }
};

export const registerStudent = async (email, password, firstname, lastname) => {
  try {
    const response = await axios.post(`${API_BASE}/register_student?email=${email}&password=${password}&firstname=${firstname}&lastname=${lastname}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error registering';
  }
};

export const loginStudent = async (email, password) => {
  try {
    const response = await axios.get(`${API_BASE}/auth_student?email=${email}&password=${password}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error logging in';
  }
};

export const getStudentScores = async (studentEmail) => {
  try {
    const response = await axios.get(`${API_BASE}/students/${studentEmail}/scores_by_course`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error fetching scores';
  }
};