import { Lesson } from './types';
import ApiService from './services/apiService';

export const lessonApi = {
  async getLesson(id: string): Promise<Lesson> {
    const response = await ApiService.get(`/lessons/${id}/`);
    return response;
  }
};
