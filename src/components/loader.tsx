import Card from "@/components/card";

export default function Loader () {
  return (
    <div className="flex-grow min-h-0 flex gap-5">
      <Card className="h-full max-h-full w-[25%] max-w-[367px]" header="Patients" headerIcon="search">
        <div className="overflow-y-auto h-[calc(100%-5rem)] p-3">
          {(Array.from({ length: 7 }, (_, index) => index)).map((_, idx) => (
            <div key={idx} className="p-7 bg-slate-200 mb-4 rounded-md"></div>
          ))}
        </div>
      </Card>

      <div className="h-full overflow-y-auto flex-grow flex flex-col gap-5 *:flex-shrink-0">
        <Card header="Diagnosis History">
          <div className="grid grid-cols-3 gap-3 p-3 *:rounded-[12px]">
            <div className="col-span-3 bg-slate-200 h-40"></div>
            <div className="bg-slate-200 h-40"></div>
            <div className="bg-slate-200 h-40"></div>
            <div className="bg-slate-200 h-40"></div>
          </div>
        </Card>
        <Card header="Diagnostic List">
          <div className="grid gap-3 p-3 *:rounded-[12px]">
            <div className="bg-slate-200 h-20"></div>
            <div className="bg-slate-200 h-20"></div>
          </div>
        </Card>
      </div>

      
      <div className="h-full w-[25%] max-w-[367px] overflow-y-auto flex flex-col gap-5">
        <Card header="Patient">
          <div className="p-3 flex flex-col items-center gap-5">
            <div className="w-[200px] h-[200px] rounded-full bg-slate-200"></div>
              <div className="grid gap-3 p-3 *:rounded-[12px]">
              <div className="bg-slate-200 h-20"></div>
              <div className="bg-slate-200 h-20"></div>
            </div>
          </div>
        </Card>
        
      </div>
    </div>
  )
}