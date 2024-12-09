"use client";

import React, { useEffect, useState, ReactNode } from "react";
import type { Patient } from "@/types";
import PatientsList from "@/components/patient/patients-list";

const username = 'coalition';
const password = 'skills-test';
const auth = 'Basic ' + btoa(username + ':' + password);

type PatientsLayoutProps = {
  children: ReactNode;
};


export default function PatientsLayout({ children }: PatientsLayoutProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [patients, setPatients] = useState<Patient[] | null>(null);

  async function fetchPatients() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
        headers: { 'Authorization': auth }
      });
      const data: Record<string, unknown>[] = await res.json();
      const formattedData = data.map((item, index) => ({ id: index + 1, ...item })) as Patient[];
      setPatients(formattedData);
      localStorage.setItem('patients', JSON.stringify(formattedData));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);


  return (
    <main className="min-h-0 flex-grow h-full p-5 flex gap-5">
      <div className="h-full w-[25%] max-w-80 flex-shrink-0">
        <PatientsList loading={loading} error={error} patients={patients} onFetchPatients={fetchPatients} />
      </div>
      {children}
    </main>
  );
}
