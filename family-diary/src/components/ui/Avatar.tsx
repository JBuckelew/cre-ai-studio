export function Avatar({
  name,
  imageUrl,
  accentColor,
  size = 36,
}: {
  name: string;
  imageUrl?: string | null;
  accentColor?: string | null;
  size?: number;
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover border-2 border-card shadow-sm"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-display font-semibold text-card border-2 border-card shadow-sm select-none"
      style={{
        width: size,
        height: size,
        backgroundColor: accentColor ?? "#c4664b",
        fontSize: size * 0.45,
      }}
      aria-label={name}
      title={name}
    >
      {initial}
    </span>
  );
}
