import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Creneau } from "../types/All";

const url = process.env.REACT_APP_SUPA_URL ?? "";
const key = process.env.REACT_APP_SUPA_KEY ?? "";
const supabase = createClient(url, key);

export const useCreneauxHook = () => {
  const [creneaux, setCreneaux] = useState<Creneau[]>([]);

  const fetchData = async () => {
    let { data, error } = await supabase.from("Creneaux").select();

    if (error) console.log("useCreneauxHook - error", error);
    else {
      let array: Creneau[] = [];
      data?.forEach((item) => {
        array = [...array, item];
      });
      setCreneaux(array);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { creneaux };
};
