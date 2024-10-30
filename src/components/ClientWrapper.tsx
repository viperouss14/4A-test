'use client';
import { useState } from "react";
import { SubscriptionData } from "@/types/subscription";
import PricingCards from "./Cards";

interface ClientWrapperProps {
  subscriptions: SubscriptionData[];
  onPlanSelect?: (plan: SubscriptionData) => void;
}

export default function ClientWrapper({ subscriptions, onPlanSelect }: ClientWrapperProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionData | null>(null);
  const [isChecked, setIsChecked] = useState(true);

  const handleSelectPlan = (plan: SubscriptionData) => {
    setSelectedPlan(plan);
    onPlanSelect?.(plan);
    console.log("Selected plan:", selectedPlan);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="max-w-[585px] font-pt-root-ui-reg">
      <PricingCards
        subscriptions={subscriptions}
        showDiscount={true}
        onSelectPlan={handleSelectPlan}
      />
      <p className="mt-3 text-left text-lg">
        Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем за 1 месяц
      </p>
      <div className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="h-6 w-6"
        />
        <label htmlFor="terms" className="text-[16px] text-[#818798]">
          Я соглашаюсь с{" "}
          <a href="" className="text-[#2D97F9]">Правилами сервиса</a>{" "}
          и условиями <br />
          <a href="" className="text-[#2D97F9]">Публичной оферты</a>.
        </label>
      </div>
      <div className="flex mt-12">
        <button
          className="bg-[#FD4D35] text-white px-[100px] py-[28px] rounded-[50px] font-rubik text-xl animate-pulse"
          disabled={!isChecked}
        >
          Купить
        </button>
      </div>
      <p className="mt-8 text-left text-sm text-[#818798]">
        Нажимая «Купить», Пользователь соглашается на автоматическое списание денежных средств по истечению купленного периода. Дальнейшие списания по тарифам участвующим в акции осуществляются по полной стоимости согласно оферте.
      </p>
    </div>
  );
}
