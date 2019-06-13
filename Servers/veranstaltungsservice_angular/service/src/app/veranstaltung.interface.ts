
export interface Veranstaltung {
    id: number;
    bezeichnung: string,
    datum: string,
    von: string,
    bis: string,
    max_teilnehmer: number,
    ort: string,
    veranstaltung: Teilnehmer[]
}

export interface Teilnehmer {
    id: string,
    vorname: string,
    nachname: string
}
