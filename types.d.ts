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

type View = "CPU" | "RAM" | "STORAGE"

type EventPayloadMap = {
  stats: Stats;
  getStaticData: StaticData;
  changeView: View
};

type UnsubscribeFn = () => void;

interface Window {
  electron: {
    subscribeStats: (callback: (stats: Stats) => void) => UnsubscribeFn;
    getStaticData: () => Promise<StaticData>;
    subscribeChangeView: (callback: (view: View) => void) => UnsubscribeFn;

  };
}
