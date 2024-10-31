import { useState, useEffect } from "react";
import { SubscriptionData } from "@/types/subscription";
import DiscountBadge from "./DiscountBadge";

interface PricingCardsProps {
  subscriptions: SubscriptionData[];
  showDiscount: boolean;
  onSelectPlan: (plan: SubscriptionData) => void;
}

const descriptions = {
  "1 неделя": "Чтобы просто начать\u00A0👍🏻",
  "1 месяц": "Привести тело впорядок\u00A0💪🏻",
  "3 месяца": "Изменить образ жизни\u00A0🔥",
  навсегда: "Всегда быть в форме и поддерживать своё здоровье\u00A0⭐️",
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
      (item) => !item.isDiscount && item.isPopular
    );
    const discountPrices = subscriptions.filter((item) => item.isDiscount);

    return standardPrices.map((standard) => ({
      ...standard,
      discountPrice: discountPrices.find(
        (discount) => discount.name === standard.name
      )?.price,
    }));
  };

  const pricingData = getPricingData();

  return (
    <div className="w-full max-w-[1200px]">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-3 gap-2.5 mb-2 md:mb-10">
        {pricingData.slice(0, 3).map((item) => (
          <div key={item.id} className="relative md:pt-6">
            <button
              onClick={() => {
                setSelectedCardId(item.id);
                onSelectPlan(item);
              }}
              className={`w-full md:w-[187px] h-[140px] md:h-[261px] rounded-[20px] relative transition-all duration-300
                ${
                  selectedCardId === item.id
                    ? "bg-[#01B9C50D] border-2 border-accent"
                    : "bg-white border-2 border-[#D3D6DD] hover:border-accent hover:bg-[#01B9C50D]"
                }
              `}
            >
              {showDiscount && item.discountPrice && (
                <div
                  className={`absolute top-1 right-1 md:right-3 md:-top-6 transition-opacity duration-300 ${
                    isDiscountVisible ? "opacity-100" : "opacity-0"
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
              <div className="flex align-start md:hidden w-full h-full">
                <div className="flex flex-col text-left pl-6 pt-9">
                  <h3 className="font-bebas-neue-cyr text-2xl text-[#687078] uppercase leading-tight pb-4">
                    {item.name}
                  </h3>
                  <p className="text-[#2F4353] text-sm font-pt-root-ui-reg leading-[18px] max-w-[150px]">
                    {descriptions[item.name as keyof typeof descriptions]}
                  </p>
                </div>
                
                <div className="flex items-center justify-end pr-4">
                  <div className="font-pt-root-ui text-right">
                    {showDiscount && item.discountPrice ? (
                      <div
                        className={`transition-all duration-300 ${
                          isDiscountVisible
                            ? "opacity-100 transform-none"
                            : "opacity-0 translate-y-4 pointer-events-none"
                        }`}
                      >
                        <span className="text-[32px] text-[#2D3242] block leading-tight">
                          {item.discountPrice}₽
                        </span>
                        <span className="text-[#95979F] text-lg line-through font-pt-root-ui-reg">
                          {item.price}₽
                        </span>
                      </div>
                    ) : (
                      <span className="text-[32px] text-[#2D3242] block">
                        {item.price}₽
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden md:flex flex-col h-full">
                <h3 className="font-bebas-neue-cyr text-3xl text-[#687078] uppercase leading-[30px] mt-[45px] mb-[21px]">
                  {item.name}
                </h3>

                <div className="font-pt-root-ui h-[80px] text-right mx-[36px] relative">
                  {showDiscount && item.discountPrice ? (
                    <div
                      className={`absolute top-0 right-0 w-full transition-all duration-300 ${
                        isDiscountVisible
                          ? "opacity-100 transform-none"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      <span className="text-5xl text-[#2D3242]">
                        {item.discountPrice}₽
                      </span>
                      <br />
                      <span className="text-[#95979F] text-2xl line-through font-pt-root-ui-reg">
                        {item.price}₽
                      </span>
                    </div>
                  ) : (
                    <div className="absolute top-0 right-0 w-full">
                      <span className="text-5xl text-[#2D3242]">
                        {item.price}₽
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-[#2F4353] text-center text-base mx-4 mb-4 font-pt-root-ui-reg mt-auto">
                  {descriptions[item.name as keyof typeof descriptions]}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* "Навсегда" */}
      <div className="w-full min-h-[140px] md:min-h-[125px] relative">
        <button
          onClick={() => {
            setSelectedCardId(subscriptions[3].id);
            onSelectPlan(subscriptions[3]);
          }}
          className={`w-full min-h-[140px] md:p-6 rounded-[20px] relative transition-all duration-300
            ${
              selectedCardId === subscriptions[3].id
                ? "bg-[#01B9C50D] border-2 border-accent"
                : "bg-white border-2 border-[#D3D6DD] hover:border-accent hover:bg-[#01B9C50D]"
            }
          `}
        >
          {subscriptions[3].isPopular && showDiscount && (
            <div
              className={`absolute top-1 right-1 md:right-3 md:-top-6 transition-opacity duration-300 ${
                isDiscountVisible ? "opacity-100" : "opacity-0"
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
          <div className="flex align-start md:hidden w-full h-full">
            <div className="flex flex-col text-left pl-6 pt-8">
              <h3 className="font-bebas-neue-cyr text-2xl text-[#2D3242] uppercase leading-tight pb-4">
                {subscriptions[3].name}
              </h3>
              <p className="text-[#2F4353] text-sm font-pt-root-ui-reg leading-[18px] max-w-[150px] pb-2">
                Всегда быть<br/>в форме ⭐️
              </p>
            </div>

            <div className="w-1/2 flex items-center justify-end">
              <div className="font-pt-root-ui text-right">
                {showDiscount ? (
                  <div
                    className={`transition-all duration-300 ${
                      isDiscountVisible
                        ? "opacity-100 transform-none"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <span className="text-[32px] text-[#2D3242] block leading-tight">
                      {subscriptions[3].price}₽
                    </span>
                    <span className="text-[#95979F] text-lg line-through font-pt-root-ui-reg">
                      {subscriptions[7].price}₽
                    </span>
                  </div>
                ) : (
                  <span className="text-[32px] text-[#2D3242] block">
                    {subscriptions[7].price}₽
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Desktop "Навсегда" */}
          <div className="hidden md:flex items-center">
            <h3 className="font-bebas-neue-cyr text-3xl font-bold text-[#2D3242] uppercase leading-[30px] mr-5">
              {subscriptions[3].name}
            </h3>

            <div className="font-pt-root-ui text-right h-[55px] relative min-w-[142px]">
              {showDiscount ? (
                <div
                  className={`absolute top-0 right-0 w-full transition-all duration-300 ${
                    isDiscountVisible
                      ? "opacity-100 transform-none"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <span className="text-5xl text-[#2D3242]">
                    {subscriptions[3].price}₽
                  </span>
                  <br />
                  <span className="text-[#95979F] text-2xl line-through font-pt-root-ui-reg">
                    {subscriptions[7].price}₽
                  </span>
                </div>
              ) : (
                <div className="absolute top-0 right-0 w-full">
                  <span className="text-5xl text-[#2D3242]">
                    {subscriptions[7].price}₽
                  </span>
                </div>
              )}
            </div>

            <p className="text-[#2F4353] text-base w-[161px] text-left ml-10 font-pt-root-ui-reg">
              {descriptions[pricingData[3].name as keyof typeof descriptions]}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}