//
import { useRaidPersoHook, useRaidsHook } from "../api/RaidsApi";
import { ListPersoChipForRaid } from "../components/ListPersoChip";

export const RaidsScreen = () => {
  // Remote data
  const { raids } = useRaidsHook();
  const { raidData } = useRaidPersoHook();

  return (
    <div className="PersoListScreen">
      <br />
      {raids.map((r) => (
        <div className="CellCreneauContainer" key={r.id}>
          <div className="CellCreneauTitle">
            <b>{r.name}</b>
          </div>
          <div className="CellCreneauGuildies">
            <ListPersoChipForRaid persoList={raidData} raidID={r.id} />
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};
