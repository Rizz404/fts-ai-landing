import type { SiteImage } from "../content/images";

type Props = {
  image: SiteImage;
  className?: string;
  loading?: "lazy" | "eager";
};

const SiteImg = ({ image, className, loading = "lazy" }: Props) => (
  <span className="relative block">
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={loading}
      decoding="async"
      data-placeholder={image.placeholder || undefined}
      className={className}
    />
    {import.meta.env.DEV && image.placeholder && (
      <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-fts-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
        Placeholder image
      </span>
    )}
  </span>
);

export default SiteImg;
