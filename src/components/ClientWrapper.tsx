"use client";
import { useState } from "react";
import { SubscriptionData } from "@/types/subscription";
import PricingCards from "./Cards";

interface ClientWrapperProps {
  subscriptions: SubscriptionData[];
}

export default function ClientWrapper({ subscriptions }: ClientWrapperProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionData | null>(
    null
  );
  const [isChecked, setIsChecked] = useState(true);

  const handleSelectPlan = (plan: SubscriptionData) => {
    setSelectedPlan(plan);
    console.log(selectedPlan);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
  };

  return (
    <div className="max-w-[335px] md:max-w-[585px] font-pt-root-ui-reg">
      <PricingCards
        subscriptions={subscriptions}
        showDiscount={true}
        onSelectPlan={handleSelectPlan}
      />
      <p className="mt-3 text-left text-sm md:text-lg">
        Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем
        за 1 месяц
      </p>
      <form className="flex items-center gap-3 md:gap-2 mt-6">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="h-6 w-6 cursor-pointer flex-shrink-0 flex-grow-0"
        />
        <label htmlFor="terms" className="text-[16px] text-[#818798]">
          Я соглашаюсь с{" "}
          <a href="" className="text-[#2D97F9]">
            Правилами сервиса
          </a>{" "}
          и условиями{" "}
          <span className="hidden md:inline">
            <br />
          </span>
          <a href="" className="text-[#2D97F9]">
            Публичной оферты
          </a>
          .
        </label>
      </form>

      <div className="flex justify-center md:justify-start w-full mt-5 md:mt-12">
        <button
          className="bg-[#FD4D35] text-white px-[100px] py-[28px] rounded-[50px] font-rubik text-xl animate-pulse"
          disabled={!isChecked}
        >
          Купить
        </button>
      </div>
      <p className="hidden md:block mt-8 text-left text-sm text-[#818798]">
        Нажимая «Купить», Пользователь соглашается на автоматическое списание
        денежных средств по истечению купленного периода. Дальнейшие списания по
        тарифам участвующим в акции осуществляются по полной стоимости согласно
        оферте.
      </p>
    </div>
  );
}
