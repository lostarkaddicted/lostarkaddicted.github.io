import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Chip } from "@mui/material";
//
import { useCreneauxHook } from "../api/CreneauxApi";
import { useDisposHook } from "../api/DispoApi";

interface ScheduleScreenProps {
  openDispoForm: () => void;
}

export const ScheduleScreen = ({ openDispoForm }: ScheduleScreenProps) => {
  // Remote data
  const { creneaux } = useCreneauxHook();
  const { dispos } = useDisposHook(0);

  const getCreneauData = (id: number) => {
    let array: string[] = [];
    dispos.forEach((disp) => {
      if (disp.idCreneau === id) {
        array = [...array, disp.Guildy.name];
      }
    });
    return { max: array.length, array };
  };

  return (
    <div className="PersoListScreen">
      <Button
        variant="outlined"
        size="small"
        startIcon={<AddCircleOutlineIcon />}
        onClick={openDispoForm}
      >
        Je saisis mes dispos
      </Button>
      <br />

      {creneaux.map((cren) => (
        <div className="CellCreneauContainer" key={cren.id}>
          <div className="CellCreneauTitle">
            <b>{cren.title}</b>
          </div>
          <br />
          <div className="CellCreneauMax">
            <p>Max : {getCreneauData(cren.id).max}</p>
          </div>
          <div className="CellCreneauGuildies">
            {getCreneauData(cren.id).array.map((str) => (
              <Chip
                label={str}
                size="small"
                variant={"outlined"}
                className="Chip"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
