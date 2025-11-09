import diagnoseData from "../../data/diagnoses";
import { DiagnosisEntry } from "../types";


const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnoseData;
};
export default {
  getDiagnoses,
};