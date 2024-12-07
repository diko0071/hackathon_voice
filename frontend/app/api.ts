import axios from 'axios';
import { Lesson } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const lessonApi = {
  async getLesson(id: string): Promise<Lesson> {
    const response = await axios.get(`${API_BASE_URL}/lessons/${id}/`);
    return response.data;
  },

  async startWorkflow(data: { title: string, description: string }) {
    const response = await axios.post(`${API_BASE_URL}/start-workflow/`, data);
    return response;
  }
};
