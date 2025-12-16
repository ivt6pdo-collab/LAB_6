import type { IRes } from "../../interfaces/response";
import type { ISensorInfo, ISensors } from "../../interfaces/sensors";

export const fetchSensorsList = async (
  location_id: number
): Promise<ISensors[]> => {
  const url = import.meta.env.VITE_API_URL;
  

  const res = await fetch(`${url}/api/sensors/all/location/${location_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch locations: ${res.status} ${res.statusText}`
    );
  }
  const body: IRes<ISensors[]> = await res.json();
  return body.data;
};

export const fetchSensor = async (
  sensor_id: number
): Promise<ISensorInfo[]> => {
  const url = import.meta.env.VITE_API_URL;

  const res = await fetch(`${url}/api/sensors/sensor/${sensor_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch locations: ${res.status} ${res.statusText}`
    );
  }
  const body: IRes<ISensorInfo[]> = await res.json();
  return body.data;
};

export const getData = async (
  sensor_id: number,
  time_from: string,
  time_to: string
): Promise<ISensorInfo[]> => {
  const url = import.meta.env.VITE_API_URL;

  const res = await fetch(
    `${url}/api/sensors/sensor?sensor_id=${sensor_id}&time_from=${time_from}&time_to=${time_to}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch locations: ${res.status} ${res.statusText}`
    );
  }
  const body: IRes<ISensorInfo[]> = await res.json();
  return body.data;
};
