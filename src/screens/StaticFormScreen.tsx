import React from "react";
import { useNavigate } from "react-router-dom";
//
import { Box, TextField, Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
//
import { useRaidPersoHook, useRaidsHook } from "../api/RaidsApi";
import {
  addTeamApi,
  getTeamIdApi,
  setMemberToTeamApi,
} from "../api/StaticsApi";
import {
  ListPersoChip,
  ListPersoChipForRaid,
} from "../components/ListPersoChip";
import { PersoRaid } from "../types/All";

export const StaticFormScreen = () => {
  //
  const navigate = useNavigate();
  // Remote data
  const { raids } = useRaidsHook();
  const { raidData } = useRaidPersoHook();
  // Form data
  const [hasError, setHasError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [idRaid, setIdRaid] = React.useState(0);
  const [selectedPerso, setSelectedPerso] = React.useState<PersoRaid[]>([]);

  // Form Handlers
  const handleRaidChange = (event: SelectChangeEvent) => {
    setIdRaid(Number(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const closeTeamForm = () => {
    navigate("/statics");
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
    // Crée la team
    await addTeamApi(name, idRaid);
    // Récupérer l'id team
    const team = await getTeamIdApi(name);
    if (team && team.length > 0) {
      const teamId = team[0].id;
      console.log({ teamId });
      // Enregistrer les perso pour la team (dans la table static)
      selectedPerso.forEach(async (perso) => {
        await setMemberToTeamApi(teamId, perso);
      });
    }
    // Fermer la page
    closeTeamForm();
  };

  const clickDispoPersoChip = (perso: PersoRaid) => {
    setSelectedPerso([...selectedPerso, perso]);
  };

  const clickSelectedPersoChip = (perso: PersoRaid) => {
    const newArray = selectedPerso.filter((p) => p.id !== perso.id);
    setSelectedPerso(newArray);
  };

  return (
    <Box
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
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
      <h3>{"Personnages sélectionnés"}</h3>
      <br />
      <br />
      <ListPersoChip
        persoList={selectedPerso}
        onTapPerso={clickSelectedPersoChip}
      />
      <br />
      <br />
      <h3>{"Personnages dispo"}</h3>
      {idRaid === 0 && (
        <i>Choisir le raid pour voir les personnages s'afficher</i>
      )}
      {idRaid !== 0 && (
        <ListPersoChipForRaid
          persoList={raidData}
          raidID={idRaid}
          onTapPerso={clickDispoPersoChip}
        />
      )}
      <br />
      <br />
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
