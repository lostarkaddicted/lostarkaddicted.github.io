import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, FormControlLabel, Link } from "@mui/material";

import {
  addRaidApi,
  removeRaidForPerso,
  useRaidPersoHookFor,
  useRaidsHook,
} from "../api/RaidsApi";
import { Personnage, Raid } from "../types/All";

interface RaidFormScreenProps {
  closeRaidForm: () => void;
  persoSelected: Personnage;
}

export const RaidFormScreen = ({
  closeRaidForm,
  persoSelected,
}: RaidFormScreenProps) => {
  //remote data
  const { raids } = useRaidsHook();
  const { raidArray } = useRaidPersoHookFor(persoSelected.id);
  console.log({ raidArray });
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
    await removeRaidForPerso(persoSelected.id);
    // Save new raids
    checkedRaids.forEach(async (idRaid) => {
      await addRaidApi(persoSelected.id, idRaid);
    });
    // close form
    closeRaidForm();
  };

  return (
    <div className="DispoForm">
      <h2>{"Saisir les raids de " + persoSelected.name}</h2>
      <div className="CreneauList">{raidsList}</div>
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
