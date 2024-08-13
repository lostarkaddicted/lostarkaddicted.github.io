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

// Unexported

interface SimplePerso {
  name: string;
  Guildy: NameOnly;
  Archetype: NameOnly;
}

interface NameOnly {
  name: string;
}
