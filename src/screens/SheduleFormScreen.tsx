import React from "react";
import { Button, FormControlLabel } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
//
import { useGuildyHook } from "../api/GuildyApi";
import { useCreneauxHook } from "../api/CreneauxApi";
import { Creneau } from "../types/All";
import { addDispoApi, removeDispoForGuildy } from "../api/DispoApi";

interface ScheduleFormScreenProps {
  onCloseForm: () => void;
}

export const ScheduleFormScreen = ({
  onCloseForm,
}: ScheduleFormScreenProps) => {
  // Remote data
  const { guildies } = useGuildyHook();
  const { creneaux } = useCreneauxHook();
  // Form data
  const [idGuildy, setIdGuildy] = React.useState(
    0
    //persoSelected ? persoSelected.idGuildy : 0
  );
  const [checkedCreneaux, setCheckedCreneaux] = React.useState<number[]>([]);

  // Form Handlers
  const handleGuildyChange = (event: SelectChangeEvent) => {
    setIdGuildy(Number(event.target.value));
  };

  //actions
  const onAddDispo = async () => {
    if (idGuildy === 0) {
      // error we leave
      return;
    }
    await removeDispoForGuildy(idGuildy);
    checkedCreneaux.forEach(async (idCren) => {
      await addDispoApi(idGuildy, idCren);
    });
    onCloseForm();
  };

  const onCheck = (creneau: Creneau) => {
    if (checkedCreneaux.includes(creneau.id)) {
      let array: number[] = checkedCreneaux.filter((c1) => c1 !== creneau.id);
      setCheckedCreneaux(array);
    } else {
      let array: number[] = checkedCreneaux;
      array = [...array, creneau.id];
      setCheckedCreneaux(array);
    }
  };

  const creneauList = creneaux.map((cren) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedCreneaux.includes(cren.id)}
            onChange={() => onCheck(cren)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={cren.title}
      />
    );
  });

  return (
    <div className="DispoForm">
      <h2 className="DispoFormTitle">{"Formulaire d'ajout de dispo"}</h2>
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
        Mélanie sur Discord
      </i>
      <br />
      <br />
      <div className="CreneauList">{creneauList}</div>
      <br />
      <br />
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={onAddDispo}
      >
        {"Ajouter"}
      </Button>
      <br />
      <br />
      <Link component="button" variant="body2" onClick={onCloseForm}>
        Retour au tableau
      </Link>
    </div>
  );
};
