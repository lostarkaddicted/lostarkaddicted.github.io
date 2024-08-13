import { useEffect, useState } from "react";
import { Archetype } from "../types/All";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gkopyfzpawfrwlccrrzk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrb3B5ZnpwYXdmcndsY2NycnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNDczNzEsImV4cCI6MjAxMzYyMzM3MX0.jC0cMLYjyBGfD-UzyCXY518O5t8TfU6GILMUEZ5Pv5A";
const supabase = createClient(supabaseUrl, supabaseKey);

export const useArchetypeHook = () => {
  const [classes, setClasses] = useState<Archetype[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

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

  return { classes };
};
