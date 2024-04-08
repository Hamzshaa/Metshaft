import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { LineChart, Line, Tooltip } from "recharts";

const Chart = ({
  icon,
  title,
  number,
  chartData,
  color,
  dataKey,
  percentage,
  link,
}) => {
  return (
    <div className="p-5 pb-1 border-2 border-white dark:border-gray-800 shadow-md rounded-md flex justify-between h-[200px] w-[360px] w-full">
      <div className="flex flex-col justify-between">
        <div className="flex-3 flex gap-2 items-center">
          <span
            style={{
              backgroundColor: color,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            className="text-2xl text-center p-3 rounded-full"
          >
            {icon}
          </span>
          <span className="font-semibold text-xl-end">{title}</span>
        </div>
        <div className="text-xl font-bold">{number}</div>
        <div className="" style={{ color: color }}>
          <Link to={link}>View all</Link>
        </div>
      </div>
      <div className="flex-2 flex flex-col justify-around">
        <div className="">
          <div className="">
            <LineChart
              width={150}
              height={120}
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <Tooltip
                contentStyle={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 60 }}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                yAxisId={0}
                dot={false}
              />
            </LineChart>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span
            className="font-semibold text-xl"
            style={{ color: percentage < 0 ? "tomato" : "limegreen" }}
          >
            {percentage}%
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-md font-light">
            this month
          </span>
        </div>
      </div>
    </div>
  );
};

Chart.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.string,
  chartData: PropTypes.array,
  color: PropTypes.string,
  dataKey: PropTypes.string,
  percentage: PropTypes.number,
  link: PropTypes.string,
};
export default Chart;
