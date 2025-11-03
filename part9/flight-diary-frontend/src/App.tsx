import { useState, useEffect  } from 'react';
import diaryService from './diaryService';
import type { DiaryEntry } from './types';
import NewDiaryForm from './components/NewDiaryForm';


const App = () => {
  const [allDiaries, setAllDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      setAllDiaries(data);
    });
  }, []);
 const addToAllDiaries = (diary: DiaryEntry) => {
   setAllDiaries(allDiaries.concat(diary));
 }

  return (
    <div>
      <NewDiaryForm addToAllDiaries={addToAllDiaries} />

      <h1>Flight Diaries</h1>
      {allDiaries.map((diary) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          <p>Comment: {diary.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
