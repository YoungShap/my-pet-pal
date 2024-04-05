import { IPatient } from "@/lib/interfaces";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const Form = (props: { handleClose: () => void }) => {
  const [formData, setFormData] = useState<IPatient>({
    name: "",
    phone: "",
    petName: "",
    petAge: "",
    petType: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Patient data submitted successfully!');
        props.handleClose();
      } else {
        console.error('Failed to submit patient data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting patient data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="crud-form"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        width:"500px",
      }}
    >
      <h1 className="form-h1 text-primary font-bold text-2xl p-8 m-auto">Add Patient</h1>
      <TextField sx={{ width: "100%", marginBottom: '10px' }}
        label="Name"
        variant="filled"
        required
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField sx={{ width: "100%", marginBottom: '10px' }}
        label="Phone"
        type="number"
        variant="filled"
        required
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <TextField sx={{ width: "100%", marginBottom: '10px' }}
        label="Pet Name"
        type="text"
        variant="filled"
        required
        name="petName"
        value={formData.petName}
        onChange={handleChange}
      />
      <TextField sx={{ width: "100%", marginBottom: '10px' }}
        label="Pet Age"
        type="number"
        variant="filled"
        required
        name="petAge"
        value={formData.petAge}
        onChange={handleChange}
      />
      <TextField sx={{ width: "100%", marginBottom: '10px' }}
        label="Pet Type"
        type="text"
        variant="filled"
        required
        name="petType"
        value={formData.petType}
        onChange={handleChange}
      />
      <div>
        <Button sx={{}} onClick={() => props.handleClose()}>
          Close
        </Button>
        <Button
          color="primary"
          type="submit"
          sx={{}}
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default Form;
