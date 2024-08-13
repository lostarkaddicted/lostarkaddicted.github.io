import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Guildy } from "../types/All";

const url = process.env.REACT_APP_SUPA_URL ?? "";
const key = process.env.REACT_APP_SUPA_KEY ?? "";
const supabase = createClient(url, key);

export const useGuildyHook = () => {
  const [guildies, setGuildies] = useState<Guildy[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { data, error } = await supabase.from("Guildy").select();

    if (error) console.log("useGuildyHook - error", error);
    else {
      let array: Guildy[] = [];
      data?.forEach((item) => {
        array = [...array, item];
      });
      setGuildies(array);
    }
  };

  return { guildies };
};
