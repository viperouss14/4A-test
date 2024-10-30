import Image from 'next/image';

export default function ImageWithGradient() {
  return (
    <div className="relative w-[434px] h-[715px]">
      <Image
        src="/man.svg"
        alt="Мужчина спортивного телосложения в шортах"
        fill
        style={{ objectFit: 'cover' }}
        className="w-full h-full"
      />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F5F7F7] to-transparent"></div>
    </div>
  );
}
