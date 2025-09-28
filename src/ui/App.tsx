import { useEffect, useMemo, useState } from "react";

import "./App.css";
import { useStats } from "./use-stats";
import { Chart } from "./chart";

function App() {
  const stats = useStats(10);
  const [activeView, setActiveView] = useState<View>('CPU')

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

  const activeUsages = useMemo(() => {
    switch (activeView) {
      case 'CPU':
        return cpuUsages;
      case 'RAM':
        return ramUsages;
      case 'STORAGE':
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages])


  useEffect(() => {
    async function getData() {
      const data = await window.electron.getStaticData();
      console.log(data);
    }

    getData();
  }, []);

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view))
  }, [])

  return (
    <div style={{ height: 120 }}>
      <Chart data-testid='chart' data={activeUsages} maxDataPoints={10} />
    </div>
  );
}

export default App;
