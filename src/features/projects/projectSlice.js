import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

 const API_URL = 'https://88.222.212.13:3000/api';
// const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth token
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/projects');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

export const fetchUserProjects = createAsyncThunk(
  'projects/fetchUserProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/projects/user');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user projects');
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/projects', projectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create project');
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, ...projectData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update project');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/projects/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete project');
    }
  }
);

export const addTeamMember = createAsyncThunk(
  'projects/addTeamMember',
  async ({ projectId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/projects/${projectId}/team`, { userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add team member');
    }
  }
);

export const removeTeamMember = createAsyncThunk(
  'projects/removeTeamMember',
  async ({ projectId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/projects/${projectId}/team/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove team member');
    }
  }
);

export const addMilestone = createAsyncThunk(
  'projects/addMilestone',
  async ({ projectId, milestone }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/projects/${projectId}/milestones`, milestone);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add milestone');
    }
  }
);

export const updateMilestoneStatus = createAsyncThunk(
  'projects/updateMilestoneStatus',
  async ({ projectId, milestoneId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`