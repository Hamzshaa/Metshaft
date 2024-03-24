import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme == "dark" ? "dark" : ""}>
      <div className="bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {children}
      </div>
    </div>
  );
}
