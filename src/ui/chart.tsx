import { useMemo } from "react";

import { BaseChart } from "./base-chart";

interface ChartProps {
  data: number[];
  maxDataPoints: number;
}

export const Chart = ({ data, maxDataPoints }: ChartProps) => {
  const preparedData = useMemo(() => {
    const points = data.map((point) => ({ value: point * 100 }));

    return [
      ...points,
      ...Array.from({ length: maxDataPoints - points.length }).map(() => ({
        value: undefined,
      })),
    ];
  }, [data, maxDataPoints]);

  return <BaseChart data={preparedData} />;
};
