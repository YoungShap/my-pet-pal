import ModalDialog from "@/components/ModalDialog";
import { PetClinicDashboard } from "@/components/pet-clinic-dashboard";
import { useCallback, useState } from "react";
import type { NextPage } from "next";
import { createContext } from "react";
import Snackbar from "../components/Snackbar";


export const GeneralContext = createContext<any>(undefined);

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [search, setSearch] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [snackbarText, setSnackbarText] = useState('');

  const handleOpen = (id?: string) => {
    setOpen(true);
    setPatientId(id || '');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const snackbar = useCallback((text: string) => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(''), 3 * 1000);
  }, [setSnackbarText]);

  return (
    <div>
      <GeneralContext.Provider value={{
        open, handleOpen, search,
        setSearch, searchWord, setSearchWord, snackbar
      }}>
        <PetClinicDashboard />
        <ModalDialog open={open} handleClose={handleClose} patientId={patientId} />
        {snackbarText && <Snackbar text={snackbarText} />}
      </GeneralContext.Provider>
    </div>
  );
};

export default Home;
