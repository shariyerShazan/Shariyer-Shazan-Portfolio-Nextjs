export default function Marquee() {
  const items = [
    'Full-Stack Development',
    'System Architecture',
    'API Design',
    'Performance Engineering',
    'UI Engineering',
    'React & Next.js',
    'Node & Python',
    'Database Design',
  ];

  return (
    <div className="marquee-strip border-y border-white/[0.07] py-[13px] overflow-hidden flex" aria-hidden="true">
      <div className="marquee-inner flex whitespace-nowrap animate-[mqrun_24s_linear_infinite] hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, idx) => (
          <span key={idx} className="mq-item font-display text-[14px] tracking-[0.18em] text-white/[0.18] px-[38px]">
            {item} <span className="text-white/[0.4]">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
