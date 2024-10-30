import Image from "next/image";

interface DiscountBadgeProps {
  standardPrice: number;
  discountPrice: number;
  size?: string; // Пропс для размера контейнера
  fontSize?: string; // Пропс для размера шрифта
}

const getDiscount = (standard: number, discounted: number): number => {
  return Math.round(((standard - discounted) / standard) * 100);
};

export default function DiscountBadge({
  standardPrice,
  discountPrice,
  size = "w-16 h-16",
  fontSize = "text-[17px]",
}: DiscountBadgeProps) {
  const discount = getDiscount(standardPrice, discountPrice);

  return (
    <div className={`relative ${size}`}>
      <Image
        src="/Star.svg"
        alt=""
        fill
        style={{ objectFit: 'cover' }}
        className="w-full h-full"
      />
      <div
        className={`absolute inset-0 flex items-center justify-center text-white ${fontSize} font-pt-root-ui-reg`}
      >
        -{discount}%
      </div>
    </div>
  );
}
