import { CalendarCheck, MessageCircle, UserRound } from 'lucide-react';
import type { UiPayload } from '../api';
import { useLang } from '../i18n/lang';
import LinkOrBox from '../components/LinkOrBox';

type Handover = { whatsapp_url?: string | null; email_url?: string | null };

type Confirmation = {
    consultation_reference?: string;
    name?: string;
    date?: string;
    time_range?: string;
    participants?: number;
};

/**
 * The few tool results worth showing as a card in the chat: a created
 * consultation and a hand-over to the team. Other results (search hits,
 * availability) are already summarised in the assistant's text.
 */
const ChatCards = ({ payloads, bookingUrl }: { payloads: UiPayload[]; bookingUrl: string }) => {
    const { lang, a } = useLang();

    return (
        <>
            {payloads.map((payload, index) => {
                if (payload.type === 'consultation_confirmation') {
                    const consultation = (payload.consultation ?? {}) as Confirmation;
                    const handover = (payload.handover ?? {}) as Handover;
                    const date = consultation.date
                        ? new Intl.DateTimeFormat(lang, { weekday: 'short', day: 'numeric', month: 'short' }).format(
                              new Date(`${consultation.date}T00:00:00`),
                          )
                        : '';

                    return (
                        <div key={index} className="mt-2 rounded-xl border border-fts-line bg-white p-3 text-sm">
                            <p className="flex items-center gap-2 font-semibold text-fts-green">
                                <CalendarCheck aria-hidden className="h-4 w-4" />
                                {a.chat.pending}
                            </p>
                            <p className="mt-1 text-fts-ink">
                                {a.chat.reference}: <span className="font-mono font-semibold text-fts-navy">{consultation.consultation_reference}</span>
                            </p>
                            <p className="text-fts-ink">
                                {[consultation.name, date, consultation.time_range].filter(Boolean).join(' · ')}
                            </p>
                            {handover.whatsapp_url && (
                                <LinkOrBox
                                    href={handover.whatsapp_url}
                                    newTab
                                    className="mt-2 inline-flex items-center gap-1.5 font-semibold text-fts-blue hover:underline"
                                >
                                    <MessageCircle aria-hidden className="h-4 w-4" />
                                    {a.chat.whatsapp}
                                </LinkOrBox>
                            )}
                        </div>
                    );
                }

                if (payload.type === 'handover') {
                    return (
                        <p key={index} className="mt-2 flex items-center gap-2 rounded-xl bg-fts-sky-soft px-3 py-2 text-sm text-fts-blue">
                            <UserRound aria-hidden className="h-4 w-4 shrink-0" />
                            {a.chat.handedOver}
                        </p>
                    );
                }

                if (payload.type === 'consultants_results' || payload.type === 'availability') {
                    return (
                        <a
                            key={index}
                            href={bookingUrl}
                            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-fts-blue hover:underline"
                        >
                            <CalendarCheck aria-hidden className="h-4 w-4" />
                            {a.chat.bookForm}
                        </a>
                    );
                }

                return null;
            })}
        </>
    );
};

export default ChatCards;
