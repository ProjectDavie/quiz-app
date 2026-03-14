"use client";

import { useEffect, useState } from "react";

interface Props {
  userName: string;
}

export default function UploadHeader({ userName }: Props) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  // Format date & time
  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex justify-between items-center mb-6 px-2 sm:px-0">
      {/* Left: Current Date & Time */}
      <div className="text-gray-700 font-medium text-sm sm:text-base">
        {formattedDate} — {formattedTime}
      </div>

      {/* Right: Welcome User */}
      <div className="text-gray-900 font-semibold text-lg">
        Welcome {userName}
      </div>
    </div>
  );
}