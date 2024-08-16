import React from "react";
import { Chip } from "@mui/material";

import { useStaticHook, useTeamHook } from "../api/StaticsApi";
import { Static } from "../types/All";

export const StaticsScreen = () => {
  // Remote data
  const { staticData } = useStaticHook();
  const { teams } = useTeamHook();

  const getTeamData = (idTeam: number) => {
    let array: Static[] = [];
    staticData.forEach((sd) => {
      if (sd.idTeam === idTeam) {
        array = [...array, sd];
      }
    });
    return array;
  };

  return (
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
                  perso.Personnage.Archetype.is_support ? "primary" : "default"
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
