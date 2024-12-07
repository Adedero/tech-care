'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/components/card";
import Icon from "@/components/icon";
import Header from "@/components/header";
import Loader from "@/components/loader";
import PatientProfile from "@/components/patient/patient-profile";
import DiagnosisHistory from "@/components/patient/diagnosis-history";
import DiagnosticList from "@/components/patient/diagnostic-list";
import type { Patient } from "@/types";

const username = 'coalition';
const password = 'skills-test';
const auth = 'Basic ' + btoa(username + ':' + password);

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  async function fetchPatients() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
        headers: { 'Authorization': auth }
      });
      const data = await res.json();
      const formattedData : Patient[] = data.map((item: Record<string, unknown>, index: number) => ({ id: index + 1, ...item }));
      setPatients(formattedData);
      setCurrentPatient(formattedData[0]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPatients()
  }, []);

  return (
    <main className="min-h-dvh h-dvh flex flex-col gap-5 p-5">
      <Header />

      { loading && (<Loader />)}

      { error &&     
        (<Card className="w-full" header="Something went wrong!" headerClassName="text-red-500">
          <div className="text-center px-3 pb-8">
            <div className="text-[16px] font-bold">{error.message}</div>
            <div className="mt-3">
              <button
                type="button"
                className="py-2 px-4 rounded-md bg-[--activestate_bg_1] font-semibold"
                onClick={fetchPatients}
              >
                Retry
              </button>
            </div>
          </div>
        </Card>)
      }

      { patients && currentPatient &&
        (<div className="flex-grow min-h-0 flex gap-5">
          <Card className="h-full max-h-full w-[25%] max-w-80 flex-shrink-0" header="Patients" headerIcon="search">
            {patients && (
              <div className="overflow-y-auto h-[calc(100%-5rem)]">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`cursor-pointer hover:bg-[--activestate_bg_2] p-3 flex items-center gap-2
                      ${patient.id === currentPatient?.id? "bg-[--activestate_bg_2]" : ""}`
                    }
                    onClick={() => setCurrentPatient(patient)}
                  >
                    <div className="overflow-hidden rounded-full w-[48px] h-[48px] bg-slate-100">
                      <Image src={patient.profile_picture} alt={patient.name} width="48" height="48" />
                    </div>
                    <div className="flex-grow">
                      <p className="body-emphasized-14pt">{patient.name}</p>
                      <p className="body-secondary-info-14pt">{patient.gender}, {patient.age}</p>
                    </div>
                    <Icon icon="more-horizontal" />
                  </div>
                ))}
              </div>
            )}
            {!patients && <p>No patients found</p>}
          </Card>

          <div className="h-full overflow-y-auto flex-grow flex flex-col gap-5 *:flex-shrink-0">
            <Card header="Diagnosis History">
              <DiagnosisHistory history={currentPatient.diagnosis_history} />
            </Card>
            <Card header="Diagnostic List">
              <DiagnosticList list={currentPatient.diagnostic_list} />
            </Card>
          </div>

          <div className="h-full w-[25%] max-w-80 flex-shrink-0 overflow-y-auto flex flex-col gap-5 *:flex-shrink-0">
            <PatientProfile patient={currentPatient} /> 
            <Card header="Lab Results">
              <div className="grid gap-2 p-3">
                {currentPatient.lab_results.map(result => (
                  <div key={result} className="cursor-pointer hover:bg-[--background] py-2 px-3 rounded flex items-center justify-between">
                    <p>{result}</p>
                    <Icon icon="download" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>)
      }
    </main>
  );
}
