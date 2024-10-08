// All

export interface Guildy {
  id: number;
  name: string;
}

export interface Archetype {
  id: number;
  name: string;
  is_support: boolean;
}

export interface Creneau {
  id: number;
  title: string;
}

export interface Dispo {
  id: number;
  idGuildy: number;
  Guildy: NameOnly;
  idCreneau: number;
}

export interface Raid {
  id: number;
  name: string;
  display: boolean;
}

export interface Personnage {
  id: number;
  name: string;
  idClass: number;
  idGuildy: number;
  ilvl: number;
  Guildy: NameOnly;
  Archetype: NameOnly;
}

// Type for api request

export interface PersoRaid {
  id: number;
  idPerso: number;
  idRaid: number;
  Personnage: SimplePerso;
}

export interface Static {
  id: number;
  idPerso: number;
  idTeam: number;
  Personnage: SimplePerso;
}

export interface Team {
  id: number;
  name: string;
  idRaid: number;
  Raids: NameOnly;
}

// Unexported

interface SimplePerso {
  name: string;
  Guildy: NameOnly;
  Archetype: SimpleArchetype;
}

interface SimpleArchetype {
  name: string;
  is_support: boolean;
}

interface NameOnly {
  name: string;
}
