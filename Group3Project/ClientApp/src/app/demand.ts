// demand is demand for the region 

export interface Demand {
    response:   Response;
    request:    Request;
    apiVersion: string;
}

export interface Request {
    command: string;
    params:  Params;
}

export interface Params {
    api_key:   string;
    frequency: string;
    facets:    Facets;
    data:      string[];
    start:     string;
    end:       string;
}

export interface Facets {
    type:       Type[];
    respondent: Respondent[];
}

export enum Respondent {
    Azps = "AZPS",
}

export enum Type {
    D = "D",
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
    period:            string;
    respondent:        Respondent;
    "respondent-name": RespondentName;
    type:              Type;
    "type-name":       TypeName;
    value:             number;
    "value-units":     ValueUnits;
}

export enum RespondentName {
    ArizonaPublicServiceCompany = "Arizona Public Service Company",
}

export enum TypeName {
    Demand = "Demand",
}

export enum ValueUnits {
    Megawatthours = "megawatthours",
}
