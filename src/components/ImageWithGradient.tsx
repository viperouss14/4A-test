import Image from 'next/image';

export default function ImageWithGradient() {
  return (
    <div className="relative md:w-[434px] w-[277px] md:h-[715px] h-[441px]">
      <Image
        src="/man.svg"
        alt="Мужчина спортивного телосложения в шортах"
        fill
        style={{ objectFit: 'cover' }}
        className="w-full h-full"
        loading='eager'
      />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F5F7F7] to-transparent"></div>
    </div>
  );
}
