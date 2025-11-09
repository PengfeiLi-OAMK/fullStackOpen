import { NewPatientEntry,Gender } from "./types";
import { z } from 'zod';
import { HealthCheckRating,EntryWithoutId } from './types';

const BaseEntrySchema = z.object({
  description: z.string().min(1),
  date: z.iso.date(),
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});
const HospitalSchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string().min(1), 
  }),
});
const OccupationalHealthcareSchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().min(1),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  }).optional(),
});
const HealthCheckSchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating),
});
export const NewEntrySchema = z.discriminatedUnion('type', [
  HospitalSchema,
  OccupationalHealthcareSchema,
  HealthCheckSchema,
]);
export const toNewEntry = (object: unknown): EntryWithoutId => {
  return NewEntrySchema.parse(object);
};
export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	   return NewPatientSchema.parse(object);
};

