// src/app/models/question.model.ts
export interface QuestionOption {
    value: string;
    label: string;
}

export interface Question {
    id: string;
    text: string;
    type: string;
    section: number;
    options?: QuestionOption[];
    required?: boolean;
    placeholder?: string;
}

export type FormData = Record<string, string>[];

export type ValidationErrors = Record<string, string>;

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface AddressSuggestion {
    id: string;
    text: string;
    score: number;
}

export interface FormattedAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
}

export type Client = CaseParty;
export type Opposing = CaseParty;

export interface CaseParty {
    identity: Person;
    role: "pet" | "res" | null;
}

export interface CaseStaff {
    paralegal: Paralegal | Paralegal[];
    attorney: Counselor;
}

export interface User {
    residence: Address;
    phone: string;
    email: string;
    identity: Client | Opposing | Counselor | Paralegal ;

}

export interface Counselor {
    person: StaffMember | Person;
    represents: Client | Opposing;
    license: string | StaffID;
}

export type StaffID = number;

export interface StaffMember {
    staff_id: StaffID;
    identity: Person;
}

export interface Paralegal {
    person: StaffMember;
}

export type other = 'other';

export interface Person {
    name: string;
    id: number;     // unique identifier
    dob: Date;
}

export interface child {
    identity: Person;
    parent: CaseParty | CaseParty[];
}

export type parent = 'parent';
export type spouse = 'spouse';
export type sibling = 'sibling';



export interface Relationship {
    id: string; 
    relation: child | parent | spouse | sibling | other;                                  
    askForInfo: boolean;
}

export interface Case {
    description_input: string;
    category: string;
    parties: {
        user: User;
        client: Client;
        opposing: Opposing 
    };
    complexity: number;
    recent_filing: Record<string, Date | null> | null;
    relationships: Relationship[];
}