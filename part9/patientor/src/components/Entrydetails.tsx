import { Entry, HealthCheckEntry,HospitalEntry,OccupationalHealthcareEntry } from '../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};
const HealthRatingIcon = ({rating}:{rating:number}) => {
	const colors = ["green", "yellow", "orange", "red"];
	return <FavoriteIcon style={{color:colors[rating]}}/>;
};

const HealthCheckEntryCard = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div>
      <strong style={{ marginRight: '0.5rem' }}>{entry.date} </strong>
      <MedicalServicesIcon />
      <p style={{ fontStyle: 'italic' }}>{entry.description}</p>
      <HealthRatingIcon rating={entry.healthCheckRating} />
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};
const HospitalEntryCard = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <strong style={{ marginRight: '0.5rem' }}>{entry.date} </strong>
      <LocalHospitalIcon />
      <p style={{ fontStyle: 'italic' }}>{entry.description}</p>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Criteria: {entry.discharge.criteria}</p>
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};
const OccupationalHealthcareEntryCard = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <div>
      <strong style={{ marginRight: '0.5rem' }}>{entry.date} </strong>
      <WorkIcon />{' '}
      <span style={{ fontStyle: 'italic' }}>{entry.employerName}</span>
      <p style={{ fontStyle: 'italic' }}>{entry.description}</p>
      {entry.sickLeave && (
        <p>
          Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </p>
      )}
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};
	

const Entrydetails = ({entry}:{entry:Entry}) => {
	switch (entry.type) {
	case "HealthCheck":
		return <HealthCheckEntryCard entry={entry} />;
	case "Hospital":
		return <HospitalEntryCard  entry={entry}/>;
	case "OccupationalHealthcare":
		return <OccupationalHealthcareEntryCard entry={entry} />;
	default:
		return assertNever(entry);
	}
};
export default Entrydetails;
