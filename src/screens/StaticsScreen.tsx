import React from "react";
import { useNavigate } from "react-router-dom";
//
import { Chip, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteTeamApi, useStaticHook, useTeamHook } from "../api/StaticsApi";
import { Static } from "../types/All";

export const StaticsScreen = () => {
  //
  const navigate = useNavigate();
  // Remote data
  const { staticData } = useStaticHook();
  const { teams, refresh } = useTeamHook();

  const getTeamData = (idTeam: number) => {
    let array: Static[] = [];
    staticData.forEach((sd) => {
      if (sd.idTeam === idTeam) {
        array = [...array, sd];
      }
    });
    return array;
  };

  const onDeleteTeamClick = async (idTeam: number) => {
    await deleteTeamApi(idTeam);
    refresh();
  };

  const showTeamForm = () => {
    navigate("/statics/create");
  };

  return (
    <div className="PersoListScreen">
      <br />

      <Fab size="small" color="primary" aria-label="add">
        <AddIcon onClick={() => showTeamForm()} />
      </Fab>

      <div className="StaticsListScreen">
        <br />
        {teams.map((team) => (
          <div className="TeamCard">
            <p className="TeamCardRaid">{team.Raids.name}</p>
            <p className="TeamCardName">{team.name}</p>
            <div className="TeamPersoList">
              {getTeamData(team.id).map((perso) => (
                <Chip
                  label={
                    perso.Personnage.Guildy.name +
                    " - " +
                    perso.Personnage.Archetype.name
                  }
                  size="small"
                  variant={"outlined"}
                  className="Chip"
                  color={
                    perso.Personnage.Archetype.is_support
                      ? "primary"
                      : "default"
                  }
                />
              ))}
            </div>
            <IconButton
              aria-label="delete"
              onClick={() => onDeleteTeamClick(team.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};
