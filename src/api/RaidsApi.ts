import { useEffect, useState } from "react";
import { PersoRaid, Raid } from "../types/All";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gkopyfzpawfrwlccrrzk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrb3B5ZnpwYXdmcndsY2NycnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNDczNzEsImV4cCI6MjAxMzYyMzM3MX0.jC0cMLYjyBGfD-UzyCXY518O5t8TfU6GILMUEZ5Pv5A";
const supabase = createClient(supabaseUrl, supabaseKey);

export const useRaidsHook = () => {
  const [raids, setRaids] = useState<Raid[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("Raids")
      .select()
      .eq("display", "true");

    if (error) console.log("useRaidsHook - error", error);
    else {
      let array: Raid[] = [];
      data?.forEach((item) => {
        array = [...array, item];
      });
      setRaids(array);
    }
  };

  return { raids };
};

export const useRaidPersoHookFor = (idPerso: number) => {
  const [raidArray, setRaidArray] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("RaidPerso")
      .select("idRaid")
      .eq("done", "false")
      .eq("idPerso", idPerso);

    if (error) console.log("useRaidPersoHook - error", error);
    else {
      let array: number[] = [];
      data?.forEach((item) => {
        array = [...array, item.idRaid];
      });
      setRaidArray(array);
    }
  };

  return { raidArray };
};

export const useRaidPersoHook = () => {
  const [raidData, setRaidData] = useState<PersoRaid[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("RaidPerso")
      .select("*, Personnage ( name, Guildy (name), Archetype (name) )")
      .eq("done", "false");

    if (error) console.log("useRaidPersoHook - error", error);
    else {
      let array: PersoRaid[] = [];
      data?.forEach((item) => {
        array = [...array, item];
      });
      setRaidData(array);
    }
  };

  return { raidData };
};

export const removeRaidForPerso = async (idPerso: number) => {
  const { error } = await supabase
    .from("RaidPerso")
    .delete()
    .eq("idPerso", idPerso);
};

export const addRaidApi = async (idPerso: number, idRaid: number) => {
  const { error } = await supabase
    .from("RaidPerso")
    .insert({ idPerso, idRaid });
};
