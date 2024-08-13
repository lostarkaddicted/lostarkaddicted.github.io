import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Dispo } from "../types/All";

const url = process.env.REACT_APP_SUPA_URL ?? "";
const key = process.env.REACT_APP_SUPA_KEY ?? "";
const supabase = createClient(url, key);

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
  await supabase.from("Dispos").delete().eq("idGuildy", idGuildy);
};
export const addDispoApi = async (idGuildy: number, idCreneau: number) => {
  await supabase.from("Dispos").insert({ idGuildy, idCreneau });
};
