import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { PersoRaid, Static, Team } from "../types/All";

const url = process.env.REACT_APP_SUPA_URL ?? "";
const key = process.env.REACT_APP_SUPA_KEY ?? "";
const supabase = createClient(url, key);

export const useStaticHook = () => {
  const [staticData, setStaticData] = useState<Static[]>([]);

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("Statics")
      .select(
        "*, Personnage ( name, Guildy (name), Archetype (name, is_support) )"
      );

    if (error) console.log("useStaticHook - error", error);
    else {
      let array: Static[] = [];
      data?.forEach((item) => {
        array = [...array, item];
      });
      setStaticData(array);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { staticData };
};

export const useTeamHook = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("Teams")
      .select("*, Raids ( name )");

    if (error) console.log("useTeamHook - error", error);
    else {
      let array: Team[] = [];
      data?.forEach((item) => {
        array = [...array, item];
      });
      setTeams(array);
    }
  };

  return { teams };
};

export const addTeamApi = async (name: string, idRaid: number) => {
  const { error } = await supabase.from("Teams").insert({ name, idRaid });
};

export const getTeamIdApi = async (name: string) => {
  let { data, error } = await supabase.from("Teams").select().eq("name", name);
  return data;
};

export const setMemberToTeam = async (teamId: number, perso: PersoRaid) => {
  const { error } = await supabase
    .from("Statics")
    .insert({ idPerso: perso.idPerso, idTeam: teamId });
};
