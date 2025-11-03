import express, { Request, Response, NextFunction } from 'express';
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils";
import { NewEntrySchema } from "../utils";
import { z } from 'zod';
import { NewPatientEntry,PatientEntry } from '../types';

const router=express.Router();
router.get("/",(_req,res)=>{
	  const patients = patientService.getNonSensitivePatientsEntries();
	  res.send(patients);
});
const newPatientPaser=(req:Request,_res:Response,next:NextFunction)=>{
  try{
    NewEntrySchema.parse(req.body);
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
	
router.use(errorMiddleware);
export default router;