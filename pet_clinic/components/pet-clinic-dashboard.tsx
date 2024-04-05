import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { GeneralContext } from 'pages';

interface Patient {
  _id: string;
  name: string;
  phone: string;
  petName: string;
  petAge: string,
  petType: string;
}

export const PetClinicDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const { open } = useContext(GeneralContext);

  useEffect(() => {
    fetchData();
  }, [open]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/patients');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPatients(data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div className="grid grid-rows-auto-1fr gap-y-4 p-4 md:p-8 max-w-screen-xl mx-auto">
      <Title />
      <PatientTable patients={patients} />
    </div>
  );
};

const Title: React.FC = () => {
  return (
    <h1 className=" main-h1 text-primary font-bold text-5xl m-auto">Pet Clinic Dashboard</h1>
  );
};

const PatientTable: React.FC<{ patients: Patient[] }> = ({ patients }) => {
  const { handleOpen } = useContext(GeneralContext);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Pet Name</TableCell>
            <TableCell>Pet Age</TableCell>
            <TableCell>Pet Type</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient._id}>
              <TableCell component="th" scope="row">
                {patient.name}
              </TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.petName}</TableCell>
              <TableCell>{patient.petAge}</TableCell>
              <TableCell>{patient.petType}</TableCell>

              <TableCell>
                <Button onClick={() => handleOpen(patient._id)}><FaEdit size={22} /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PetClinicDashboard;
