import { useState  } from 'react';
import diaryService from '../diaryService';
// import { isWeather, isVisibility } from '../utils';
import type { DiaryEntry,NewDiaryPayload } from '../types';
import axios from 'axios';

interface NewDiaryFormProps {
  addToAllDiaries: (d: DiaryEntry) => void;
}

const NewDiaryForm = (props: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const addNewDiary = async(event: React.SyntheticEvent) =>{
    event.preventDefault();
    setErrorMessage(null);
    if (!date || !visibility || !weather || !comment) {
      setErrorMessage('All fields are required');
      return;
    }
    // if (!isVisibility(visibility)) {
    //   alert('Invalid visibility');
    //   return;
    // }

    // if (!isWeather(weather)) {
    //   alert('Invalid weather');
    //   return;
    // }
    const payload: NewDiaryPayload = { date, visibility, weather, comment };
    try{
      const createdDiary = await diaryService.createDiary(payload);
	    props.addToAllDiaries(createdDiary);
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (err: unknown) {
      if(axios.isAxiosError<string>(err)) {
         const msg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.message;
      setErrorMessage(msg);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }else {
        setErrorMessage("Unknown error");
      }
    }
    };

  return (
    <div>
      <h1>Add New Diary Entry</h1>
      {errorMessage&&<div style={{color:'red'}}>{errorMessage}</div>}
      <form onSubmit={addNewDiary}>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Visibility</label>
          {['great', 'good', 'ok', 'poor'].map((v) => (
            <label key={v}style={{ marginRight: '10px' }}>
              <input
                type="radio" 
                value={v}
                checked={visibility === v}
                onChange={(e) => setVisibility(e.target.value)}
              />
              {v}
            </label>
          ))
            }
        </div>
        <div>
          <label>Weather</label>
          {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((w) => (
            <label key={w} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                value={w}
                checked={weather === w}
                onChange={(e) => setWeather(e.target.value)}
              />
              {w}
            </label>
          ))
            }
        </div>
        <div>
          <label>Comment</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
export default NewDiaryForm;

