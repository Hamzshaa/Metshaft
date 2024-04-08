import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";
import propTypes from "prop-types";

export default function BarChartComponent({
  title,
  chartData,
  dataKey,
  color,
}) {
  return (
    <div className="border-2 border-gray-100 dark:border-gray-800 shadow-xl my-4 py-4 h-[285px] w-full">
      <h1 className="font-semibold text-xl px-2 pb-2">{title}</h1>

      <div className="w-full h-[150px]">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={chartData}>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

BarChartComponent.propTypes = {
  title: propTypes.string,
  chartData: propTypes.array,
  dataKey: propTypes.string,
  color: propTypes.string,
};
