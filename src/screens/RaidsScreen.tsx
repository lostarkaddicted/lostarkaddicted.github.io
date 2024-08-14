import { Chip } from "@mui/material";
//
import { useRaidPersoHook, useRaidsHook } from "../api/RaidsApi";
import { PersoRaid } from "../types/All";

export const RaidsScreen = () => {
  // Remote data
  const { raids } = useRaidsHook();
  const { raidData } = useRaidPersoHook();

  const getRaidData = (idRaid: number) => {
    let array: PersoRaid[] = [];
    raidData.forEach((rd) => {
      if (rd.idRaid === idRaid) {
        array = [...array, rd];
      }
    });
    return array;
  };

  return (
    <div className="PersoListScreen">
      <br />
      {raids.map((r) => (
        <div className="CellCreneauContainer" key={r.id}>
          <div className="CellCreneauTitle">
            <b>{r.name}</b>
          </div>
          <div className="CellCreneauGuildies">
            {getRaidData(r.id).map((persoRaid) => (
              <Chip
                label={
                  persoRaid.Personnage.Guildy.name +
                  " - " +
                  persoRaid.Personnage.Archetype.name
                }
                size="small"
                variant={"outlined"}
                className="Chip"
                color={
                  persoRaid.Personnage.Archetype.is_support
                    ? "primary"
                    : "default"
                }
              />
            ))}
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};
