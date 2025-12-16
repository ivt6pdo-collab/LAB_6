import type {
  IFormAuth,
  LoginResponse,
  LoginResult,
} from "../../interfaces/forms";
import type { IUserInfo } from "../../interfaces/users";

export const login = async (payload: IFormAuth): Promise<LoginResult> => {
  const url = import.meta.env.VITE_API_URL;

  try {
    const res = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    let body: { data?: IUserInfo } | null = null;

    try {
      body = (await res.json()) as { data?: IUserInfo };
    } catch {
      body = null;
    }

    if (res.status === 200 && body?.data) {
      return {
        status: res.status,
        data: body.data,
      };
    }

    return {
      status: res.status,
      error: "Something went wrong!",
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong!";

    return { error: message, status: 400 };
  }
};
