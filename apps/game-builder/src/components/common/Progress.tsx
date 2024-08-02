"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Progress() {
  const pathname = usePathname();
  const stepPercentages = useRef(
    new Map<string, number>([
      ["/game/create", 20],
      ["/game/builder", 50],
      ["/game/confirm", 90],
    ])
  );

  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const stepPercentage = stepPercentages.current.get(pathname) || 0;
    setPercentage(stepPercentage);
  }, [pathname]);

  return (
    <div
      className={`w-full h-1 bg-gray-300 ${percentage === 0 ? "invisible" : ""}`}
    >
      <div
        className="h-1 bg-green-500 transition-all"
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
}
