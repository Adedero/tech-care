import { Patient } from "@/types";

export const slug = (patient: Patient) => `${patient.name.toLowerCase().split(" ").join("-").trim()}`;