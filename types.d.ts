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

type UnsubscribeFn = () => void;

interface Window {
  electron: {
    subscribeToStats: (callback: (stats: Stats) => void) => UnsubscribeFn;
    getStaticData: () => Promise<StaticData>;
  };
}
