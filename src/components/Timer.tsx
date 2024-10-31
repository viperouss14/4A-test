"use client";
import { useEffect, useState } from "react";

interface TimerProps {
  initialMinutes: number;
}

export default function Timer({ initialMinutes }: TimerProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 31) setIsWarning(true);
        if (prev < 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const timerClasses = `font-bebas-neue md:text-6xl text-[40px] font-normal leading-none ${
    isWarning ? "animate-pulse text-alert" : "text-accent"
  }`;

  return (
    <div className="flex items-center gap-4 font-pt-root-ui text-3xl font-bold text-[#2D3242]">
      <span className="font-pt-root-ui md:text-3xl text-[16px] text-[#2D3242]">
        Скидка действует:
      </span>
      <div className="flex">
        <div className="flex flex-col items-center">
          <span className={timerClasses}>
            {String(minutes).padStart(2, "0")}
          </span>
          <span className="font-pt-root-ui md:text-lg text-sm text-[#6D7585] -mt-2">
            минут
          </span>
        </div>

        <div
  className={`mx-3 flex h-[61px] items-start md:pt-[17px] pt-[8px] ${
    isWarning ? "animate-pulse" : ""
  }`}
>
  <svg
    width="8"
    height="27"
    viewBox="0 0 8 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="4"
      cy="4"
      r="4"
      className="r-[4] md:r-[5]"
      style={{ fill: `var(--${isWarning ? 'alert-color' : 'accent-color'})` }}
    />
    <circle
      cx="4"
      cy="23"
      r="4"
      className="r-[4] md:r-[5]"
      style={{ fill: `var(--${isWarning ? 'alert-color' : 'accent-color'})` }}
    />
  </svg>
</div>

        <div className="flex flex-col items-center">
          <span className={timerClasses}>
            {String(remainingSeconds).padStart(2, "0")}
          </span>
          <span className="font-pt-root-ui md:text-lg text-sm text-[#6D7585] -mt-2">
            секунд
          </span>
        </div>
      </div>
    </div>
  );
}
