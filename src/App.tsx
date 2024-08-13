import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { PersoListScreen } from "./screens/PersoListScreen";
import { PersoFormScreen } from "./screens/PersoFormScreen";
import { ScheduleScreen } from "./screens/ScheduleScreen";
import { ScheduleFormScreen } from "./screens/SheduleFormScreen";
import { RaidsScreen } from "./screens/RaidsScreen";
import { RaidFormScreen } from "./screens/RaidFormScreen";
import "./App.css";
import { Personnage } from "./types/All";

function App() {
  const [tabSelected, setTabSelected] = useState(0);
  const [isPersoFormShown, setIsPersoFormShown] = useState(false);
  const [isDisFormShown, setIsDispoFormShown] = useState(false);
  const [isRaidFormShown, setIsRaidFormShown] = useState(false);
  const [persoSelected, setPersoSelected] = useState<Personnage>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabSelected(newValue);
    setIsPersoFormShown(false);
    setIsDispoFormShown(false);
    setIsRaidFormShown(false);
    setPersoSelected(undefined);
  };

  const showPersoForm = (item?: Personnage) => {
    if (item) {
      setPersoSelected(item);
    }
    setIsPersoFormShown(true);
  };

  const showRaidForm = (item: Personnage) => {
    setPersoSelected(item);
    setIsRaidFormShown(true);
  };

  const closeRaidForm = () => {
    setPersoSelected(undefined);
    setIsRaidFormShown(false);
  };

  const closePersoForm = () => {
    setPersoSelected(undefined);
    setIsPersoFormShown(false);
  };

  const closeDispoForm = () => {
    setIsDispoFormShown(false);
  };

  const openDispoForm = () => {
    setIsDispoFormShown(true);
  };

  return (
    <div className="App">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div className="AppHeader">
          <img
            className="LogoLostArk"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Lost_Ark_logo.png/800px-Lost_Ark_logo.png"
          />
          <h2 className="TextLeft">Raids Helper</h2>
        </div>
        <Tabs
          value={tabSelected}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Personnages" />
          <Tab label="Horaires" />
          <Tab label="Raids" />
        </Tabs>
      </Box>
      {tabSelected === 0 &&
        isPersoFormShown === false &&
        isRaidFormShown === false && (
          <PersoListScreen
            showPersoForm={showPersoForm}
            showRaidForm={showRaidForm}
          />
        )}
      {tabSelected === 0 && isPersoFormShown === true && (
        <PersoFormScreen
          closePersoForm={closePersoForm}
          persoSelected={persoSelected}
        />
      )}
      {tabSelected === 0 &&
        persoSelected !== undefined &&
        isRaidFormShown === true && (
          <RaidFormScreen
            closeRaidForm={closeRaidForm}
            persoSelected={persoSelected}
          />
        )}
      {tabSelected === 1 && isDisFormShown === false && (
        <ScheduleScreen openDispoForm={openDispoForm} />
      )}
      {tabSelected === 1 && isDisFormShown === true && (
        <ScheduleFormScreen onCloseForm={closeDispoForm} />
      )}
      {tabSelected === 2 && <RaidsScreen />}
    </div>
  );
}

export default App;
