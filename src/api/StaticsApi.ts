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

  const refresh = () => {
    fetchData();
  };

  return { staticData, refresh };
};

export const getMembersFromTeamApi = async (idTeam: number) => {
  let { data } = await supabase
    .from("Statics")
    .select(
      "*, Personnage ( name, Guildy (name), Archetype (name, is_support) )"
    )
    .eq("idTeam", idTeam);
  console.log(data);
  return data ?? [];
};

export const useTeamHook = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const refresh = () => {
    fetchData();
  };

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

  return { teams, refresh };
};

export const addTeamApi = async (name: string, idRaid: number) => {
  await supabase.from("Teams").insert({ name, idRaid });
};

export const modifyTeamApi = async (
  id: number,
  name: string,
  idRaid: number
) => {
  await supabase.from("Teams").update({ name, idRaid }).eq("id", id);
};

export const getTeamIdApi = async (name: string) => {
  let { data } = await supabase.from("Teams").select().eq("name", name);
  return data;
};

export const getTeamApi = async (id: number) => {
  let { data } = await supabase.from("Teams").select("*").eq("id", id);
  if (data && data.length > 0) {
    return data[0];
  }
};

export const setMemberToTeamApi = async (teamId: number, perso: PersoRaid) => {
  await supabase
    .from("Statics")
    .insert({ idPerso: perso.idPerso, idTeam: teamId });
};

export const deleteTeamApi = async (idTeam: number) => {
  await supabase.from("Statics").delete().eq("idTeam", idTeam);
  await supabase.from("Teams").delete().eq("id", idTeam);
};

export const deleteTeamMembersApi = async (idTeam: number) => {
  await supabase.from("Statics").delete().eq("idTeam", idTeam);
};
