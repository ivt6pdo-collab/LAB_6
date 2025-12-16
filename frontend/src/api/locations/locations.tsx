import type { ILocation } from "../../interfaces/locations";
import type { IRes } from "../../interfaces/response";

export const fetchLocations = async (): Promise<ILocation[]> => {
  const url = import.meta.env.VITE_API_URL;

  const res = await fetch(`${url}/api/locations/all`, {
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
  const body: IRes<ILocation[]> = await res.json();
  return body.data;
};
