import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Icon from "@/components/icon";
import { type Patient } from "@/types";
import { SwitchCase, SwitchCaseItem } from '@/components/switchcase';
import { type ChartsAxisData } from "@mui/x-charts";


interface DiagnosisHistoryProps {
  history: Patient["diagnosis_history"];
}

export default function DiagnosisHistory({ history }: DiagnosisHistoryProps) {
  
  const sortedHistory = history.sort(
    (a, b) =>
      new Date(`${a.year}-${a.month}`).getTime() - new Date(`${b.year}-${b.month}`).getTime()
  );

  const [hoveredPoint, setHoveredPoint] = useState(sortedHistory[0]);

  useEffect(() => {
    setHoveredPoint(sortedHistory[0]);
  }, [sortedHistory]);

  const bloodPressureSystolic = sortedHistory.map(
    (item) => item.blood_pressure.systolic.value
  );
  const bloodPressureDiastolic = sortedHistory.map(
    (item) => item.blood_pressure.diastolic.value
  );

  const xAxis = sortedHistory.map((_, index) => index);
  const labels = sortedHistory.map(
    (item) => `${item.month.substring(0, 3)}, ${item.year}`
  );

  const handleAxisClick = (event: MouseEvent, data: ChartsAxisData | null) => {
    const index: number = data?.dataIndex ?? 0;
    setHoveredPoint(sortedHistory[index]);
  }

  return (
    <div className="p-3 grid gap-5">
      <div className="bg-[--unnamed-color-f4f0fe] rounded-[12px] p-3 grid grid-cols-6 gap-5">
        <div className="col-span-4">
          <header className="flex items-center justify-between">
            <h4 className="inner-card-title-18pt">Blood Pressure</h4>
            <div className="flex items-center gap-2">
              <p>Last 6 months</p>
              <Icon icon="expand-more" />
            </div>
          </header>

          <div>
            <LineChart
              xAxis={[
                {
                  data: xAxis,
                  valueFormatter: (index: number) => labels[index], // Format x-axis labels
                },
              ]}
              series={[
                {
                  data: bloodPressureSystolic,
                  color: "#E66FD2",
                  label: "Systolic"
                },
                {
                  data: bloodPressureDiastolic,
                  color: "#8C6FE6",
                  label: "Diastolic"
                },
              ]}
              height={220}
              onAxisClick={handleAxisClick}
            />
          </div>
        </div>

        <div className="col-span-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 aspect-square rounded-full bg-[--unnamed-color-e66fd2]"></div>
              <p className="font-bold">Systolic</p>
            </div>
            <p className="font-bold text-[22px]">{hoveredPoint.blood_pressure.systolic.value}</p>
            <div className="flex items-center gap-2 mt-2">
              <SwitchCase case={hoveredPoint.blood_pressure.systolic.levels.toLowerCase()}>
                <SwitchCaseItem value="higher than average">
                  <Icon icon="arrow-up" />
                </SwitchCaseItem>
                <SwitchCaseItem value="lower than average">
                  <Icon icon="arrow-down" />
                </SwitchCaseItem>
              </SwitchCase>
              <p>{hoveredPoint.blood_pressure.systolic.levels}</p>
            </div>
          </div>

          <hr className="my-5 border-[#CBC8D4]" />

          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 aspect-square rounded-full bg-[--unnamed-color-8c6fe6]"></div>
              <p className="font-bold">Diastolic</p>
            </div>
            <p className="font-bold text-[22px]">{hoveredPoint.blood_pressure.diastolic.value}</p>
            <div className="flex items-center gap-2 mt-2">
              <SwitchCase case={hoveredPoint.blood_pressure.diastolic.levels.toLowerCase()}>
                <SwitchCaseItem value="higher than average">
                  <Icon icon="arrow-up" />
                </SwitchCaseItem>
                <SwitchCaseItem value="lower than average">
                  <Icon icon="arrow-down" />
                </SwitchCaseItem>
              </SwitchCase>
              <p>{hoveredPoint.blood_pressure.diastolic.levels}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="bg-[--unnamed-color-e0f3fa] p-3 rounded-[12px]">
          <Icon icon="respiratory-rate" />
          <div className="mt-5">
            <p className="font-medium text-[16px]">Respiratory Rate</p>
            <p className="font-bold text-[30px]">
              {hoveredPoint.respiratory_rate.value} bpm
            </p>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <SwitchCase case={hoveredPoint.respiratory_rate.levels.toLowerCase()}>
              <SwitchCaseItem value="higher than average">
                <Icon icon="arrow-up" />
              </SwitchCaseItem>
              <SwitchCaseItem value="lower than average">
                <Icon icon="arrow-down" />
              </SwitchCaseItem>
            </SwitchCase>
            <p>{hoveredPoint.respiratory_rate.levels}</p>
          </div>
        </div>

        <div className="bg-[--unnamed-color-ffe6ep] p-3 rounded-[12px]">
          <Icon icon="temperature" />
          <div className="mt-5">
            <p className="font-medium text-[16px]">Temperature</p>
            <p className="font-bold text-[30px]">
              {hoveredPoint.temperature.value}&deg;F
            </p>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <SwitchCase case={hoveredPoint.temperature.levels.toLowerCase()}>
              <SwitchCaseItem value="higher than average">
                <Icon icon="arrow-up" />
              </SwitchCaseItem>
              <SwitchCaseItem value="lower than average">
                <Icon icon="arrow-down" />
              </SwitchCaseItem>
            </SwitchCase>
            <p>{hoveredPoint.temperature.levels}</p>
          </div>
        </div>

        <div className="bg-[--unnamed-color-ffE6f1] p-3 rounded-[12px]">
          <Icon icon="heart-bpm" />
          <div className="mt-5">
            <p className="font-medium text-[16px]">Heart Rate</p>
            <p className="font-bold text-[30px]">
              {hoveredPoint.heart_rate.value} bpm
            </p>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <SwitchCase case={hoveredPoint.heart_rate.levels.toLowerCase()}>
              <SwitchCaseItem value="higher than average">
                <Icon icon="arrow-up" />
              </SwitchCaseItem>
              <SwitchCaseItem value="lower than average">
                <Icon icon="arrow-down" />
              </SwitchCaseItem>
            </SwitchCase>
            <p>{hoveredPoint.heart_rate.levels}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
