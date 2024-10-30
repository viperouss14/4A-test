"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { SubscriptionData } from "@/types/subscription";
import DiscountBadge from "./DiscountBadge";
import { X } from "lucide-react";

interface ModalProps {
  subscriptions: SubscriptionData[];
}

const Modal = ({ subscriptions }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("1 месяц");
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const regularPrices = subscriptions
    .filter((sub) => sub.isPopular)
    .slice(0, 3)
    .map((sub) => ({
      name: sub.name,
      price: sub.price,
    }));

  const discountPrices = subscriptions
    .filter((sub) => sub.isDiscount)
    .slice(0, 3)
    .map((sub) => ({
      name: sub.name,
      price: sub.price,
    }));

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 12);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "unset";
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const contentElement = dialogRef.current?.querySelector('[role="dialog"]');
    const contentDimensions = contentElement?.getBoundingClientRect();

    if (
      contentDimensions &&
      e.clientX >= contentDimensions.left &&
      e.clientX <= contentDimensions.right &&
      e.clientY >= contentDimensions.top &&
      e.clientY <= contentDimensions.bottom
    ) {
      return;
    }

    setIsOpen(false);
  };

  if (!mounted) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="fixed inset-0 p-0 m-0 max-w-none w-screen h-screen bg-transparent outline-none"
      onClick={handleBackdropClick}
    >
      <div
        className="fixed inset-0 bg-[#00000066] w-screen h-screen"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="relative bg-[#F5F7F7] max-w-[750px] min-h-[658px] w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 border-none outline-none"
            aria-label="Закрыть"
          >
            <X size={24} />
          </button>

          <div>
            <div className="inline-block bg-accent text-white px-2.5 py-1.5 ml-10 text-[16px]">
              горячее предложение
            </div>

            <div className="text-center">
              <h2
                id="modal-title"
                className="text-3xl font-bold text-center font-rubik my-8"
              >
                НЕ УПУСТИ СВОЙ{" "}
                <span className="text-accent">ПОСЛЕДНИЙ ШАНС</span>
              </h2>
              <p className="text-2xl font-pt-root-ui-reg mb-2">
                Мы знаем, как трудно начать..{" "}
                <span className="font-bold">Поэтому!</span>
              </p>
              <p className="inline-block border-[1.5px] border-[#00C2FF] rounded-full px-7 py-4 font-pt-root-ui text-2xl mb-10">
                Дарим скидку для{" "}
                <span className="text-accent">лёгкого старта</span> 🏃‍♂️
              </p>
            </div>

            <p className="text-2xl font-pt-root-ui-reg ml-10 mb-5">
              Посмотри, что мы для тебя приготовили 🔥
            </p>

            {/* Cards */}
            <div className="grid grid-cols-3 gap-5 mx-10" role="radiogroup">
              {discountPrices.map((discount, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPlan(discount.name)}
                  className={`w-[210px] h-[197px] p-4 rounded-[20px] border-2 cursor-pointer transition-all ${
                    discount.name === selectedPlan
                      ? "bg-[#01B9C50D] border-accent"
                      : "border-[#E7EAF1] border-2 hover:border-accent bg-white"
                  }`}
                  role="radio"
                  aria-checked={discount.name === selectedPlan}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bebas-neue-cyr text-2xl">
                      {discount.name}
                    </h3>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        discount.name === selectedPlan
                          ? "border-accent"
                          : "border-[#555965]"
                      }`}
                    >
                      {discount.name === selectedPlan && (
                        <div className="bg-accent w-3 h-3 rounded-full" />
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="text-[#2D3242] text-xl font-pt-root-ui opacity-70 relative">
                      <span className="relative">
                        {regularPrices[index].price}₽
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#FD4D35] transform -rotate-18" />
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#FD4D35] transform rotate-18" />
                      </span>
                    </div>
                    <div className="w-[134px] h-1 border-t border-[#E7EAF1] mb-4 mt-4 mx-auto"></div>
                    <div className="text-[46px] font-pt-root-ui">
                      {discount.price}
                      <span className="relative">
                        ₽
                        <div className="absolute -top-3 left-8">
                          <DiscountBadge
                            standardPrice={regularPrices[index].price}
                            discountPrice={discount.price}
                            size="w-[50px] h-[50px]"
                            fontSize="text-[13px]"
                          />
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="bg-[#FD4D35] text-white 
              py-[20px] px-[42px] my-[40px] ml-[220px] 
              rounded-[50px] font-rubik text-xl 
              hover:opacity-70"
            >
              Начать тренироваться
            </button>
          </div>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default Modal;
