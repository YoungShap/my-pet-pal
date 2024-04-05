import ModalDialog from "@/components/ModalDialog";
import { PetClinicDashboard } from "@/components/pet-clinic-dashboard";
import { useState } from "react";
import type { NextPage } from "next";
import { createContext } from "react"; 

export const GeneralContext = createContext<any>(undefined); 

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [search, setSearch] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const handleOpen = (id?: string) => {
    setOpen(true);
    setPatientId(id || ''); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <GeneralContext.Provider value={{ open, handleOpen ,search,
            setSearch, searchWord, setSearchWord, }}>
        <PetClinicDashboard />
        <ModalDialog open={open} handleClose={handleClose} patientId={patientId} />
      </GeneralContext.Provider>
    </div>
  );
};

export default Home;
