import React from "react";
import { Box, TextField, Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
//
import { useRaidsHook } from "../api/RaidsApi";
import { addTeamApi } from "../api/StaticsApi";

interface TeamFormScreenProps {
  closeTeamForm: () => void;
}

export const StaticFormScreen = ({ closeTeamForm }: TeamFormScreenProps) => {
  // Remote data
  const { raids } = useRaidsHook();
  // Form data
  const [hasError, setHasError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [idRaid, setIdRaid] = React.useState(0);

  // Form Handlers
  const handleRaidChange = (event: SelectChangeEvent) => {
    setIdRaid(Number(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  //actions
  const computeError = () => {
    if (name === "" || idRaid === 0) {
      setHasError(true);
      return true;
    }
    setHasError(false);
    return false;
  };

  const addTeam = async () => {
    if (computeError() === true) {
      return;
    }
    await addTeamApi(name, idRaid);
    closeTeamForm();
  };

  return (
    <Box
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        //backgroundColor: "yellow",
        marginTop: 2,
      }}
    >
      <h2>{"Formulaire de création d'un groupe"}</h2>
      <Select
        id="demo-simple-select"
        value={idRaid.toString()}
        label="Pseudo"
        onChange={handleRaidChange}
        variant="filled"
        sx={{ minWidth: 200 }}
      >
        <MenuItem value={0}>
          <em>Pour le raid</em>
        </MenuItem>
        {raids.map((raid) => (
          <MenuItem key={raid.id} value={raid.id}>
            {raid.name}
          </MenuItem>
        ))}
      </Select>
      <br />
      <i>
        * Si le raid ne figure pas dans la liste, veuillez contacter Mélanie
      </i>
      <br />
      <br />
      <TextField
        id="filled-basic"
        label="Nom du groupe"
        variant="filled"
        value={name}
        onChange={handleNameChange}
      />
      <br />
      <br />
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addTeam}
      >
        {"Ajouter"}
      </Button>
      <br />
      <br />
      <Link component="button" variant="body2" onClick={closeTeamForm}>
        Retour à la liste
      </Link>
    </Box>
  );
};
