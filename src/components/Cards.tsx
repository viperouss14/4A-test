import { useState, useEffect } from 'react';
import { SubscriptionData } from '@/types/subscription';
import DiscountBadge from './DiscountBadge';

interface PricingCardsProps {
  subscriptions: SubscriptionData[];
  showDiscount: boolean;
  onSelectPlan: (plan: SubscriptionData) => void;
}

const descriptions = {
  '1 неделя': 'Чтобы просто начать\u00A0👍🏻',
  '1 месяц': 'Привести тело впорядок\u00A0💪🏻',
  '3 месяца': 'Изменить образ жизни\u00A0🔥',
  навсегда: 'Всегда быть в форме и поддерживать своё здоровье\u00A0⭐️',
};

export default function PricingCards({
  subscriptions,
  showDiscount: initialShowDiscount,
  onSelectPlan,
}: PricingCardsProps) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [showDiscount, setShowDiscount] = useState(initialShowDiscount);
  const [isDiscountVisible, setIsDiscountVisible] = useState(true);

  useEffect(() => {
    if (showDiscount) {
      const timer = setTimeout(() => {
        setIsDiscountVisible(false);
        setTimeout(() => {
          setShowDiscount(false);
        }, 300);
      }, 120000);

      return () => clearTimeout(timer);
    }
  }, [showDiscount]);

  const getPricingData = () => {
    const standardPrices = subscriptions.filter(
      (item) => !item.isDiscount && item.isPopular,
    );
    const discountPrices = subscriptions.filter((item) => item.isDiscount);

    return standardPrices.map((standard) => ({
      ...standard,
      discountPrice: discountPrices.find(
        (discount) => discount.name === standard.name,
      )?.price,
    }));
  };

  const pricingData = getPricingData();

  return (
    <div className="w-full max-w-[1200px]">
      <div className="mb-2 grid grid-cols-1 gap-2.5 md:mb-10 md:grid-cols-3 md:gap-x-3">
        {pricingData.slice(0, 3).map((item) => (
          <div key={item.id} className="relative md:pt-6">
            <button
              onClick={() => {
                setSelectedCardId(item.id);
                onSelectPlan(item);
              }}
              className={`relative h-[140px] w-full rounded-[20px] transition-all duration-300 md:h-[261px] md:w-[187px] ${
                selectedCardId === item.id
                  ? 'border-2 border-accent bg-[#01B9C50D]'
                  : 'border-2 border-[#D3D6DD] bg-white hover:border-accent hover:bg-[#01B9C50D]'
              } `}
            >
              {showDiscount && item.discountPrice && (
                <div
                  className={`absolute right-1 top-1 transition-opacity duration-300 md:-top-6 md:right-3 ${
                    isDiscountVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <DiscountBadge
                    standardPrice={item.price}
                    discountPrice={item.discountPrice}
                    size="w-12 h-12 md:w-16 md:h-16"
                    fontSize="text-[13px] md:text-[17px]"
                  />
                </div>
              )}

              {/* Mobile */}
              <div className="align-start flex h-full w-full md:hidden">
                <div className="flex flex-col pl-6 pt-9 text-left">
                  <h3 className="pb-4 font-bebas-neue-cyr text-2xl uppercase leading-tight text-[#687078]">
                    {item.name}
                  </h3>
                  <p className="max-w-[150px] font-pt-root-ui-reg text-sm leading-[18px] text-[#2F4353]">
                    {descriptions[item.name as keyof typeof descriptions]}
                  </p>
                </div>

                <div className="flex items-center justify-end pr-4">
                  <div className="text-right font-pt-root-ui">
                    {showDiscount && item.discountPrice ? (
                      <div
                        className={`transition-all duration-300 ${
                          isDiscountVisible
                            ? 'transform-none opacity-100'
                            : 'pointer-events-none translate-y-4 opacity-0'
                        }`}
                      >
                        <span className="block text-[32px] leading-tight text-[#2D3242]">
                          {item.discountPrice}₽
                        </span>
                        <span className="font-pt-root-ui-reg text-lg text-[#95979F] line-through">
                          {item.price}₽
                        </span>
                      </div>
                    ) : (
                      <span className="block text-[32px] text-[#2D3242]">
                        {item.price}₽
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden h-full flex-col md:flex">
                <h3 className="mb-[21px] mt-[45px] font-bebas-neue-cyr text-3xl uppercase leading-[30px] text-[#687078]">
                  {item.name}
                </h3>

                <div className="relative mx-[36px] h-[80px] text-right font-pt-root-ui">
                  {showDiscount && item.discountPrice ? (
                    <div
                      className={`absolute right-0 top-0 w-full transition-all duration-300 ${
                        isDiscountVisible
                          ? 'transform-none opacity-100'
                          : 'pointer-events-none translate-y-4 opacity-0'
                      }`}
                    >
                      <span className="text-5xl text-[#2D3242]">
                        {item.discountPrice}₽
                      </span>
                      <br />
                      <span className="font-pt-root-ui-reg text-2xl text-[#95979F] line-through">
                        {item.price}₽
                      </span>
                    </div>
                  ) : (
                    <div className="absolute right-0 top-0 w-full">
                      <span className="text-5xl text-[#2D3242]">
                        {item.price}₽
                      </span>
                    </div>
                  )}
                </div>

                <p className="mx-4 mb-4 mt-auto text-center font-pt-root-ui-reg text-base text-[#2F4353]">
                  {descriptions[item.name as keyof typeof descriptions]}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* "Навсегда" */}
      <div className="relative flex min-h-[140px] w-full md:min-h-[125px]">
        <button
          onClick={() => {
            setSelectedCardId(subscriptions[3].id);
            onSelectPlan(subscriptions[3]);
          }}
          className={`relative m-0 flex min-h-[140px] w-full items-stretch rounded-[20px] p-0 transition-all duration-300 md:min-h-[125px] md:p-6 ${
            selectedCardId === subscriptions[3].id
              ? 'border-2 border-accent bg-[#01B9C50D]'
              : 'border-2 border-[#D3D6DD] bg-white hover:border-accent hover:bg-[#01B9C50D]'
          } `}
        >
          {subscriptions[3].isPopular && showDiscount && (
            <div
              className={`absolute right-1 top-1 transition-opacity duration-300 md:-top-6 md:right-3 ${
                isDiscountVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <DiscountBadge
                standardPrice={subscriptions[7].price}
                discountPrice={subscriptions[3].price}
                size="w-12 h-12 md:w-16 md:h-16"
                fontSize="text-[13px] md:text-[17px]"
              />
            </div>
          )}

          {/* Mobile "Навсегда" */}
          <div className="flex w-full md:hidden">
            <div className="flex flex-col pl-6 pt-8 text-left">
              <h3 className="pb-4 font-bebas-neue-cyr text-2xl uppercase leading-tight text-[#2D3242]">
                {subscriptions[3].name}
              </h3>
              <p className="max-w-[150px] pb-2 font-pt-root-ui-reg text-sm leading-[18px] text-[#2F4353]">
                Всегда быть
                <br />в форме ⭐️
              </p>
            </div>

            <div className="flex w-1/2 items-center justify-end">
              <div className="text-right font-pt-root-ui">
                {showDiscount ? (
                  <div
                    className={`transition-all duration-300 ${
                      isDiscountVisible
                        ? 'transform-none opacity-100'
                        : 'pointer-events-none translate-y-4 opacity-0'
                    }`}
                  >
                    <span className="block text-[32px] leading-tight text-[#2D3242]">
                      {subscriptions[3].price}₽
                    </span>
                    <span className="font-pt-root-ui-reg text-lg text-[#95979F] line-through">
                      {subscriptions[7].price}₽
                    </span>
                  </div>
                ) : (
                  <span className="block text-[32px] text-[#2D3242]">
                    {subscriptions[7].price}₽
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Desktop "Навсегда" */}
          <div className="hidden items-center md:flex">
            <h3 className="mr-5 font-bebas-neue-cyr text-3xl font-bold uppercase leading-[30px] text-[#2D3242]">
              {subscriptions[3].name}
            </h3>

            <div className="relative h-[55px] min-w-[142px] text-right font-pt-root-ui">
              {showDiscount ? (
                <div
                  className={`absolute right-0 top-0 w-full transition-all duration-300 ${
                    isDiscountVisible
                      ? 'transform-none opacity-100'
                      : 'pointer-events-none translate-y-4 opacity-0'
                  }`}
                >
                  <span className="text-5xl text-[#2D3242]">
                    {subscriptions[3].price}₽
                  </span>
                  <br />
                  <span className="font-pt-root-ui-reg text-2xl text-[#95979F] line-through">
                    {subscriptions[7].price}₽
                  </span>
                </div>
              ) : (
                <div className="absolute right-0 top-0 w-full">
                  <span className="text-5xl text-[#2D3242]">
                    {subscriptions[7].price}₽
                  </span>
                </div>
              )}
            </div>

            <p className="ml-10 w-[161px] text-left font-pt-root-ui-reg text-base text-[#2F4353]">
              {descriptions[pricingData[3].name as keyof typeof descriptions]}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
