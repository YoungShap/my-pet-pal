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
import Searchbar, { search } from '../components/SearchBar';
import { IoPawSharp } from "react-icons/io5";


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
  const { searchWord } = useContext(GeneralContext);
  return (
    <>
      <h1 className="flex gap-2 main-h1 text-primary font-bold text-5xl m-auto">Pet Clinic <IoPawSharp className='text-softWhite' /></h1>
      <div className='flex justify-center'>
        <Searchbar />
      </div>
      {searchWord && <p className='m-auto'>Active Search({searchWord})</p>}
    </>
  );
};

const PatientTable: React.FC<{ patients: Patient[] }> = ({ patients }) => {
  const { handleOpen, searchWord } = useContext(GeneralContext);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#000000c4' }}>
            <TableRow>
              <TableCell className="text-specialPurple text-base" >Name</TableCell>
              <TableCell className="text-specialPurple text-base" >Phone</TableCell>
              <TableCell className="text-specialPurple text-base" >Pet Name</TableCell>
              <TableCell className="text-specialPurple text-base" >Pet Age</TableCell>
              <TableCell className="text-specialPurple text-base" >Pet Type</TableCell>
              <TableCell className="text-specialPurple text-base" >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#eae8e0" }}>
            {patients.filter(p => search(searchWord, p.phone, p.name, p.petName, p.petAge, p.petType)).map((patient) => (
              <TableRow key={patient._id}>
                <TableCell className="text-grey text-base" component="th" scope="row">
                  {patient.name}
                </TableCell>
                <TableCell className="text-grey text-base" >{patient.phone}</TableCell>
                <TableCell className="text-grey text-base" >{patient.petName}</TableCell>
                <TableCell className="text-grey text-base" >{patient.petAge}</TableCell>
                <TableCell className="text-grey text-base" >{patient.petType}</TableCell>

                <TableCell>
                  <Button onClick={() => handleOpen(patient._id)}><FaEdit className='text-brown' size={22} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button id='add-btn' className='flex justify-start items-center text-center w-32 mt-6 bg-purple text-white px-4 py-2 rounded-md shadow-glow' onClick={() => handleOpen(undefined)}>
        Add Patient +
      </button>
    </>
  );
};

export default PetClinicDashboard;
