
import axios from 'axios';
import type { DiaryEntry, NewDiaryPayload } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaries = async () => {
	  const response = await axios.get<DiaryEntry[]>(baseUrl);
	  return response.data;
};
const createDiary = async (newDiary: NewDiaryPayload) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
  return response.data;
};
export default{
	  getAllDiaries,
	  createDiary
};