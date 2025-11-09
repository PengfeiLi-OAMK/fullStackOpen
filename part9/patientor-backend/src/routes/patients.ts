import express, { Request, Response, NextFunction } from 'express';
import patientService from "../services/patientService";
import { toNewPatientEntry,toNewEntry } from "../utils";
import { NewPatientSchema,NewEntrySchema } from "../utils";
import { z } from 'zod';
import { NewPatientEntry,PatientEntry } from '../types';

const router=express.Router();
router.get("/",(_req,res)=>{
	  const patients = patientService.getNonSensitivePatientsEntries();
	  res.send(patients);
});
router.get("/:id",(req,res)=>{
  const patient = patientService.getById(req.params.id);
  if(patient){
    res.send(patient);
  }else{
    res.status(404).send({error:"Patient not found"});
  }
});

const newPatientPaser=(req:Request,_res:Response,next:NextFunction)=>{
  try{
    NewPatientSchema.parse(req.body);
    next();
  }catch(error: unknown){
    next(error);
  }
};
const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
    console.log(error.issues);
  } else {
    next(error);
  }
};
router.post(
  '/',
  newPatientPaser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  }
);	
const newEntryPaser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
router.post(
  '/:id/entries',
  newEntryPaser,
  (req, res) => {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(req.params.id, newEntry);
      res.send(addedEntry);
  }
);
    
router.use(errorMiddleware);
export default router;