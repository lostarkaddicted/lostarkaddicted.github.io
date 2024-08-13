import { useEffect, useState } from "react";
import { Button, Chip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TuneIcon from "@mui/icons-material/Tune";
//
import { usePersosHook, deletePersoApi } from "../api/PersoApi";
import { Personnage } from "../types/All";
import { useGuildyHook } from "../api/GuildyApi";

interface PersoListScreenProps {
  showPersoForm: (item?: Personnage) => void;
  showRaidForm: (item: Personnage) => void;
}

export const PersoListScreen = ({
  showPersoForm,
  showRaidForm,
}: PersoListScreenProps) => {
  const [count, setCount] = useState(0);
  const { persos } = usePersosHook(count);
  const { guildies } = useGuildyHook();
  const [listToDisplay, setListToDisplay] = useState<Personnage[]>([]);
  const [selectedGuildy, setSelectedGuildy] = useState(0);
  const [minIlvl, setMinIlvl] = useState(0);
  const lvls = [1600, 1610, 1620, 1630];

  useEffect(() => {
    if (persos) {
      setListToDisplay(persos);
    }
  }, [persos]);

  const onModifyPersoClick = (item: Personnage) => {
    showPersoForm(item);
  };

  const onDeletePersoClick = async (id: number) => {
    await deletePersoApi(id);
    setCount(count + 1);
  };

  const onFilter = (guildyId: number) => {
    if (selectedGuildy === guildyId) {
      //reset filter
      setListToDisplay(persos);
      setSelectedGuildy(0);
    } else {
      let newArray = persos.filter((perso) => perso.idGuildy === guildyId);
      setListToDisplay(newArray);
      setSelectedGuildy(guildyId);
    }
  };

  const onFilterLevel = (lvl: number) => {
    if (minIlvl === lvl) {
      //reset filter
      setListToDisplay(persos);
      setMinIlvl(0);
    } else {
      let newArray = persos.filter((perso) => perso.ilvl >= lvl);
      setListToDisplay(newArray);
      setMinIlvl(lvl);
    }
  };

  const listItems = listToDisplay.map((perso) => (
    <div className="CellPerso" key={perso.id}>
      <p className="CellPersoLabel">
        {perso.Guildy.name +
          " - " +
          perso.Archetype.name +
          " - " +
          perso.name +
          " - " +
          perso.ilvl}
      </p>
      <>
        <IconButton
          aria-label="delete"
          onClick={() => onDeletePersoClick(perso.id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="modify"
          onClick={() => onModifyPersoClick(perso)}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="choose" onClick={() => showRaidForm(perso)}>
          <TuneIcon />
        </IconButton>
      </>
    </div>
  ));

  const tagList = guildies.map((guildy) => (
    <Chip
      label={guildy.name}
      size="small"
      variant={guildy.id === selectedGuildy ? "filled" : "outlined"}
      onClick={() => onFilter(guildy.id)}
    />
  ));

  const lvlList = lvls.map((value) => {
    return (
      <Chip
        label={value}
        size="small"
        variant={minIlvl === value ? "filled" : "outlined"}
        onClick={() => onFilterLevel(value)}
      />
    );
  });

  return (
    <div className="PersoListScreen">
      <p>Pour ajouter un personnage, c'est le bouton suivant: :</p>
      <Button
        variant="outlined"
        size="small"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => showPersoForm()}
      >
        Ajouter un Personnage
      </Button>
      <p>
        Pour retrouver vos personnages plus facilement, cliquez sur votre pseudo
        :
      </p>
      <div className="GuildyListTag">{tagList}</div>
      <p>Pour trier par ilvl, cliquez le minimum que vous voulez voir :</p>
      <div className="GuildyListTag">{lvlList}</div>
      <div className="PersoList">{listItems}</div>
    </div>
  );
};
