"use client";

import Card from "@/components/card";
import { Patient } from "@/types";
import PatientProfile from "@/components/patient/patient-profile";
import DiagnosisHistory from "@/components/patient/diagnosis-history";
import DiagnosticList from "@/components/patient/diagnostic-list";
import Icon from "@/components/icon";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { slug } from "@/utils/slug";

export default function CurrentPatient() {
  const params = useParams();
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const storedPatients = localStorage.getItem("patients");
    setPatients(storedPatients ? JSON.parse(storedPatients) : null);
  }, []);

  useEffect(() => {
    const currentPatient = patients?.find((item) => (params.slug as string ?? "") === slug(item));
    if (currentPatient) {
      setPatient(currentPatient);
    }
  }, [patients, params.slug]);

  return (
    <div className="flex-grow min-h-0 flex gap-5">
      <div className="h-full overflow-y-auto flex-grow flex flex-col gap-5 *:flex-shrink-0">
        <Card header="Diagnosis History">
          {patient && <DiagnosisHistory history={patient.diagnosis_history} />}
        </Card>
        <Card header="Diagnostic List">
          {patient && <DiagnosticList list={patient.diagnostic_list} />}
        </Card>
      </div>

      <div className="h-full w-[25%] max-w-80 flex-shrink-0 overflow-y-auto flex flex-col gap-5 *:flex-shrink-0">
        {patient && <PatientProfile patient={patient} />}
        <Card header="Lab Results">
          {patient && (
            <div className="grid gap-2 p-3">
              {patient.lab_results.map((result) => (
                <div key={result} className="cursor-pointer hover:bg-[--background] py-2 px-3 rounded flex items-center justify-between">
                  <p>{result}</p>
                  <Icon icon="download" />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
