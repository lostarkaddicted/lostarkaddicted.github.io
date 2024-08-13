import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Archetype } from "../types/All";

const url = process.env.REACT_APP_SUPA_URL ?? "";
const key = process.env.REACT_APP_SUPA_KEY ?? "";
const supabase = createClient(url, key);

export const useArchetypeHook = () => {
  const [classes, setClasses] = useState<Archetype[]>([]);

  const fetchData = async () => {
    let { data, error } = await supabase.from("Archetype").select();

    if (error) console.log("useArchetypeHook - error", error);
    else {
      let array: Archetype[] = [];
      data?.forEach((item) => {
        array = [...array, item];
      });
      setClasses(array);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { classes };
};
