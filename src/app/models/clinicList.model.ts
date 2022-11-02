export interface ClinicForList {
    id: string;
    name: string;
    shortName: string;
    state: ClinicState;
    email: string;
    phone: string
    activePatientsCount: number;
    closedPatientsCount: number;
    patientsCount: number;
    employeesCount: number;
    activeEmployeesCount: number;
    studiesCount: number;
    country: string;
    city: string;
    zipCode: string;
    stateProvince: string;
    addressLine: string;
    regularCare?: boolean;
    createdBy?: string;
    countyLocalized: string;
    runningStudiesCount: number;
}

export interface ClinicState {
    name: string;
    nameLocalized?: string;
    translationKey: string;
}

export interface ClinicAssignOption {
    id: string,
    name: string,
    checked: boolean
}

export interface ClinicForStudy {
    id: string,
    shortName: string,
    clinicStudyState: ClinicState,
    activePatientsCount: number,
    finishedPatientsCount: number
}