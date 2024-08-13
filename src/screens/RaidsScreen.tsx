import { Chip } from "@mui/material";
//
import { useRaidPersoHook, useRaidsHook } from "../api/RaidsApi";

export const RaidsScreen = () => {
  // Remote data
  const { raids } = useRaidsHook();
  const { raidData } = useRaidPersoHook();

  const getRaidData = (id: number) => {
    let array: string[] = [];
    raidData.forEach((raidperso) => {
      if (raidperso.idRaid === id) {
        array = [
          ...array,
          raidperso.Personnage.Guildy.name +
            " - " +
            raidperso.Personnage.Archetype.name,
        ];
      }
    });
    return { max: array.length, array };
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
            {getRaidData(r.id).array.map((str) => (
              <Chip
                label={str}
                size="small"
                variant={"outlined"}
                className="Chip"
              />
            ))}
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};
