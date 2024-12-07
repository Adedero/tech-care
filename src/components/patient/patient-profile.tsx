import Image from "next/image";
import Icon from "@/components/icon";
import type { Patient } from "@/types";

interface PatientProfileProps {
  patient: Patient;
};


export default function PatientProfile({ patient }: PatientProfileProps) {
  const data = [
    { id: 1, name: "Date of  Birth", value: patient.date_of_birth, icon: "birth" },
    { id: 2, name: "Gender", value: patient.gender, icon: patient.gender.toLowerCase() === "female" ? "female" : "male" },
    { id: 3, name: "Contact Info", value: patient.phone_number, icon: "phone" },
    { id: 4, name: "Emergency Contacts", value: patient.emergency_contact, icon: "phone" },
    { id: 5, name: "Insurance Provider", value: patient.insurance_type, icon: "shield" }
  ];

  return (
    <div className="bg-[--unnamed-color-ffffff] rounded-[16px] overflow-hidden">
      <header className="card-title-24pt py-4 px-4 gap-4 flex flex-col justify-center items-center">
        <Image
          src={patient.profile_picture}
          alt={patient.name}
          width="200"
          height="200"
          priority
          className="rounded-full"
        />  
        <p>{patient.name}</p>
      </header>

      <div className="mt-1 py-3 px-4 grid gap-6">
        {data.map(item => (
          <div key={item.id} className="flex items-center gap-4">
            <Icon icon={item.icon} />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pb-6 flex items-center justify-center">
        <button className="body-emphasized-14pt bg-[--activestate_bg_1] rounded-full px-6 py-3">
          Show All Information
        </button>
      </div>
    </div>
  )
}