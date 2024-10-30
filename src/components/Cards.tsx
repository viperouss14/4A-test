"use client";

import { useState, useEffect } from "react";
import { SubscriptionData } from "@/types/subscription";
import DiscountBadge from "./DiscountBadge";

interface PricingCardsProps {
  subscriptions: SubscriptionData[];
  showDiscount: boolean;
  onSelectPlan: (plan: SubscriptionData) => void;
}

const descriptions = {
  "1 неделя": "Чтобы просто начать 👍🏻",
  "1 месяц": "Привести тело впорядок 💪🏻",
  "3 месяца": "Изменить образ жизни 🔥",
  навсегда: "Всегда быть в форме и поддерживать своё здоровье ⭐️",
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
    <div className="max-w-[1200px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 mb-10">
        {pricingData.slice(0, 3).map((item) => (
          <div key={item.id} className="relative pt-6">
            <button
              onClick={() => {
                setSelectedCardId(item.id);
                onSelectPlan(item);
              }}
              className={`w-[187px] h-[261px] rounded-[20px] relative transition-all duration-300
                ${
                  selectedCardId === item.id
                    ? "bg-[#01B9C50D] border-2 border-accent"
                    : "bg-white border-2 border-[#D3D6DD] hover:border-accent hover:bg-[#01B9C50D]"
                }
              `}
            >
              {/* Бейдж со скидкой */}
              {showDiscount && item.discountPrice && (
                <div
                  className={`absolute right-3 -top-6 transition-opacity duration-300 ${
                    isDiscountVisible ? "opacity-100" : "opacity-0"
                  } `}
                >
                  <DiscountBadge
                    standardPrice={item.price}
                    discountPrice={item.discountPrice}
                  />
                </div>
              )}

              <div className="relative">
                {/* Название */}
                <h3 className="font-bebas-neue-cyr text-3xl text-[#687078] uppercase leading-[30px] mt-[45px] mb-[21px]">
                  {item.name}
                </h3>

                {/* Цена */}
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
                    <div className="absolute top-0 right-0 w-full transition-all duration-300 opacity-100 transform-none">
                      <span className="text-5xl text-[#2D3242]">
                        {item.price}₽
                      </span>
                    </div>
                  )}
                </div>

                {/* Описание */}
                <p className="text-[#2F4353] text-center text-[16px] mx-4 mb-4 font-pt-root-ui-reg">
                  {descriptions[item.name as keyof typeof descriptions]}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Карточка "навсегда" */}
      <div className="w-full min-h-[125px] relative">
        <button
          onClick={() => {
            setSelectedCardId(subscriptions[3].id);
            onSelectPlan(subscriptions[3]);
          }}
          className={`w-full p-6 rounded-[20px] relative transition-all duration-300
            ${
              selectedCardId === subscriptions[3].id
                ? "bg-[#01B9C50D] border-2 border-accent"
                : "bg-white border-2 border-[#D3D6DD] hover:border-accent hover:bg-[#01B9C50D]"
            }
          `}
        >
          {/* Бейдж со скидкой */}
          {subscriptions[3].isPopular && showDiscount && (
            <div
              className={`absolute right-3 -top-6 transition-opacity duration-300 ${
                isDiscountVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <DiscountBadge
                standardPrice={subscriptions[7].price}
                discountPrice={subscriptions[3].price}
              />
            </div>
          )}

          {/* Цена */}
          <div className="relative flex items-center">
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
                <div className="absolute top-0 right-0 w-full transition-all duration-300 opacity-100 transform-none">
                  <span className="text-5xl text-[#2D3242]">
                    {subscriptions[7].price}₽
                  </span>
                </div>
              )}
            </div>

            {/* Описание */}
            <p className="text-[#2F4353] text-[16px] w-[161px] text-left ml-10 font-pt-root-ui-reg">
              {descriptions[pricingData[3].name as keyof typeof descriptions]}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
