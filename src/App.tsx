import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { PersoListScreen } from "./screens/PersoListScreen";
import { PersoFormScreen } from "./screens/PersoFormScreen";
import { RaidsScreen } from "./screens/RaidsScreen";
import { RaidFormScreen } from "./screens/RaidFormScreen";
import { StaticsScreen } from "./screens/StaticsScreen";
import "./App.css";
import { Personnage } from "./types/All";
import { StaticFormScreen } from "./screens/StaticFormScreen";

function App() {
  const [tabSelected, setTabSelected] = useState(0);
  const [isPersoFormShown, setIsPersoFormShown] = useState(false);
  const [isTeamFormShown, setIsTeamFormShown] = useState(false);
  const [isRaidFormShown, setIsRaidFormShown] = useState(false);
  const [persoSelected, setPersoSelected] = useState<Personnage>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabSelected(newValue);
    setIsPersoFormShown(false);
    setIsTeamFormShown(false);
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

  const closeTeamForm = () => {
    setIsTeamFormShown(false);
  };

  const openTeamForm = () => {
    setIsTeamFormShown(true);
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
          {/*<Tab label="Horaires" />*/}
          <Tab label="Raids" />
          <Tab label="Statics" />
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
      {/* 
      {tabSelected === 1 && isDisFormShown === false && (
        <ScheduleScreen openDispoForm={openDispoForm} />
      )}
      {tabSelected === 1 && isDisFormShown === true && (
        <ScheduleFormScreen onCloseForm={closeDispoForm} />
      )}
        */}
      {tabSelected === 1 && <RaidsScreen />}
      {tabSelected === 2 && isTeamFormShown === false && (
        <StaticsScreen showTeamForm={openTeamForm} />
      )}
      {tabSelected === 2 && isTeamFormShown === true && (
        <StaticFormScreen closeTeamForm={closeTeamForm} />
      )}
    </div>
  );
}

export default App;
