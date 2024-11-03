'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SubscriptionData } from '@/types/subscription';
import DiscountBadge from './DiscountBadge';
import { X } from 'lucide-react';

interface ModalProps {
  subscriptions: SubscriptionData[];
}

const Modal = ({ subscriptions }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('1 месяц');
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
    }, 123000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
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
      className="fixed inset-0 m-0 h-screen w-screen max-w-none bg-transparent p-0 outline-none"
      onClick={handleBackdropClick}
    >
      <div
        className="fixed inset-0 h-screen w-screen bg-[#00000066]"
        aria-hidden="true"
      />

      <div className="fixed inset-x-0 bottom-[60px] top-[60px] flex items-center justify-center p-4 md:inset-0">
        <div
          className="relative mx-5 max-h-screen w-[calc(100%-40px)] min-w-[335px] overflow-y-auto bg-[#F5F7F7] md:mx-0 md:min-h-[658px] md:max-w-[750px] md:overflow-y-visible"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-5 top-5 border-none text-gray-400 outline-none hover:text-gray-600"
            aria-label="Закрыть"
          >
            <X size={24} />
          </button>

          <div>
            <div className="inline-block bg-accent px-2.5 py-1 text-sm text-white md:ml-10 md:py-1.5 md:text-[16px]">
              горячее предложение
            </div>

            <div className="text-center">
              <h2
                id="modal-title"
                className="my-5 text-center font-rubik text-2xl font-bold md:my-8 md:text-3xl"
              >
                НЕ УПУСТИ СВОЙ{' '}
                <span className="block text-accent md:inline">
                  ПОСЛЕДНИЙ ШАНС
                </span>
              </h2>
              <p className="text[15px] mb-2 font-pt-root-ui-reg md:text-2xl">
                Мы знаем, как трудно начать..{' '}
                <span className="font-bold">Поэтому!</span>
              </p>
              <p className="mb-6 inline-block rounded-full border-[1.5px] border-[#00C2FF] px-7 py-4 font-pt-root-ui text-[15px] md:mb-10 md:text-2xl">
                Дарим скидку для{' '}
                <span className="text-accent">лёгкого старта</span> 🏃‍♂️
              </p>
            </div>

            <p className="mx-auto mb-3 text-center font-pt-root-ui-reg text-[15px] md:mb-5 md:ml-10 md:text-left md:text-2xl">
              Посмотри, что мы для тебя приготовили 🔥
            </p>

            {/* Cards */}
            <div
              className="grid grid-cols-1 justify-items-center gap-1.5 md:mx-10 md:grid-cols-3 md:gap-5"
              role="radiogroup"
            >
              {discountPrices.map((discount, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPlan(discount.name)}
                  className={`h-[133px] w-[295px] cursor-pointer rounded-[20px] border-2 transition-all md:h-[197px] md:w-[210px] md:p-4 ${
                    discount.name === selectedPlan
                      ? 'border-accent bg-[#01B9C50D]'
                      : 'border-2 border-[#E7EAF1] bg-white hover:border-accent'
                  }`}
                  role="radio"
                  aria-checked={discount.name === selectedPlan}
                >
                  <div className="flex items-center justify-between px-5 pt-6 md:px-0 md:pt-0">
                    <h3 className="font-bebas-neue-cyr text-2xl">
                      {discount.name}
                    </h3>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        discount.name === selectedPlan
                          ? 'border-accent'
                          : 'border-[#555965]'
                      }`}
                    >
                      {discount.name === selectedPlan && (
                        <div className="h-3 w-3 rounded-full bg-accent" />
                      )}
                    </div>
                  </div>

                  {/* Desktop */}
                  <div className="relative hidden md:block">
                    <div className="relative font-pt-root-ui text-xl text-[#2D3242] opacity-70">
                      <span className="absolute md:relative">
                        {regularPrices[index].price}₽
                        <div className="absolute left-0 right-0 top-1/2 h-[2px] -rotate-18 transform bg-[#FD4D35]" />
                        <div className="absolute left-0 right-0 top-1/2 h-[2px] rotate-18 transform bg-[#FD4D35]" />
                      </span>
                    </div>
                    <div className="mx-auto mb-4 mt-4 h-1 w-[134px] border-t border-[#E7EAF1]"></div>
                    <div className="font-pt-root-ui text-[44px] md:text-[46px]">
                      {discount.price}
                      <span className="relative">
                        ₽
                        <div className="absolute -top-3 left-8">
                          <DiscountBadge
                            standardPrice={regularPrices[index].price}
                            discountPrice={discount.price}
                            size="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
                            fontSize="text-[11px] md:text-[13px]"
                          />
                        </div>
                      </span>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="flex items-center justify-between px-5 md:hidden md:px-0">
                    <div className="font-pt-root-ui text-[44px] md:text-[46px]">
                      {discount.price}
                      <span className="relative">
                        ₽
                        <div className="absolute -top-3 left-8">
                          <DiscountBadge
                            standardPrice={regularPrices[index].price}
                            discountPrice={discount.price}
                            size="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
                            fontSize="text-[11px] md:text-[13px]"
                          />
                        </div>
                      </span>
                    </div>
                    <div className="relative font-pt-root-ui text-xl text-[#2D3242] opacity-70">
                      <span className="">
                        {regularPrices[index].price}₽
                        <div className="absolute left-0 right-0 top-1/2 h-[2px] -rotate-18 transform bg-[#FD4D35]" />
                        <div className="absolute left-0 right-0 top-1/2 h-[2px] rotate-18 transform bg-[#FD4D35]" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mx-auto my-[20px] block rounded-[50px] bg-[#FD4D35] px-[42px] py-[20px] font-rubik text-xl text-white hover:opacity-70 md:my-[40px]">
              Начать тренироваться
            </button>
          </div>
        </div>
      </div>
    </dialog>,
    document.body,
  );
};

export default Modal;
