import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { CalendarCheck, Check, MessageCircle } from 'lucide-react';
import { api, chatToken, landingConfig, type ConsultationCreated, type ConsultationOptions, type ValidationFailure } from '../api';
import { character } from '../content/character';
import { useLang } from '../i18n/lang';

type ContactType = 'whatsapp' | 'phone' | 'email';

const PHONE_PATTERN = /^\+?[0-9\s\-().]{6,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Fieldset = ({ legend, children }: { legend: string; children: ReactNode }) => (
    <fieldset className="min-w-0 rounded-2xl border border-fts-line bg-white p-4 sm:p-5">
        <legend className="px-1 text-sm font-bold text-fts-navy">{legend}</legend>
        <div className="mt-2 space-y-4">{children}</div>
    </fieldset>
);

const inputClass =
    'mt-1.5 block w-full rounded-xl border border-fts-line bg-white px-3.5 py-2.5 text-sm text-fts-navy focus:border-fts-sky';

/**
 * Consultation booking with the FTS team. Availability comes from the server and is
 * checked again on submit; the request stays pending until an admin confirms it.
 */
const Booking = ({ onAskAi }: { onAskAi: () => void }) => {
    const { lang, a } = useLang();
    const b = a.booking;

    const [options, setOptions] = useState<ConsultationOptions | null>(null);
    const [loadError, setLoadError] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [consultant, setConsultant] = useState('');
    const [goal, setGoal] = useState('');
    const [service, setService] = useState('');
    const [participants, setParticipants] = useState(1);
    const [name, setName] = useState('');
    const [contactType, setContactType] = useState<ContactType>('whatsapp');
    const [contactValue, setContactValue] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [alternatives, setAlternatives] = useState<ValidationFailure['alternatives']>([]);
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState<ConsultationCreated | null>(null);

    const load = () => {
        if (!landingConfig) {
            setLoadError(true);
            return;
        }
        setLoadError(false);
        api.consultationOptions(lang)
            .then((result) => {
                if (!result.ok) throw new Error('options');
                setOptions(result.body);
            })
            .catch(() => setLoadError(true));
    };

    useEffect(load, [lang]);

    const day = options?.days.find((candidate) => candidate.date === date) ?? null;
    const slot = day?.slots.find((candidate) => candidate.time_slot === time) ?? null;
    const availableTeams = useMemo(
        () => options?.consultants.filter((team) => !slot || slot.consultants.includes(team.slug)) ?? [],
        [options, slot],
    );

    useEffect(() => {
        if (options && !date && options.days.length > 0) setDate(options.days[0].date);
    }, [options, date]);

    useEffect(() => {
        if (time && day && !day.slots.some((candidate) => candidate.time_slot === time)) setTime('');
    }, [day, time]);

    useEffect(() => {
        if (availableTeams.length && !availableTeams.some((team) => team.slug === consultant)) {
            setConsultant(availableTeams[0].slug);
        }
    }, [availableTeams, consultant]);

    const dayLabel = (iso: string) =>
        new Intl.DateTimeFormat(lang, { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(`${iso}T00:00:00`));

    const validate = (): string | null => {
        if (!date || !time) return b.pickSlot;
        if (!name.trim()) return b.invalidName;
        if (contactType === 'email' ? !EMAIL_PATTERN.test(contactValue.trim()) : !PHONE_PATTERN.test(contactValue.trim())) {
            return contactType === 'email' ? b.invalidEmail : b.invalidPhone;
        }
        return null;
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        if (sending) return;
        setAlternatives([]);

        const problem = validate();
        if (problem) {
            setError(problem);
            return;
        }

        setError(null);
        setSending(true);
        try {
            const result = await api.createConsultation({
                consultation_date: date,
                time_slot: time,
                participants,
                consultant_slug: consultant,
                goal: goal || null,
                service_slug: service || null,
                client_name: name.trim(),
                contact_type: contactType,
                contact_value: contactValue.trim(),
                special_request: notes.trim(),
                locale: lang,
                guest_token: chatToken.get() ?? undefined,
            });

            if (result.ok) {
                setDone(result.body);
                return;
            }

            const firstError = result.body.errors ? Object.values(result.body.errors)[0]?.[0] : null;
            setError(firstError ?? result.body.message ?? b.errorGeneric);
            setAlternatives(result.body.alternatives ?? []);
            if (result.status === 422) load();
        } catch {
            setError(b.errorNetwork);
        } finally {
            setSending(false);
        }
    };

    const reset = () => {
        setDone(null);
        setTime('');
        setNotes('');
        load();
    };

    return (
        <section id="booking" aria-labelledby="booking-title" className="min-h-[calc(100dvh-4rem)] bg-fts-mist py-10 md:py-16">
            <div className="mx-auto grid max-w-page grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:px-8">
                <div className="min-w-0">
                    <p className="eyebrow">{b.eyebrow}</p>
                    <h1 id="booking-title" className="mt-2 text-[1.75rem] font-bold tracking-tight sm:text-4xl">
                        {b.title}
                    </h1>
                    <p className="mt-3 text-base leading-relaxed text-fts-ink sm:text-lg">{b.lead}</p>
                    <ul className="mt-6 space-y-2 text-sm font-medium text-fts-navy">
                        {b.points.map((point) => (
                            <li key={point} className="flex items-center gap-2">
                                <Check aria-hidden className="h-4 w-4 text-fts-green" />
                                {point}
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        onClick={onAskAi}
                        className="mt-6 inline-flex items-start gap-2 text-left text-sm font-semibold text-fts-blue hover:underline"
                    >
                        <MessageCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                        {b.askAi}
                    </button>
                    {/* Desktop only: the form is long, so the character fills the side column. */}
                    <img
                        src={character.tablet.src}
                        alt={a.chat.characterAlt}
                        width={character.tablet.width}
                        height={character.tablet.height}
                        loading="lazy"
                        className="mt-8 hidden w-full max-w-[300px] lg:block"
                    />
                </div>

                <div className="min-w-0">
                    {done ? (
                        <div role="status" className="rounded-3xl border border-fts-line bg-white p-6 sm:p-8">
                            <p className="flex items-center gap-2 text-lg font-bold text-fts-green">
                                <CalendarCheck aria-hidden className="h-5 w-5" />
                                {b.doneTitle}
                            </p>
                            <p className="mt-4 text-sm text-fts-ink">{b.reference}</p>
                            <p className="font-mono text-2xl font-bold tracking-wider">{done.reference}</p>
                            <p className="mt-4 leading-relaxed text-fts-ink">{b.doneBody}</p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                {done.handover.whatsapp_url && (
                                    <a
                                        href={done.handover.whatsapp_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-fts-sky-strong px-5 py-3 font-semibold text-white hover:bg-fts-blue"
                                    >
                                        <MessageCircle aria-hidden className="h-4 w-4" />
                                        {b.sendWhatsapp}
                                    </a>
                                )}
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="rounded-xl border border-fts-line px-5 py-3 font-semibold text-fts-blue hover:border-fts-sky"
                                >
                                    {b.another}
                                </button>
                            </div>
                        </div>
                    ) : !options ? (
                        <div className="rounded-3xl border border-fts-line bg-white p-6 text-sm text-fts-ink">
                            {loadError ? (
                                <>
                                    {b.loadFailed}{' '}
                                    <button type="button" onClick={load} className="font-semibold text-fts-blue hover:underline">
                                        {a.chat.retry}
                                    </button>
                                </>
                            ) : (
                                b.loading
                            )}
                        </div>
                    ) : (
                        <form onSubmit={submit} noValidate className="space-y-4">
                            <Fieldset legend={b.stepWhen}>
                                <div>
                                    <p className="text-sm font-medium" id="booking-date-label">
                                        {b.date}
                                    </p>
                                    <div
                                        role="radiogroup"
                                        aria-labelledby="booking-date-label"
                                        className="-mx-1 mt-1.5 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]"
                                    >
                                        {options.days.slice(0, 15).map((candidate) => (
                                            <button
                                                key={candidate.date}
                                                type="button"
                                                role="radio"
                                                aria-checked={date === candidate.date}
                                                onClick={() => setDate(candidate.date)}
                                                className={`shrink-0 rounded-xl border px-3 py-2 text-sm font-semibold ${
                                                    date === candidate.date
                                                        ? 'border-fts-navy bg-fts-navy text-white'
                                                        : 'border-fts-line bg-white hover:border-fts-sky'
                                                }`}
                                            >
                                                {dayLabel(candidate.date)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium" id="booking-time-label">
                                        {b.time} <span className="font-normal text-fts-ink">({options.timezone.replace('Asia/', '')})</span>
                                    </p>
                                    {day && day.slots.length > 0 ? (
                                        <div role="radiogroup" aria-labelledby="booking-time-label" className="mt-1.5 grid grid-cols-3 gap-2 sm:grid-cols-4">
                                            {day.slots.map((candidate) => (
                                                <button
                                                    key={candidate.time_slot}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={time === candidate.time_slot}
                                                    onClick={() => setTime(candidate.time_slot)}
                                                    className={`rounded-xl border px-2 py-2 text-sm font-semibold ${
                                                        time === candidate.time_slot
                                                            ? 'border-fts-navy bg-fts-navy text-white'
                                                            : 'border-fts-line bg-white hover:border-fts-sky'
                                                    }`}
                                                >
                                                    {candidate.time_slot}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="mt-1.5 text-sm text-fts-ink">{b.noSlots}</p>
                                    )}
                                </div>
                                <label className="block text-sm font-medium">
                                    {b.team}
                                    <select value={consultant} onChange={(event) => setConsultant(event.target.value)} className={inputClass}>
                                        {availableTeams.map((team) => (
                                            <option key={team.slug} value={team.slug}>
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </Fieldset>

                            <Fieldset legend={b.stepAbout}>
                                <label className="block text-sm font-medium">
                                    {b.goal}
                                    <select value={goal} onChange={(event) => setGoal(event.target.value)} className={inputClass}>
                                        <option value="">—</option>
                                        {options.goals.map((value) => (
                                            <option key={value} value={value}>
                                                {b.goals[value] ?? value}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                                    <label className="block text-sm font-medium">
                                        {b.service}
                                        <select value={service} onChange={(event) => setService(event.target.value)} className={inputClass}>
                                            <option value="">{b.serviceNone}</option>
                                            {options.services.map((item) => (
                                                <option key={item.slug} value={item.slug}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="block text-sm font-medium">
                                        {b.participants}
                                        <input
                                            type="number"
                                            min={1}
                                            max={options.max_participants}
                                            value={participants}
                                            onChange={(event) =>
                                                setParticipants(Math.min(options.max_participants, Math.max(1, Number(event.target.value) || 1)))
                                            }
                                            inputMode="numeric"
                                            className={`${inputClass} sm:w-28`}
                                        />
                                    </label>
                                </div>
                                <label className="block text-sm font-medium">
                                    {b.notes}
                                    <textarea
                                        value={notes}
                                        onChange={(event) => setNotes(event.target.value)}
                                        rows={3}
                                        maxLength={500}
                                        placeholder={b.notesPlaceholder}
                                        className={inputClass}
                                    />
                                </label>
                            </Fieldset>

                            <Fieldset legend={b.stepContact}>
                                <label className="block text-sm font-medium">
                                    {b.name}
                                    <input
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        maxLength={100}
                                        autoComplete="name"
                                        className={inputClass}
                                    />
                                </label>
                                <div>
                                    <p className="text-sm font-medium" id="booking-contact-label">
                                        {b.contactType}
                                    </p>
                                    <div role="radiogroup" aria-labelledby="booking-contact-label" className="mt-1.5 flex flex-wrap gap-2">
                                        {(['whatsapp', 'phone', 'email'] as ContactType[]).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                role="radio"
                                                aria-checked={contactType === type}
                                                onClick={() => setContactType(type)}
                                                className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${
                                                    contactType === type
                                                        ? 'border-fts-navy bg-fts-navy text-white'
                                                        : 'border-fts-line bg-white hover:border-fts-sky'
                                                }`}
                                            >
                                                {b.contactTypes[type]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <label className="block text-sm font-medium">
                                    {contactType === 'email' ? b.contactEmail : b.contactValue}
                                    <input
                                        value={contactValue}
                                        onChange={(event) => setContactValue(event.target.value)}
                                        maxLength={120}
                                        type={contactType === 'email' ? 'email' : 'tel'}
                                        autoComplete={contactType === 'email' ? 'email' : 'tel'}
                                        inputMode={contactType === 'email' ? 'email' : 'tel'}
                                        className={inputClass}
                                    />
                                </label>
                            </Fieldset>

                            {error && (
                                <div role="alert" className="rounded-2xl border border-fts-red/30 bg-white p-4 text-sm">
                                    <p>{error}</p>
                                    {alternatives && alternatives.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-fts-ink">{b.alternatives}</p>
                                            <div className="mt-1.5 flex flex-wrap gap-2">
                                                {alternatives.map((alternative) => (
                                                    <button
                                                        key={alternative.type === 'slot' ? alternative.time_slot : alternative.slug}
                                                        type="button"
                                                        onClick={() => {
                                                            if (alternative.type === 'slot') setTime(alternative.time_slot);
                                                            else setConsultant(alternative.slug);
                                                            setError(null);
                                                            setAlternatives([]);
                                                        }}
                                                        className="rounded-full border border-fts-line px-3 py-1 font-semibold text-fts-blue hover:border-fts-sky"
                                                    >
                                                        {alternative.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={sending}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-fts-sky-strong px-6 py-4 font-semibold text-white transition hover:bg-fts-blue disabled:opacity-60 sm:w-auto"
                            >
                                <CalendarCheck aria-hidden className="h-5 w-5" />
                                {sending ? b.sending : b.submit}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Booking;
