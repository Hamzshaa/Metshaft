import React from "react";

export default function ThemeProvider({ children }) {
  return (
    <div className="bg-slate-50 text-slate-800 dark:bg-[#15202B] dark:text-white min-h-screen">
      {children}
    </div>
  );
}
