import patientData from "../../data/patients-full";
import { PatientEntry, NonSensitivePatientEntry,NewPatientEntry,Entry,EntryWithoutId } from '../types';
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
  const newPatientEntry = { id, entries: [], ...Entry };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};
  
const getById = (id: string): PatientEntry | undefined => {
  const patient = patientData.find(p => p.id === id);
  return patient;
};
const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const id = uuid();
  const patient = getById(patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }
  const newEntry = { id, ...entry };
  patient.entries.push(newEntry);
  return newEntry;
};
export default {
  getPatientsEntries,
  getNonSensitivePatientsEntries,
  addPatient,
  getById,
  addEntry
};