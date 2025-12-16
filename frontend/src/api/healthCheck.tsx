export const healthCheck = async (): Promise<string | boolean | undefined> => {
  const url = import.meta.env.VITE_API_URL;
  try {
    const res = await fetch(`${url}/api/health_check`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.log(data);
      throw new Error((data as any).message || "Помилка запиту");
    }
  } catch (err) {
    return false;
  }
};
