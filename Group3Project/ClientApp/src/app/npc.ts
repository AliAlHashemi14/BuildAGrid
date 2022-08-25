
export interface Npc {
    response:   Response;
    request:    Request;
    apiVersion: string;
}

export interface Request {
    command: string;
    params:  Params;
}

export interface Params {
    api_key: string;
    facets:  Facets;
    data:    string[];
    start:   string;
    end:     string;
}

export interface Facets {
    balancing_authority_code: string[];
    energy_source_code:       string[];
}

export interface Response {
    "query execution":       number;
    "count query execution": number;
    total:                   number;
    dateFormat:              string;
    frequency:               string;
    data:                    Datum[];
    description:             string;
}

export interface Datum {
    period:                        string;
    stateid:                       string;
    stateName:                     string;
    sector:                        string;
    sectorName:                    string;
    entityid:                      number;
    entityName:                    string;
    plantid:                       number;
    plantName:                     string;
    generatorid:                   number | string;
    unit:                          null;
    technology:                    string;
    energy_source_code:            string;
    "energy-source-desc":          string;
    prime_mover_code:              string;
    balancing_authority_code:      string;
    "balancing-authority-name":    string;
    status:                        string;
    statusDescription:             string;
    "nameplate-capacity-mw":       number;
    "nameplate-capacity-mw-units": string;
}
