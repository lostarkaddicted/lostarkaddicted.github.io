import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//
import Checkbox from "@mui/material/Checkbox";
import { Button, FormControlLabel, Link } from "@mui/material";
//
import {
  addRaidApi,
  removeRaidForPerso,
  useRaidPersoHookFor,
  useRaidsHook,
} from "../api/RaidsApi";
import { Raid } from "../types/All";

export const RaidFormScreen = () => {
  //
  const navigate = useNavigate();
  const { id } = useParams();
  const persoId = id ? Number(id) : 0;
  //remote data
  const { raids } = useRaidsHook();
  const { raidArray } = useRaidPersoHookFor(persoId);
  //
  const [checkedRaids, setCheckedRaids] = React.useState<number[]>([]);

  useEffect(() => {
    setCheckedRaids(raidArray);
  }, [raidArray]);

  const onCheck = (creneau: Raid) => {
    if (checkedRaids.includes(creneau.id)) {
      let array: number[] = checkedRaids.filter((c1) => c1 !== creneau.id);
      setCheckedRaids(array);
    } else {
      let array: number[] = checkedRaids;
      array = [...array, creneau.id];
      setCheckedRaids(array);
    }
  };

  const closeRaidForm = () => {
    navigate("/personnages");
  };

  const raidsList = raids.map((r) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedRaids.includes(r.id)}
            onChange={() => onCheck(r)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={r.name}
      />
    );
  });

  const onAddRaid = async () => {
    // remove previous raids for this perso
    await removeRaidForPerso(persoId);
    // Save new raids
    checkedRaids.forEach(async (idRaid) => {
      await addRaidApi(persoId, idRaid);
    });
    // close form
    closeRaidForm();
  };

  return (
    <div className="DispoForm">
      <h2>{"Saisir les raids"}</h2>
      <div className="CreneauList">{raidsList}</div>
      <br />
      <br />
      <Button variant="outlined" onClick={onAddRaid}>
        {"Sauvegarder"}
      </Button>
      <br />
      <br />
      <Link component="button" variant="body2" onClick={closeRaidForm}>
        Retour au tableau
      </Link>
    </div>
  );
};
