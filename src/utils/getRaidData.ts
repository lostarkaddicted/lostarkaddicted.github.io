import { PersoRaid } from "../types/All";

export const getRaidData = (raidData: PersoRaid[], idRaid: number) => {
  let array: PersoRaid[] = [];
  raidData.forEach((rd) => {
    if (rd.idRaid === idRaid) {
      array = [...array, rd];
    }
  });
  return array;
};
