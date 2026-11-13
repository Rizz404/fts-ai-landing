import { useCallback, useEffect, useRef, useState } from 'react';
import { api, chatToken, landingConfig, type ChatMessage, type ConversationStatus } from '../api';
import type { Lang } from '../i18n/lang';

export type ChatError = 'failed' | 'busy' | null;

const HANDOVER_POLL_MS = 4000;

/**
 * The conversation with the AI Consultant: one guest token per browser (kept in
 * localStorage), history restored on open, and polling for staff replies once
 * the conversation has been handed over.
 */
export function useChat(lang: Lang, open: boolean) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [status, setStatus] = useState<ConversationStatus>('active');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<ChatError>(null);
    const [lastFailed, setLastFailed] = useState<string | null>(null);
    const booted = useRef(false);

    const ensureToken = useCallback(async (): Promise<string | null> => {
        const existing = chatToken.get();
        if (existing) return existing;

        const result = await api.startChat(lang);
        if (!result.ok) return null;
        chatToken.set(result.body.guest_token);
        return result.body.guest_token;
    }, [lang]);

    const loadHistory = useCallback(async (token: string) => {
        const result = await api.history(token);
        if (!result.ok) return false;
        setMessages(result.body.messages);
        setStatus(result.body.status);
        return true;
    }, []);

    useEffect(() => {
        if (!open || booted.current || !landingConfig) return;
        booted.current = true;

        const token = chatToken.get();
        if (token) {
            loadHistory(token)
                .catch(() => false)
                .then((loaded) => {
                    if (!loaded) chatToken.clear();
                });
        }
    }, [open, loadHistory]);

    useEffect(() => {
        if (!open || status !== 'handed_over') return;
        const token = chatToken.get();
        if (!token) return;

        const timer = window.setInterval(() => {
            loadHistory(token).catch(() => undefined);
        }, HANDOVER_POLL_MS);
        return () => window.clearInterval(timer);
    }, [open, status, loadHistory]);

    const send = useCallback(
        async (text: string) => {
            const message = text.trim();
            if (!message || sending) return;

            setError(null);
            setLastFailed(null);
            setSending(true);
            const pendingId = `pending-${Date.now()}`;
            setMessages((current) => [...current, { id: pendingId, role: 'guest', content: message, ui_payload: null }]);

            try {
                let token = await ensureToken();
                if (!token) throw new Error('no token');

                let result = await api.sendMessage(token, message, {});
                if (result.status === 422 && result.body && 'errors' in result.body) {
                    // The stored conversation is gone (e.g. database reset): start over once.
                    chatToken.clear();
                    token = await ensureToken();
                    if (!token) throw new Error('no token');
                    result = await api.sendMessage(token, message, {});
                }

                if (!result.ok) {
                    setMessages((current) => current.filter((m) => m.id !== pendingId));
                    setLastFailed(message);
                    setError(result.status === 429 ? 'busy' : 'failed');
                    return;
                }

                setMessages((current) => [
                    ...current.map((m) => (m.id === pendingId ? { ...m, id: `${pendingId}-sent` } : m)),
                    result.body.message,
                ]);
                setStatus(result.body.status);
            } catch {
                setMessages((current) => current.filter((m) => m.id !== pendingId));
                setLastFailed(message);
                setError('failed');
            } finally {
                setSending(false);
            }
        },
        [ensureToken, sending],
    );

    const reset = useCallback(() => {
        chatToken.clear();
        setMessages([]);
        setStatus('active');
        setError(null);
        setLastFailed(null);
    }, []);

    return { messages, status, sending, error, lastFailed, send, reset, available: !!landingConfig };
}
