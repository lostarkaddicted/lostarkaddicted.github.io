import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { PersoListScreen } from "./screens/PersoListScreen";
import { PersoFormScreen } from "./screens/PersoFormScreen";
import { RaidsScreen } from "./screens/RaidsScreen";
import { RaidFormScreen } from "./screens/RaidFormScreen";
import { StaticsScreen } from "./screens/StaticsScreen";
import "./App.css";
import { StaticFormScreen } from "./screens/StaticFormScreen";
//
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const AppHeader = () => {
  //
  const [tabSelected, setTabSelected] = useState(0);
  //
  const navigate = useNavigate();
  //
  const handleClick = (event: React.SyntheticEvent, newValue: number) => {
    setTabSelected(newValue);
    switch (newValue) {
      case 0:
        navigate("/personnages");
        break;
      case 1:
        navigate("/raids");
        break;
      case 2:
        navigate("/statics");
        break;
      default:
        break;
    }
  };

  return (
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
        onChange={handleClick}
        aria-label="basic tabs example"
      >
        <Tab label="Personnages"></Tab>
        {/*<Tab label="Horaires" />*/}
        <Tab label="Raids"></Tab>
        <Tab label="Statics"></Tab>
      </Tabs>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppHeader />

      <Routes>
        <Route path="/" element={<PersoListScreen />} />
        <Route path="/personnages" element={<PersoListScreen />} />
        <Route path="/personnages/create" element={<PersoFormScreen />} />
        <Route path="/personnages/edit/:id" element={<PersoFormScreen />} />
        <Route path="/personnages/editraid/:id" element={<RaidFormScreen />} />
        <Route path="/raids" element={<RaidsScreen />} />
        <Route path="/statics" element={<StaticsScreen />} />
        <Route path="/statics/create" element={<StaticFormScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
