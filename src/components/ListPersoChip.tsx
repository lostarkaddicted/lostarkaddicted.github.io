import { Chip } from "@mui/material";
import { PersoRaid } from "../types/All";
import { getRaidData } from "../utils/getRaidData";

interface ListPersoChipForRaidProps {
  persoList: PersoRaid[];
  raidID: number;
  onTapPerso?: (perso: PersoRaid) => void;
}
export const ListPersoChipForRaid = ({
  persoList,
  raidID,
  onTapPerso,
}: ListPersoChipForRaidProps) => {
  return (
    <div>
      {getRaidData(persoList, raidID).map((persoRaid) => (
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
            persoRaid.Personnage.Archetype.is_support ? "primary" : "default"
          }
          onClick={onTapPerso ? () => onTapPerso(persoRaid) : undefined}
        />
      ))}
    </div>
  );
};

interface ListPersoChipProps {
  persoList: PersoRaid[];
  onTapPerso?: (perso: PersoRaid) => void;
}

export const ListPersoChip = ({
  persoList,
  onTapPerso,
}: ListPersoChipProps) => {
  return (
    <div>
      {persoList.map((persoRaid) => (
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
            persoRaid.Personnage.Archetype.is_support ? "primary" : "default"
          }
          onClick={onTapPerso ? () => onTapPerso(persoRaid) : undefined}
        />
      ))}
    </div>
  );
};
