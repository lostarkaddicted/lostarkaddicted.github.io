import { useEffect, useState } from "react";
import { Dispo } from "../types/All";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gkopyfzpawfrwlccrrzk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrb3B5ZnpwYXdmcndsY2NycnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNDczNzEsImV4cCI6MjAxMzYyMzM3MX0.jC0cMLYjyBGfD-UzyCXY518O5t8TfU6GILMUEZ5Pv5A";
const supabase = createClient(supabaseUrl, supabaseKey);

export const useDisposHook = (count: number) => {
  const [dispos, setDispos] = useState<Dispo[]>([]);

  useEffect(() => {
    fetchData();
  }, [count]);

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("Dispos")
      .select("*, Guildy ( name )")
      .order("id");
    if (error) console.log("useDisposHook - error", error);
    else {
      let array: Dispo[] = [];
      data?.forEach((item) => {
        array = [...array, item];
      });
      setDispos(array);
    }
  };

  return { dispos };
};

export const removeDispoForGuildy = async (idGuildy: number) => {
  const { error } = await supabase
    .from("Dispos")
    .delete()
    .eq("idGuildy", idGuildy);
};
export const addDispoApi = async (idGuildy: number, idCreneau: number) => {
  const { error } = await supabase
    .from("Dispos")
    .insert({ idGuildy, idCreneau });
};
