import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { PersoRaid, Raid } from "../types/All";

const url = process.env.REACT_APP_SUPA_URL ?? "";
const key = process.env.REACT_APP_SUPA_KEY ?? "";
const supabase = createClient(url, key);

export const useRaidsHook = () => {
  const [raids, setRaids] = useState<Raid[]>([]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { raids };
};

export const useRaidPersoHookFor = (idPerso: number) => {
  const [raidArray, setRaidArray] = useState<number[]>([]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { raidArray };
};

export const useRaidPersoHook = () => {
  const [raidData, setRaidData] = useState<PersoRaid[]>([]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { raidData };
};

export const removeRaidForPerso = async (idPerso: number) => {
  await supabase.from("RaidPerso").delete().eq("idPerso", idPerso);
};

export const addRaidApi = async (idPerso: number, idRaid: number) => {
  await supabase.from("RaidPerso").insert({ idPerso, idRaid });
};
