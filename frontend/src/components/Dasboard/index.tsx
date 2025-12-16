import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import s from "./style.module.css";
import { fetchLocations } from "../../api/locations/locations";
import type { ILocation } from "../../interfaces/locations";
import {
  fetchSensor,
  fetchSensorsList,
  getData,
} from "../../api/sensors/sensors";
import type { ISensorInfo, ISensors } from "../../interfaces/sensors";

type MetricKey =
  | "co_ppm"
  | "humidity_pct"
  | "light_lux"
  | "no2_ppb"
  | "temperature_c"
  | "voltage_v";

const METRICS: { key: MetricKey; label: string; color: string }[] = [
  { key: "temperature_c", label: "Temperature, °C", color: "#34d399" },
  { key: "humidity_pct", label: "Humidity, %", color: "#60a5fa" },
  { key: "voltage_v", label: "Voltage, V", color: "#f97316" },
  { key: "co_ppm", label: "CO, ppm", color: "#facc15" },
  { key: "light_lux", label: "Light, lux", color: "#a855f7" },
  { key: "no2_ppb", label: "NO₂, ppb", color: "#f97316" },
];

export const Dashboard: React.FC = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<MetricKey[]>([
    "temperature_c",
  ]);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [sensorsList, setSensorsList] = useState<ISensors[]>([]);
  const [sensorId, setSensorId] = useState<number>(-1);
  const [sensorInfo, setSensorInfo] = useState<ISensorInfo[] | undefined>();
  const [locationId, setLocationId] = useState<number>(-1);
  const [timeFrom, setTimeFrom] = useState<string>("");
  const [timeTo, setTimeTo] = useState<string>("");
  const [viewData, setViewData] = useState<ISensorInfo[] | undefined>();

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  useEffect(() => {
    if (locationId != -1) {
      fetchSensorsList(locationId).then(setSensorsList);
    }
  }, [locationId]);

  useEffect(() => {
    if (sensorId != -1) {
      fetchSensor(sensorId).then(setSensorInfo);
    }
  }, [sensorId]);

  const toggleMetric = (metric: MetricKey) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  };

  const handleApplyFilters = async () => {
    try {
      const data = await getData(sensorId, timeFrom, timeTo);
      setViewData(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <header className={s.header}>
          <div>
            <h1 className={s.title}>Dashboard</h1>
            <p className={s.subtitle}>A quick overview of your measurements.</p>
          </div>
        </header>

        <section className={s.chartCard}>
          <div className={s.chartHeader}>
            <div>
              <h2 className={s.cardTitle}>Measurements</h2>
              <p className={s.cardText}>
                One flexible chart. Toggle metrics and change filters to explore
                data.
              </p>
            </div>

            <div className={s.chartFilters}>
              <div className={s.filterGroup}>
                <label>Location</label>
                <select
                  value={locationId}
                  onChange={(e) => setLocationId(Number(e.target.value))}
                >
                  <option value={-1}>-----||------</option>
                  {locations.map((location, id) => {
                    return (
                      <option key={id} value={location.id}>
                        {location.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className={s.filterGroup}>
                <label>Sensor</label>
                <select
                  value={sensorId}
                  onChange={(e) => setSensorId(Number(e.target.value))}
                >
                  <option value={-1}>-----||------</option>
                  {sensorsList.map((sensors, id) => {
                    return (
                      <option key={id} value={sensors.id}>
                        {sensors.code}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className={s.filterGroup}>
                <label>From</label>

                <select
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                >
                  <option value={-1}> YYYY-MM-DD HH:MM:SS"</option>
                  {sensorInfo?.map((sensor, id) => {
                    return (
                      <option key={id} value={sensor.ts}>
                        {sensor.ts}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className={s.filterGroup}>
                <label>To</label>
                <select
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                >
                  <option value={-1}> YYYY-MM-DD HH:MM:SS"</option>
                  {sensorInfo
                    ?.map((sensor, id) => {
                      return (
                        <option key={id} value={sensor.ts}>
                          {sensor.ts}
                        </option>
                      );
                    })
                    .reverse()}
                </select>
              </div>

              <button
                className={s.btnApply}
                onClick={handleApplyFilters}
                disabled={!(locationId && sensorId && timeFrom && timeTo)}
              >
                Apply
              </button>
            </div>
          </div>

          <div className={s.chartMetrics}>
            {METRICS.map((m) => (
              <button
                key={m.key}
                className={
                  selectedMetrics.includes(m.key)
                    ? `${s.metricToggle} ${s.metricToggleActive}`
                    : s.metricToggle
                }
                onClick={() => toggleMetric(m.key)}
              >
                <span
                  className={s.metricColorDot}
                  style={{ backgroundColor: m.color }}
                />
                {m.label}
              </button>
            ))}
          </div>

          <div className={s.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={viewData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="#1f2937" vertical={false} />
                <XAxis
                  dataKey="ts"
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickLine={false}
                  interval="preserveStartEnd"
                  minTickGap={40}
                />
                <YAxis
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid #1f2937",
                    borderRadius: 8,
                    color: "#e5e7eb",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ color: "#9ca3af" }} />
                {METRICS.filter((m) => selectedMetrics.includes(m.key)).map(
                  (m) => (
                    <Line
                      key={m.key}
                      type="step"
                      dataKey={m.key}
                      name={m.label}
                      stroke={m.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  )
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
