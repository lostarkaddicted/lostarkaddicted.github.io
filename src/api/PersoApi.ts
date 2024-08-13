import { useEffect, useState } from "react";
import { Personnage } from "../types/All";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gkopyfzpawfrwlccrrzk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrb3B5ZnpwYXdmcndsY2NycnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNDczNzEsImV4cCI6MjAxMzYyMzM3MX0.jC0cMLYjyBGfD-UzyCXY518O5t8TfU6GILMUEZ5Pv5A";
const supabase = createClient(supabaseUrl, supabaseKey);

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
