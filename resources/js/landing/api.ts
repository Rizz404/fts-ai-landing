// Typed access to the Laravel endpoints the landing page uses (chat + consultation booking).
// The request helpers are the same ones the admin bundle uses (resources/js/shared/api.js).
import { getJson, postJson } from '../shared/api.js';

type Endpoints = {
    chatStart: string;
    chatMessage: string;
    chatHistory: string;
    consultationOptions: string;
    consultationQuote: string;
    consultationStore: string;
};

type LandingConfig = { companySlug: string; endpoints: Endpoints } | null;

declare global {
    interface Window {
        FTS_LANDING?: LandingConfig;
        // Which page the server rendered (routes/web.php).
        FTS_PAGE?: 'home' | 'consultation';
    }
}

export const landingConfig: LandingConfig = window.FTS_LANDING ?? null;

export type ApiResult<T> = { ok: boolean; status: number; body: T };

export type ChatRole = 'guest' | 'assistant' | 'staff' | 'system';

export type UiPayload = { type: string; [key: string]: unknown };

export type ChatMessage = {
    id: number | string;
    role: ChatRole;
    content: string | null;
    ui_payload: UiPayload[] | null;
    created_at?: string;
};

export type ConversationStatus = 'active' | 'handed_over' | 'closed';

export type ConsultationOptions = {
    timezone: string;
    max_participants: number;
    days: { date: string; slots: { time_slot: string; time_range: string; consultants: string[] }[] }[];
    consultants: { slug: string; name: string; description: string | null }[];
    services: { slug: string; name: string }[];
    goals: string[];
};

export type ConsultationRequest = {
    consultation_date: string;
    time_slot: string;
    participants: number;
    consultant_slug: string;
    goal: string | null;
    service_slug: string | null;
    client_name: string;
    contact_type: 'whatsapp' | 'phone' | 'email';
    contact_value: string;
    special_request: string;
    locale: string;
    guest_token?: string;
};

export type ConsultationCreated = {
    reference: string;
    status: string;
    handover: { whatsapp_url: string | null; phone_url: string | null; email_url: string | null };
};

export type ValidationFailure = {
    message?: string;
    errors?: Record<string, string[]>;
    alternatives?: ({ type: 'slot'; time_slot: string; name: string } | { type: 'area'; slug: string; name: string })[];
};

// Long enough for a slow model turn (the server caps a reply at 85 s), shorter than Cloudflare's 100 s.
const CHAT_TIMEOUT_MS = 95_000;

const tokenKey = () => `fts_ai_chat_token_${landingConfig?.companySlug ?? 'none'}`;

export const chatToken = {
    get: (): string | null => {
        try {
            return localStorage.getItem(tokenKey());
        } catch {
            return null;
        }
    },
    set: (token: string) => {
        try {
            localStorage.setItem(tokenKey(), token);
        } catch {
            /* storage unavailable: the chat works for this page view only */
        }
    },
    clear: () => {
        try {
            localStorage.removeItem(tokenKey());
        } catch {
            /* nothing to clear */
        }
    },
};

const endpoints = () => {
    if (!landingConfig) throw new Error('Landing config missing');
    return landingConfig.endpoints;
};

export const api = {
    startChat: (locale: string) =>
        postJson(endpoints().chatStart, { locale }) as Promise<ApiResult<{ guest_token: string; locale: string }>>,

    history: (guestToken: string) =>
        getJson(endpoints().chatHistory, { guest_token: guestToken }) as Promise<
            ApiResult<{ messages: ChatMessage[]; status: ConversationStatus }>
        >,

    sendMessage: (guestToken: string, message: string, context: Record<string, unknown>) =>
        postJson(
            endpoints().chatMessage,
            { guest_token: guestToken, message, scene: 'home', ...context },
            { timeoutMs: CHAT_TIMEOUT_MS },
        ) as Promise<ApiResult<{ message: ChatMessage; status: ConversationStatus; error?: string }>>,

    consultationOptions: (locale: string) =>
        getJson(endpoints().consultationOptions, { lang: locale }) as Promise<ApiResult<ConsultationOptions>>,

    createConsultation: (request: ConsultationRequest) =>
        postJson(endpoints().consultationStore, request) as Promise<ApiResult<ConsultationCreated & ValidationFailure>>,
};
