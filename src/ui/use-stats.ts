import { useEffect, useState } from "react";

export function useStats(dataPointCount: number) {
  const [values, setValues] = useState<Stats[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeToStats((stats) => {
      setValues((prev) => {
        const newData = [...prev, stats];

        if (newData.length > dataPointCount) {
          newData.shift();
        }

        return newData;
      });
    });

    return unsub;
  }, []);

  return values;
}
