const BASE_URL = 'https://api.quran.com/api/v4';
const TIMEOUT  = 10_000;

class QuranApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'QuranApiError';
  }
}

async function request<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new QuranApiError(res.status, `API error ${res.status}: ${res.statusText}`);
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export const quranClient = { request };
export { QuranApiError };
