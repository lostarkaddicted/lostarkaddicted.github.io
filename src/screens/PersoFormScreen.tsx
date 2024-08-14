import React from "react";
import { Box, TextField, Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
//
import { Personnage } from "../types/All";
import { useGuildyHook } from "../api/GuildyApi";
import { useArchetypeHook } from "../api/ArchetypeApi";
import { addPersoApi, modifyPersoApi } from "../api/PersoApi";

interface PersoFormScreenProps {
  closePersoForm: () => void;
  persoSelected?: Personnage;
}

export const PersoFormScreen = ({
  closePersoForm,
  persoSelected,
}: PersoFormScreenProps) => {
  // Remote data
  const { guildies } = useGuildyHook();
  const { classes } = useArchetypeHook();
  // Form data
  const [idGuildy, setIdGuildy] = React.useState(
    persoSelected ? persoSelected.idGuildy : 0
  );
  const [idClass, setIdClass] = React.useState(
    persoSelected ? persoSelected.idClass : 0
  );
  const [name, setName] = React.useState(
    persoSelected ? persoSelected.name : ""
  );
  const [ilvl, setIlvl] = React.useState(
    persoSelected ? persoSelected.ilvl : 0
  );

  // Form Handlers
  const handleGuildyChange = (event: SelectChangeEvent) => {
    setIdGuildy(Number(event.target.value));
  };

  const handleClassChange = (event: SelectChangeEvent) => {
    setIdClass(Number(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIlvl(Number(event.target.value));
  };

  //actions
  const addPerso = async () => {
    //todo : error if fields are empty
    await addPersoApi(name, Number(ilvl), idGuildy, idClass);
    closePersoForm();
  };
  const modifyPerso = async () => {
    //todo : error if fields are empty
    if (persoSelected) {
      await modifyPersoApi(
        persoSelected?.id,
        name,
        Number(ilvl),
        idGuildy,
        idClass
      );
    }
    closePersoForm();
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
      <h2>
        {persoSelected ? "Modifier un perso" : "Formulaire d'ajout d'un perso"}
      </h2>
      <Select
        id="demo-simple-select"
        value={idGuildy.toString()}
        label="Pseudo"
        onChange={handleGuildyChange}
        variant="filled"
        sx={{ minWidth: 200 }}
      >
        <MenuItem value={0}>
          <em>Votre pseudo</em>
        </MenuItem>
        {guildies.map((member) => (
          <MenuItem key={member.id} value={member.id}>
            {member.name}
          </MenuItem>
        ))}
      </Select>
      <br />
      <i>
        * Si votre pseudo ne figure pas dans la liste, veuillez contacter
        Mélanie
      </i>
      <br />
      <br />
      <TextField
        id="filled-basic"
        label="Perso"
        variant="filled"
        value={name}
        onChange={handleNameChange}
      />
      <br />
      <br />
      <TextField
        id="filled-basic"
        label="ilvl"
        variant="filled"
        type="number"
        value={ilvl}
        onChange={handleLevelChange}
      />
      <br />
      <br />
      <Select
        id="demo-simple-select"
        value={idClass.toString()}
        label="Pseudo"
        onChange={handleClassChange}
        variant="filled"
        sx={{ minWidth: 200 }}
      >
        <MenuItem value={0}>
          <em>Votre classe</em>
        </MenuItem>
        {classes.map((member) => (
          <MenuItem key={member.id} value={member.id}>
            {member.name}
          </MenuItem>
        ))}
      </Select>
      <br />
      <br />
      <Button
        variant="outlined"
        startIcon={persoSelected ? null : <AddCircleOutlineIcon />}
        onClick={persoSelected ? modifyPerso : addPerso}
      >
        {persoSelected ? "Modifier" : "Ajouter"}
      </Button>
      <br />
      <br />
      <Link component="button" variant="body2" onClick={closePersoForm}>
        Retour à la liste
      </Link>
    </Box>
  );
};
