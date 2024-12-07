import Card from "@/components/card";

export default function Loader () {
  return (
    <div className="flex-grow min-h-0 flex gap-5">
      <Card className="h-full max-h-full w-[25%] max-w-[367px]" header="Patients" headerIcon="search">
        <div className="overflow-y-auto h-[calc(100%-5rem)] p-3">
          {(Array.from({ length: 6 }, (_, index) => index)).map((_, idx) => (
            <div key={idx} className="p-7 bg-slate-100 mb-4 rounded-md"></div>
          ))}
        </div>
      </Card>

      <div className="h-full overflow-y-auto flex-grow flex flex-col gap-5">
        <Card header="Diagnosis History"></Card>
        <Card header="Diagnostic List"></Card>
      </div>

      
      <div className="h-full w-[25%] max-w-[367px] overflow-y-auto flex flex-col gap-5">
        <Card header="Patient">
        </Card>
        <Card header="Lab Results"></Card>
      </div>
    </div>
  )
}