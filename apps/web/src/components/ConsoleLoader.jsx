import React, { useState, useEffect } from 'react';

/**
 * ConsoleLoader Component
 * Redesigned to 100% replicate the Webflow 12-column layout grid of Titan Gate's loader.
 * Uses tabular mono font metrics, clean white text, and progress status tracking.
 */
export default function ConsoleLoader({ onFinished }) {
  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (percent >= 100) {
      const timeout = setTimeout(() => {
        setIsFinished(true);
        const finishTimeout = setTimeout(() => {
          if (onFinished) onFinished();
        }, 500); // fade transition
        return () => clearTimeout(finishTimeout);
      }, 250);
      return () => clearTimeout(timeout);
    }

    const delay = percent < 30 ? 30 : percent < 75 ? 15 : 40;
    const interval = setTimeout(() => {
      setPercent((prev) => Math.min(prev + 1, 100));
    }, delay);

    return () => clearTimeout(interval);
  }, [percent, onFinished]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 w-full h-full z-[9999] bg-[#000000] text-[#FFFFFF] select-none transition-opacity duration-500 ease-in-out flex items-center justify-center px-12 ${
        isFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full grid grid-cols-12 items-center text-[10px] tracking-[0.08rem] uppercase font-mono leading-none">
        
        {/* Column 1: Brand Identifier */}
        <div className="col-span-3 text-[#383838]">
          <span className="inline-block transition-opacity duration-300">EUNOIA OS</span>
        </div>

        {/* Column 2: Status Text */}
        <div className="col-span-2 flex items-center">
          <span className="inline-block">INITIALISING</span>
          <span className="inline-flex gap-[2px] pl-[2px]">
            <span className="animate-[console-log_0.9s_step-start_infinite] delay-150">.</span>
            <span className="animate-[console-log_0.9s_step-start_infinite] delay-300">.</span>
            <span className="animate-[console-log_0.9s_step-start_infinite] delay-450">.</span>
          </span>
        </div>

        {/* Column 3: The Logo SVG */}
        <div className="col-span-2 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 70 17"
            fill="none"
            className="w-[70px] h-[17px] text-[#FFFFFF] animate-pulse"
          >
            <path
              d="M34.8804 0.70874V2.87898H32.5077V0.70874H27.4438V2.88011H32.5066V16.539H34.8804V2.88011H39.9442V0.70874H34.8804Z"
              fill="currentColor"
            ></path>
            <path
              d="M69.9998 2.85945V0.710693H61.9295V2.85832H59.6021V16.541H69.9998V14.3922H61.9295V9.44025H69.9998V7.31409H61.9295V2.85945H69.9998Z"
              fill="currentColor"
            ></path>
            <path
              d="M54.3059 8.0354H49.3109V10.2068H54.3059C54.1025 12.9433 51.7739 14.4353 49.1742 14.4353C45.8062 14.4353 43.6821 11.744 43.6821 8.62317C43.6821 5.50232 45.8073 2.811 49.1742 2.811C51.5028 2.811 53.0619 3.96394 53.8302 5.63796L55.978 4.53024C54.8934 2.15541 52.4744 0.505127 49.1742 0.505127C44.473 0.505127 41.2632 4.0555 41.2632 8.62317C41.2632 13.1908 44.473 16.7412 49.0838 16.7412C51.2305 16.7412 53.1523 15.9274 54.3273 14.4568V16.5378H56.5429V8.0354H54.3047H54.3059Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.2085 8.57935C13.8464 10.2173 16.5091 10.2173 18.147 8.57935H18.1489L19.1392 9.56958C17.5013 11.2076 17.5013 13.872 19.1392 15.51L18.1489 16.5002C16.511 14.8623 13.8473 14.8622 12.2095 16.5002L11.2192 15.51C12.8571 13.872 12.8571 11.2076 11.2192 9.56958L9.56982 7.92017L7.91943 9.56958C6.28156 11.2076 6.28157 13.872 7.91943 15.51L6.9292 16.5002C5.29132 14.8623 2.62761 14.8622 0.989746 16.5002L0.000488281 15.51C1.63821 13.872 1.63825 11.2076 0.000488281 9.56958L0.989746 8.58032C2.62762 10.2182 5.29038 10.2183 6.92822 8.58032L8.57861 6.92993L5.27881 3.63013L3.9585 4.94946L2.63916 3.63013L3.9585 2.30981L2.63916 0.990479L3.62939 0.000244141L12.2085 8.57935ZM5.51025 10.9885C4.49766 11.2779 3.42035 11.2779 2.40869 10.9885C2.698 12.0003 2.69799 13.0783 2.40869 14.0901C3.42035 13.8007 4.4986 13.8007 5.51025 14.0901C5.22094 13.0783 5.22094 12.0003 5.51025 10.9885ZM16.729 10.9885C15.7173 11.2779 14.6391 11.2779 13.6274 10.9885C13.9167 12.0003 13.9167 13.0783 13.6274 14.0901C14.6391 13.8007 15.7173 13.8007 16.729 14.0901C16.4397 13.0783 16.4397 12.0003 16.729 10.9885Z"
              fill="currentColor"
            ></path>
            <path d="M16.4976 6.27075L15.1772 7.59009L13.8579 6.27075L15.1772 4.95044L16.4976 6.27075Z" fill="currentColor"></path>
            <path d="M5.27979 6.2688L3.95947 7.58911L2.64014 6.2688L3.9585 4.94946L5.27979 6.2688Z" fill="currentColor"></path>
            <path
              d="M16.4985 0.990479L15.1782 2.30981L16.4985 3.63013L15.1782 4.94946L13.8579 3.63013L11.27 6.21899L10.2808 5.22876L15.5083 0.000244141L16.4985 0.990479Z"
              fill="currentColor"
            ></path>
            <path d="M2.63916 3.63013L1.31982 4.95044L-0.000488281 3.63013L1.31982 2.30981L2.63916 3.63013Z" fill="currentColor"></path>
            <path d="M19.1382 3.63013L17.8179 4.94946L16.4985 3.63013L17.8179 2.30981L19.1382 3.63013Z" fill="currentColor"></path>
          </svg>
        </div>

        {/* Column 4: System Details */}
        <div className="col-span-3 text-[#383838] pl-4">
          <div className="flex flex-col gap-[2px]">
            <span>TGE | EUNOIA OS</span>
            <span className="flex items-center gap-1.5">
              <span>{percent.toString().padStart(3, '0')}</span>
              <svg width="14" height="6" viewBox="0 0 28 8" fill="none" className="text-[#383838] w-7 h-1.5">
                <path
                  d="M23.1249 -7.76888e-07L27.1992 -9.53674e-07L27.1992 4.04612L23.2177 4.04612L23.2177 8L19.1434 8L19.1434 4.04612L15.5102 4.04612L15.5102 8L11.4343 8L11.4343 4.04612L7.80117 4.04612L7.80117 8L3.72682 8L3.72682 4.04612L-0.000778372 4.04612L-0.000778551 2.26533e-07L4.07357 4.97471e-08L4.07357 3.95388L7.70829 3.95388L7.70829 -1.07963e-07L11.7826 -2.84749e-07L11.7826 3.95388L15.4158 3.95388L15.4158 -4.42392e-07L19.4902 -6.19178e-07L19.4902 3.95388L23.1249 3.95388L23.1249 -7.76888e-07Z"
                  fill="currentColor"
                />
              </svg>
              <span>A NEW CLASS</span>
            </span>
          </div>
        </div>

        {/* Column 5: Tagline Summary */}
        <div className="col-span-2 text-right text-[#383838]">
          <span>A NEW CLASS OF SYSTEM</span>
        </div>

      </div>
    </div>
  );
}
