import patientData from "../../data/patients";
import { PatientEntry, NonSensitivePatientEntry,NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatientsEntries = (): PatientEntry[] => {
  return patientData;
};
const getNonSensitivePatientsEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
	id,
	name,
	dateOfBirth,
	gender,
	occupation
  }));
};

const addPatient = (Entry: NewPatientEntry): PatientEntry => {
  const id= uuid();
  const newPatientEntry = { id, ...Entry };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};
  
 

export default {
  getPatientsEntries,
  getNonSensitivePatientsEntries,
  addPatient
};