// Types for api.js, used by the TypeScript landing page.
export function csrfToken(): string;

export function postJson(
    url: string,
    payload?: unknown,
    options?: { timeoutMs?: number | null },
): Promise<{ ok: boolean; status: number; body: any }>;

export function getJson(url: string, query?: Record<string, string>): Promise<{ ok: boolean; status: number; body: any }>;
