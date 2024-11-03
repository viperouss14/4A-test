import Image from 'next/image';

export default function ImageWithGradient() {
  return (
    <div className="relative h-[441px] w-[277px] md:h-[715px] md:w-[434px]">
      <Image
        src="/man.svg"
        alt="Мужчина спортивного телосложения в шортах"
        fill
        style={{ objectFit: 'cover' }}
        className="h-full w-full"
        loading="eager"
      />
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#F5F7F7] to-transparent"></div>
    </div>
  );
}
