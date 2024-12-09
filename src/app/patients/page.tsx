"use client";
import Card from "@/components/card";
import Icon from "@/components/icon";

export default function Patients() {
  return (
    <Card className="flex-grow" header="Patient Info">
      <div className="h-60 flex flex-col items-center justify-center p-3 gap-4">
        <Icon icon="user-heart" width="100" height="100" />
        <p className="text-center text-lg text-slate-500">Select a patient to see their details</p>
      </div>
    </Card>
  );
}
