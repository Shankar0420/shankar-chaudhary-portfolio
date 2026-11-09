import apiRequest from './api';

export const portfolioApi = {
  // --- AUTHENTICATION ---
  checkAuthStatus: () => apiRequest('/auth/status'),
  setupAdmin: (mobileNumber, password, recoveryPin) =>
    apiRequest('/auth/setup', {
      method: 'POST',
      body: JSON.stringify({ mobileNumber, password, recoveryPin })
    }),
  login: (mobileNumber, password) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ mobileNumber, password })
    }),
  recoverPassword: (mobileNumber, recoveryKey, newPassword) =>
    apiRequest('/auth/recover', {
      method: 'POST',
      body: JSON.stringify({ mobileNumber, recoveryKey, newPassword })
    }),
  getMe: () => apiRequest('/admin/auth/me'),
  changePassword: (currentPassword, newPassword) =>
    apiRequest('/admin/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    }),
  logout: () => apiRequest('/admin/auth/logout', { method: 'POST' }),

  // --- PUBLIC API ---
  getPublicPortfolio: () => apiRequest('/public/portfolio'),
  submitContactForm: (data) =>
    apiRequest('/public/contact/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // --- DASHBOARD OVERVIEW ---
  getDashboardStats: () => apiRequest('/admin/dashboard/stats'),

  // --- PROFILE ---
  getProfile: () => apiRequest('/admin/profile'),
  updateProfile: (profile) =>
    apiRequest('/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(profile)
    }),

  // --- EDUCATION ---
  getEducationList: () => apiRequest('/admin/education'),
  createEducation: (edu) =>
    apiRequest('/admin/education', {
      method: 'POST',
      body: JSON.stringify(edu)
    }),
  updateEducation: (id, edu) =>
    apiRequest(`/admin/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(edu)
    }),
  deleteEducation: (id) =>
    apiRequest(`/admin/education/${id}`, {
      method: 'DELETE'
    }),

  // --- SKILLS ---
  getSkillsList: () => apiRequest('/admin/skills'),
  createSkill: (skill) =>
    apiRequest('/admin/skills', {
      method: 'POST',
      body: JSON.stringify(skill)
    }),
  updateSkill: (id, skill) =>
    apiRequest(`/admin/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skill)
    }),
  deleteSkill: (id) =>
    apiRequest(`/admin/skills/${id}`, {
      method: 'DELETE'
    }),

  // --- PROJECTS ---
  getProjectsList: () => apiRequest('/admin/projects'),
  createProject: (project) =>
    apiRequest('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    }),
  updateProject: (id, project) =>
    apiRequest(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project)
    }),
  duplicateProject: (id) =>
    apiRequest(`/admin/projects/${id}/duplicate`, {
      method: 'POST'
    }),
  deleteProject: (id) =>
    apiRequest(`/admin/projects/${id}`, {
      method: 'DELETE'
    }),

  // --- CERTIFICATES ---
  getCertificatesList: () => apiRequest('/admin/certificates'),
  createCertificate: (cert) =>
    apiRequest('/admin/certificates', {
      method: 'POST',
      body: JSON.stringify(cert)
    }),
  updateCertificate: (id, cert) =>
    apiRequest(`/admin/certificates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cert)
    }),
  deleteCertificate: (id) =>
    apiRequest(`/admin/certificates/${id}`, {
      method: 'DELETE'
    }),

  // --- DOCUMENTS & RESUME ---
  getDocumentsList: () => apiRequest('/admin/documents'),
  createDocument: (doc) =>
    apiRequest('/admin/documents', {
      method: 'POST',
      body: JSON.stringify(doc)
    }),
  setActiveResume: (id) =>
    apiRequest(`/admin/documents/${id}/set-resume`, {
      method: 'PUT'
    }),
  toggleDocumentVisibility: (id) =>
    apiRequest(`/admin/documents/${id}/toggle-visibility`, {
      method: 'PUT'
    }),
  deleteDocument: (id) =>
    apiRequest(`/admin/documents/${id}`, {
      method: 'DELETE'
    }),

  // --- CONTACT & SOCIAL ---
  getContactInfo: () => apiRequest('/admin/contact'),
  updateContactInfo: (contact) =>
    apiRequest('/admin/contact', {
      method: 'PUT',
      body: JSON.stringify(contact)
    }),

  // --- WEBSITE SETTINGS ---
  getSettings: () => apiRequest('/admin/settings'),
  updateSettings: (settings) =>
    apiRequest('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    }),

  // --- CONTACT MESSAGES ---
  getMessages: () => apiRequest('/admin/messages'),
  markMessageRead: (id) =>
    apiRequest(`/admin/messages/${id}/read`, {
      method: 'PUT'
    }),
  deleteMessage: (id) =>
    apiRequest(`/admin/messages/${id}`, {
      method: 'DELETE'
    }),

  // --- FILE UPLOAD & MANAGEMENT ---
  uploadFile: (file, category = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    return apiRequest('/admin/upload', {
      method: 'POST',
      body: formData
    });
  },
  deleteUploadedFile: (fileUrl) =>
    apiRequest(`/admin/upload?fileUrl=${encodeURIComponent(fileUrl)}`, {
      method: 'DELETE'
    }),
  getUploadedFilesList: () => apiRequest('/admin/upload')
};

export default portfolioApi;

