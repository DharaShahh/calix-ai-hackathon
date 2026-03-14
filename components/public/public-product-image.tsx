import Image from "next/image";

type PublicProductImageProps = {
  compact?: boolean;
};

export function PublicProductImage({ compact = false }: PublicProductImageProps) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] border border-border bg-surface ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="overflow-hidden rounded-[22px] border border-border bg-white">
        <Image
          src="/illustrations/platform-preview.svg"
          alt="Platform preview"
          width={1600}
          height={980}
          priority
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}
