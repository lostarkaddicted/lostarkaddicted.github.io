import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Personnage } from "../types/All";

const url = process.env.REACT_APP_SUPA_URL ?? "";
const key = process.env.REACT_APP_SUPA_KEY ?? "";
const supabase = createClient(url, key);

export const usePersosHook = (count: number) => {
  const [persos, setPersos] = useState<Personnage[]>([]);

  useEffect(() => {
    fetchData();
  }, [count]);

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("Personnage")
      .select("*, Guildy ( name ), Archetype ( name )")
      .order("idGuildy");
    if (error) console.log("usePersosHook - error", error);
    else {
      let array: Personnage[] = [];
      data?.forEach((item) => {
        array = [...array, item];
      });
      setPersos(array);
    }
  };

  return { persos };
};

export const addPersoApi = async (
  name: string,
  ilvl: number,
  idGuildy: number,
  idClass: number
) => {
  const { error } = await supabase
    .from("Personnage")
    .insert({ name, ilvl, idGuildy, idClass });
};

export const modifyPersoApi = async (
  id: number,
  name: string,
  ilvl: number,
  idGuildy: number,
  idClass: number
) => {
  const { error } = await supabase
    .from("Personnage")
    .update({ name, ilvl, idGuildy, idClass })
    .eq("id", id);
};

export const deletePersoApi = async (id: number) => {
  const { error } = await supabase.from("Personnage").delete().eq("id", id);
};
