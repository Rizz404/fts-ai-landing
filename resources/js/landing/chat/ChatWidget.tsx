import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CalendarCheck, RotateCcw, Send, X } from 'lucide-react';
import { renderChatText } from '../../shared/chat-text.js';
import { ftsLogo, links, pageUrl } from '../content/links';
import { useLang } from '../i18n/lang';
import ChatCards from './ChatCards';
import { useChat } from './useChat';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const Avatar = ({ size = 'h-9 w-9' }: { size?: string }) => (
    <span className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-fts-line`}>
        <img src={ftsLogo} alt="" width={24} height={24} className="h-3/5 w-3/5 object-contain" />
    </span>
);

/**
 * The AI Consultant: a launcher button and a chat drawer (bottom sheet on phones).
 * Talks to the same assistant backend as the other FTS demos, with tools for the
 * knowledge base, services and consultation booking.
 */
const ChatWidget = ({ open, onOpenChange }: Props) => {
    const { lang, a } = useLang();
    const chat = useChat(lang, open);
    const [draft, setDraft] = useState('');
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const launcherRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, [chat.messages, chat.sending, chat.error]);

    useEffect(() => {
        if (open) inputRef.current?.focus({ preventScroll: true });
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onOpenChange(false);
                launcherRef.current?.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onOpenChange]);

    const submit = (event?: FormEvent) => {
        event?.preventDefault();
        if (!draft.trim()) return;
        chat.send(draft);
        setDraft('');
    };

    const bookingUrl = pageUrl('/consultation', lang);

    const empty = chat.messages.length === 0;

    return (
        <>
            {!open && (
                <button
                    ref={launcherRef}
                    type="button"
                    onClick={() => onOpenChange(true)}
                    className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-fts-navy py-2 pl-2 pr-5 font-semibold text-white shadow-[0_16px_32px_-12px_rgba(16,35,66,0.6)] transition hover:bg-fts-blue sm:bottom-6 sm:right-6"
                >
                    <Avatar />
                    <span className="hidden sm:inline">{a.chat.open}</span>
                    <span className="sm:hidden">{a.chat.openShort}</span>
                    <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-400" />
                </button>
            )}

            {open && (
                <section
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="chat-title"
                    className="fixed inset-x-0 bottom-0 z-50 flex h-[85dvh] flex-col overflow-hidden rounded-t-3xl border border-fts-line bg-fts-mist shadow-[0_24px_64px_-16px_rgba(16,35,66,0.5)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-3xl"
                >
                    <header className="flex items-center gap-3 border-b border-fts-line bg-white px-4 py-3">
                        <Avatar size="h-10 w-10" />
                        <div className="min-w-0 flex-1">
                            <h2 id="chat-title" className="truncate font-bold">
                                {a.chat.title}
                            </h2>
                            <p className="truncate text-xs text-fts-ink">{a.chat.subtitle}</p>
                        </div>
                        {!empty && (
                            <button
                                type="button"
                                onClick={chat.reset}
                                className="rounded-full p-2 text-fts-ink hover:bg-fts-mist hover:text-fts-navy"
                                aria-label={a.chat.newChat}
                                title={a.chat.newChat}
                            >
                                <RotateCcw aria-hidden className="h-4 w-4" />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="rounded-full p-2 text-fts-ink hover:bg-fts-mist hover:text-fts-navy"
                            aria-label={a.chat.close}
                        >
                            <X aria-hidden className="h-5 w-5" />
                        </button>
                    </header>

                    <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
                        {!chat.available ? (
                            <p className="rounded-2xl bg-white p-4 text-sm text-fts-ink">
                                {a.chat.unavailable}{' '}
                                <a href={links.contact} className="font-semibold text-fts-blue underline">
                                    fts-tech.co.id/contact
                                </a>
                            </p>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <Avatar size="h-7 w-7" />
                                    <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed">
                                        {a.chat.greeting}
                                    </p>
                                </div>

                                {chat.messages.map((message) =>
                                    message.role === 'guest' ? (
                                        <p
                                            key={message.id}
                                            className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-fts-navy px-3.5 py-2.5 text-sm leading-relaxed text-white"
                                        >
                                            {message.content}
                                        </p>
                                    ) : (
                                        <div key={message.id} className="flex gap-2">
                                            <Avatar size="h-7 w-7" />
                                            <div className="max-w-[85%]">
                                                {message.role === 'staff' && (
                                                    <p className="mb-1 text-xs font-semibold text-fts-sky-strong">{a.chat.staff}</p>
                                                )}
                                                {message.content && (
                                                    <div
                                                        className="chat-text rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed"
                                                        // renderChatText escapes the text before adding its own minimal markup.
                                                        dangerouslySetInnerHTML={{ __html: renderChatText(message.content) }}
                                                    />
                                                )}
                                                {message.ui_payload && (
                                                    <ChatCards payloads={message.ui_payload} bookingUrl={bookingUrl} />
                                                )}
                                            </div>
                                        </div>
                                    ),
                                )}

                                {chat.sending && (
                                    <div className="flex items-center gap-2 text-sm text-fts-ink">
                                        <Avatar size="h-7 w-7" />
                                        <span className="inline-flex gap-1" aria-label={a.chat.thinking}>
                                            {[0, 1, 2].map((dot) => (
                                                <span
                                                    key={dot}
                                                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-fts-ink motion-reduce:animate-none"
                                                    style={{ animationDelay: `${dot * 150}ms` }}
                                                />
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {chat.error && (
                                    <div role="alert" className="rounded-2xl border border-fts-red/30 bg-white p-3 text-sm">
                                        <p>{chat.error === 'busy' ? a.chat.errorBusy : a.chat.error}</p>
                                        {chat.lastFailed && (
                                            <button
                                                type="button"
                                                onClick={() => chat.send(chat.lastFailed!)}
                                                className="mt-2 font-semibold text-fts-blue hover:underline"
                                            >
                                                {a.chat.retry}
                                            </button>
                                        )}
                                    </div>
                                )}

                                {empty && !chat.sending && (
                                    <div className="flex flex-wrap gap-2 pl-9">
                                        {a.chat.suggestions.map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                type="button"
                                                onClick={() => chat.send(suggestion)}
                                                className="rounded-full border border-fts-line bg-white px-3 py-1.5 text-left text-xs font-medium text-fts-navy hover:border-fts-sky"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {chat.available && (
                        <form onSubmit={submit} className="border-t border-fts-line bg-white px-3 pb-3 pt-2">
                            {chat.status === 'handed_over' && (
                                <p className="mb-2 text-xs text-fts-sky-strong">{a.chat.handedOver}</p>
                            )}
                            <div className="flex items-end gap-2">
                                <label className="sr-only" htmlFor="chat-input">
                                    {a.chat.placeholder}
                                </label>
                                <textarea
                                    id="chat-input"
                                    ref={inputRef}
                                    value={draft}
                                    onChange={(event) => setDraft(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                                            event.preventDefault();
                                            submit();
                                        }
                                    }}
                                    rows={1}
                                    maxLength={2000}
                                    placeholder={a.chat.placeholder}
                                    className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-fts-line bg-fts-mist px-3.5 py-2.5 text-sm focus:border-fts-sky focus:bg-white"
                                />
                                <button
                                    type="submit"
                                    disabled={!draft.trim() || chat.sending}
                                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fts-sky-strong text-white transition hover:bg-fts-blue disabled:opacity-40"
                                    aria-label={a.chat.send}
                                >
                                    <Send aria-hidden className="h-4 w-4" />
                                </button>
                            </div>
                            <p className="mt-1.5 flex items-center justify-between gap-2 text-[11px] text-fts-ink">
                                <span>{a.chat.disclaimer}</span>
                                <a href={bookingUrl} className="shrink-0 font-semibold text-fts-blue hover:underline">
                                    <CalendarCheck aria-hidden className="mr-1 inline h-3 w-3" />
                                    {a.chat.bookForm}
                                </a>
                            </p>
                        </form>
                    )}
                </section>
            )}
        </>
    );
};

export default ChatWidget;
