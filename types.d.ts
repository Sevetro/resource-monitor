type Stats = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type EventPayloadMap = {
  stats: Stats;
  getStaticData: StaticData;
};

interface Window {
  electron: {
    subscribeToStats: (callback: (stats: Stats) => void) => void;
    getStaticData: () => Promise<StaticData>;
  };
}
