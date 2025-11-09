import { useState } from 'react';
import{EntryWithoutId,Diagnosis} from '../types';
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  SelectChangeEvent,
} from '@mui/material';

type Props={
  diagnoses:Diagnosis[]|null;
	onSubmit:(values:EntryWithoutId)=>Promise<void>|void;
	onCancel:()=>void;
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const AddEntryForm = ({ diagnoses,onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<EntryWithoutId['type']>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);
  // type specific
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickStart, setSickStart] = useState('');
  const [sickEnd, setSickEnd] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const baseEntry = {
      type,
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.map((code) => code.trim())
        : undefined,
    };
    let entry: EntryWithoutId;
    switch (type) {
      case 'HealthCheck':
        entry = {
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating: healthCheckRating,
        };
        break;
      case 'Hospital':
        entry = {
          ...baseEntry,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case 'OccupationalHealthcare':
        entry = {
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave:
            sickStart && sickEnd
              ? {
                  startDate: sickStart,
                  endDate: sickEnd,
                }
              : undefined,
        };
        break;
      default:
        throw new Error(`Unhandled entry type: ${type}`);
    }
    await onSubmit(entry);
  };
  const hadleDiagnosisCodesChange=(e:SelectChangeEvent<typeof diagnosisCodes >)=>{
    const { target: { value } } = e;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value
    );
     
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, mt: 2, border: '1px dotted #999', boxShadow: 'none' }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        New Entry
      </Typography>
      <Stack direction={{ xs: 'row', md: 'column' }} spacing={2} sx={{ mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value as EntryWithoutId['type'])}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          required
        />
      </Stack>
      <FormControl sx={{ mb: 2, width: 300 }}>
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          label="Diagnosis Codes"
          multiple
          value={diagnosisCodes}
          onChange={hadleDiagnosisCodesChange}
          MenuProps={MenuProps}
        >
          {diagnoses?.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} 
             </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <TextField
        fullWidth
        label="Diagnosis codes (comma separated)"
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
        sx={{ mb: 2 }}
      /> */}
      {/* type-specific fields */}
      {type === 'HealthCheck' && (
        <Stack direction="row">
          <TextField
            label="Healthcheck rating (0-3)"
            type="number"
            inputProps={{ min: 0, max: 3 }}
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            sx={{ mb: 2, flexBasis: 200 }}
            required
          />
        </Stack>
      )}
      {type === 'Hospital' && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <TextField
            label="Discharge date"
            type="date"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Discharge criteria"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
            required
            sx={{ flex: 1 }}
          />
        </Stack>
      )}
      {type === 'OccupationalHealthcare' && (
        <Stack spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="Employer name"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            required
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Sick leave start"
              type="date"
              value={sickStart}
              onChange={(e) => setSickStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Sick leave end"
              type="date"
              value={sickEnd}
              onChange={(e) => setSickEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Stack>
      )}
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Stack>
    </Paper>

    // <form onSubmit={handleSubmit} style={{ border: "1px dotted #999", padding: 12 }}>
    // 	<h4>New Entry</h4>
    // 	<label>Type:</label>
    // 	<select value={type} onChange={e=>setType(e.target.value as EntryWithoutId['type'])}>
    // 		<option value="HealthCheck">Health Check</option>
    // 		<option value="Hospital">Hospital</option>
    // 		<option value="OccupationalHealthcare">Occupational Healthcare</option>
    // 	</select>
    // 	<div>
    // 		<label>Description:</label>
    // 		<input type="text" value={description} onChange={e=>setDescription(e.target.value)} required/>
    // 	</div>
    // 	<div>
    // 		<label>Date:</label>
    // 		<input type="date" value={date} onChange={e=>setDate(e.target.value)} required/>
    // 	</div>
    // 	<div>
    // 		<label>Specialist:</label>
    // 		<input type="text" value={specialist} onChange={e=>setSpecialist(e.target.value)} required/>
    // 	</div>
    // 	<div>
    // 		<label>Diagnosis Codes (comma separated):</label>
    // 		<input type="text" value={diagnosisCodes} onChange={e=>setDiagnosisCodes(e.target.value)}/>
    // 	</div>
    // 	{type==='HealthCheck' &&(
    // 		<div>
    // 			<label>Health Check Rating (0-3):</label>
    // 			<input type="number" min="0" max="3" value={healthCheckRating} onChange={e=>setHealthCheckRating(Number(e.target.value))} required/>
    // 		</div>
    // 	)}
    // 	{type==='Hospital' &&(
    // 		<div>
    // 			<label>Discharge Date:</label>
    // 			<input type="date" value={dischargeDate} onChange={e=>setDischargeDate(e.target.value)} required/>
    // 			<label>Discharge Criteria:</label>
    // 			<input type="text" value={dischargeCriteria} onChange={e=>setDischargeCriteria(e.target.value)} required/>
    // 		</div>
    // 	)}
    // 	{type==='OccupationalHealthcare' &&(
    // 		<div>
    // 			<label>Employer Name:</label>
    // 			<input type="text" value={employerName} onChange={e=>setEmployerName(e.target.value)} required/>
    // 			<label>Sick Leave Start Date:</label>
    // 			<input type="date" value={sickStart} onChange={e=>setSickStart(e.target.value)}/>
    // 			<label>Sick Leave End Date:</label>
    // 			<input type="date" value={sickEnd} onChange={e=>setSickEnd(e.target.value)}/>
    // 		</div>
    // 	)}
    // 	<button type="submit">Add Entry</button>
    // 	<button type="button" onClick={onCancel}>Cancel</button>
    // </form>
  );
};
export default AddEntryForm;




