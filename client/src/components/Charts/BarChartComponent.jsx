import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  Rectangle,
  Legend,
  XAxis,
} from "recharts";
import propTypes from "prop-types";

export default function BarChartComponent({ chartData }) {
  return (
    <div className="border-2 border-gray-100 dark:border-gray-800 shadow-xl my-4 py-4 h-[250px] w-full">
      <h1 className="font-semibold text-xl px-2 pb-2">
        Book Completion Status
      </h1>

      <div className="w-full h-[150px]">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={chartData}>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />

            <Bar
              dataKey="progress"
              fill="#827cf3"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="finished"
              fill="#6df3a0"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
            <Bar
              dataKey="total"
              fill="#f9fc43"
              activeBar={<Rectangle fill="orange" stroke="yellow" />}
            />
            <XAxis dataKey="date" />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

BarChartComponent.propTypes = {
  chartData: propTypes.array,
};
