// Decorative FTS "friction to flow" motif from the v2 hero. It is final artwork, not a placeholder.
const FrictionToFlowIllustration = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 520 380" className={className} aria-hidden="true" focusable="false">
    <circle cx="210" cy="170" r="150" fill="#E0F2FE" opacity="0.8" />

    <circle cx="372" cy="56" r="52" fill="#FCE4E8" />
    <circle cx="372" cy="56" r="18" fill="#E5243B" />

    <g>
      <rect x="62" y="36" width="238" height="122" rx="22" fill="#fff" stroke="#DCE6F0" strokeWidth="2" />
      <circle cx="100" cy="80" r="15" fill="#E0F2FE" />
      <path d="M92 80l6 6 11-12" fill="none" stroke="#0EA5E9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="128" y="70" width="136" height="9" rx="4.5" fill="#DCE6F0" />
      <rect x="128" y="92" width="96" height="8" rx="4" fill="#EEF4FA" />
    </g>

    <g>
      <rect x="20" y="224" width="254" height="140" rx="22" fill="#fff" stroke="#DCE6F0" strokeWidth="2" />
      <circle cx="62" cy="268" r="20" fill="#DCF5E7" />
      <path d="M54 268l6 6 10-11" fill="none" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="100" y="256" width="138" height="9" rx="4.5" fill="#DCE6F0" />
      <rect x="100" y="280" width="114" height="8" rx="4" fill="#EEF4FA" />
    </g>

    <path d="M252 184 C 280 150, 300 120, 334 106" fill="none" stroke="#0EA5E9" strokeWidth="5" strokeLinecap="round" />
    <circle cx="252" cy="184" r="12" fill="#5ED3F3" />
    <circle cx="334" cy="106" r="11" fill="#5ED3F3" />

    <g>
      <rect x="298" y="136" width="214" height="172" rx="22" fill="#102342" />
      <rect x="326" y="162" width="110" height="9" rx="4.5" fill="#2F6CA6" />
      <rect x="326" y="186" width="152" height="9" rx="4.5" fill="#2F6CA6" />
      <path d="M320 262 C 350 230, 380 228, 410 248 S 466 272, 480 228" fill="none" stroke="#5ED3F3" strokeWidth="5" strokeLinecap="round" />
      <circle cx="481" cy="228" r="9" fill="#E5243B" />
    </g>
  </svg>
);

export default FrictionToFlowIllustration;
