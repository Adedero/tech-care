import type { Patient } from "@/types";

interface DiagonsticListProps {
  list: Patient["diagnostic_list"]
}

export default function DiagnosticList ({ list }: DiagonsticListProps) {
  return (
    <div className="p-3">
      <table className="min-w-0 w-full">
        <thead className="text-left">
          <tr className="bg-[--background] body-emphasized-14pt *:p-3">
            <th className="rounded-l-full">Problem/Diagnosis</th>
            <th>Description</th>
            <th className="rounded-r-full">Status</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item, index) => (
            <tr key={index} className={`*:p-3 ${index === (list.length - 1) ? '' : '*:border-b *:border-[--background]'}`}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}