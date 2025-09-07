import { useEffect, useMemo } from "react";

import "./App.css";
import { useStats } from "./use-stats";
import { Chart } from "./chart";

function App() {
  const stats = useStats(10);

  const storageUsages = useMemo(
    () => stats.map((stats) => stats.storageUsage),
    [stats]
  );

  const cpuUsages = useMemo(
    () => stats.map((stats) => stats.cpuUsage),
    [stats]
  );

  const ramUsages = useMemo(
    () => stats.map((stats) => stats.ramUsage),
    [stats]
  );

  console.log(stats);

  useEffect(() => {
    async function getData() {
      const data = await window.electron.getStaticData();
      console.log(data);
    }

    getData();
  }, []);

  return (
    <>
      <div>CPU usage:</div>
      <div style={{ height: 120 }}>
        <Chart data={cpuUsages} maxDataPoints={10} />
      </div>

      <div>RAM usage:</div>
      <div style={{ height: 120 }}>
        <Chart data={ramUsages} maxDataPoints={10} />
      </div>

      <div>Disc usage:</div>
      <div style={{ height: 120 }}>
        <Chart data={storageUsages} maxDataPoints={10} />
      </div>
    </>
  );
}

export default App;
