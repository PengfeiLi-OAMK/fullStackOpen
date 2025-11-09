import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography,Button } from '@mui/material';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnoses';
import type { Patient,Diagnosis,EntryWithoutId } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entrydetails from './Entrydetails';
import AddEntryForm from './AddEntryForm';
import axios from 'axios';

const PatientPage = () => {
  const{id}=useParams<{id:string}>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null >(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  useEffect(() => {
    if(!id) return;
    const fetchPatient = async () => {
      try {
        const patientData = await patientService.getOne(id);
        setPatient(patientData);

      } catch (error) {
        console.error('Failed to fetch patient', error);
        setError('Patient not found');
      }
    };
    fetchPatient();
  }, [id]);
  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const diagnosesData = await diagnosisService.getAll();
        setDiagnoses(diagnosesData);
      } catch (error) {
        console.error('Failed to fetch diagnoses', error);
      }
    };
    fetchDiagnoses();
  }, []);

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }
  if (!patient) {
    return <div>Loading...</div>;
  }
  const handleEntrySubmit=async (payload:EntryWithoutId)=>{
    if(!id) return;
    try{
      const createdEntry=await patientService.createNewEntry(id,payload);
      setPatient(pre=>pre?{...pre,entries:[...pre.entries,createdEntry]}:null);
      setShowForm(false);
    }
    catch(e:unknown){
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };



  return (
    <div>
      <Typography variant="h5" sx={{ mb: 1, mt: 4, fontWeight: 'bold' }}>
        {patient.name}
        {patient.gender === 'male' ? (
          <MaleIcon />
        ) : patient.gender === 'female' ? (
          <FemaleIcon />
        ) : (
          ''
        )}
      </Typography>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {!showForm && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, px: 2, py: 1 }}
          onClick={() => setShowForm(!showForm)}
        >
          Add New Entry
        </Button>
      )}
      {showForm && (
        <AddEntryForm
          diagnoses={diagnoses}
          onCancel={() => setShowForm(false)}
          onSubmit={handleEntrySubmit}
        />
      )}
      <Typography variant="h6" sx={{ mb: 1, mt: 4, fontWeight: 'bold' }}>
        Entries
      </Typography>
      {patient.entries.length === 0 ? (
        <div>No entries</div>
      ) : (
        patient.entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              border: '1px solid #090909ff',
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Entrydetails entry={entry} />
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <ul>
                {entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses?.find((d) => d.code === code);
                  return (
                    <li key={code}>
                      {code} {diagnosis ? diagnosis.name : ''}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
  
};
export default PatientPage;
