"use client";

import Image from "next/image";
import type { Patient } from "@/types";
import Icon from "@/components/icon";
import Link from "next/link";
import { useParams } from "next/navigation";
import { slug } from "@/utils/slug";
import { useRef, useState, useEffect } from "react";

interface PatientsListProps {
  loading: boolean;
  error: Error | null;
  patients: Patient[] | null;
  onFetchPatients: () => Promise<void>;
}

export default function PatientsList({ loading, error, patients, onFetchPatients }: PatientsListProps) {
  const params = useParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [searching, setSearching] = useState(false);
  const [matchedPatients, setMatchedPatients] = useState<Patient[]>(patients ?? []);

  const handleClick = () => {
    setSearching(true);
    inputRef?.current?.focus();
  };

  const cancelSearch = () => {
    setValue("");
    setSearching(false);
  };

  const handleInput = () => {
    if (patients) {
      const matches = patients.filter((patient) =>
        patient.name.toLowerCase().includes(value.toLowerCase().trim())
      );
      setMatchedPatients(matches);
    }
  };

 
  useEffect(() => {
    handleInput();
  }, [value, patients]);

  useEffect(() => {
    if (patients) {
      setMatchedPatients(patients);
    }
  }, [patients]);

  return (
    <div className="h-full bg-[--unnamed-color-ffffff] rounded-[16px] overflow-hidden">
      <header className="relative py-3 px-4 flex items-center justify-between w-full">
        <p className="card-title-24pt">Patients</p>
        <button onClick={handleClick} type="button" className="rounded-full hover:bg-slate-100 p-2">
          <Icon icon="search" />
        </button>

        <div
          className={`bg-white absolute transition-all duration-300 top-1 right-0 p-3 ${
            searching ? "w-full z-10" : "w-0 -z-10"
          }`}
        >
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-md focus:border-transparent border border-[--unnamed-color-0bd984]"
            placeholder="Search..."
          />

          <button onClick={cancelSearch} type="button" className="absolute top-4 right-4 text-red-500">
            <Icon icon="cancel-circle" width="28" fill="currentColor" />
          </button>
        </div>
      </header>

      {loading && (
        <div className="overflow-y-auto h-[calc(100%-5rem)] p-3">
          {Array.from({ length: 7 }, (_, index) => index).map((_, idx) => (
            <div key={idx} className="p-7 bg-slate-200 mb-4 rounded-md"></div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center px-3 pt-3 pb-8">
          <div className="text-[16px] font-bold">{error.message}</div>
          <div className="mt-3">
            <button
              type="button"
              className="py-2 px-4 rounded-md bg-[--activestate_bg_1] font-semibold"
              onClick={onFetchPatients}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Displaying matched patients or message if none found */}
      {matchedPatients && matchedPatients.length > 0 ? (
        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {matchedPatients.map((patient) => (
            <Link
              key={patient.id as number}
              href={`/patients/${slug(patient)}`}
              className={`cursor-pointer hover:bg-[--activestate_bg_2] p-3 flex items-center gap-2
                ${(params.slug as string ?? "") === slug(patient) ? "bg-[--activestate_bg_2]" : ""}`}
            >
              <div className="overflow-hidden rounded-full w-[48px] h-[48px] bg-slate-100">
                <Image src={patient.profile_picture} alt={patient.name} width="48" height="48" />
              </div>
              <div className="flex-grow">
                <p className="body-emphasized-14pt">{patient.name}</p>
                <p className="body-secondary-info-14pt">{patient.gender}, {patient.age}</p>
              </div>
              <Icon icon="more-horizontal" />
            </Link>
          ))}
        </div>
      ) : (
        !loading && !error && <p className="p-3">No patients found</p>
      )}
    </div>
  );
}
