import propTypes from "prop-types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function PieChartComponent({ data }) {
  return (
    <div className="h-full w-full border-2 border-gray-100 dark:border-gray-800 flex flex-col justify-between shadow-xl px-2 py-4 my-2">
      <h1 className="font-semibold text-xl">On Progress vs. Finished</h1>
      <div className="w-full h-full align-center flex justify-center">
        <ResponsiveContainer width="99%" height={250}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={"70"}
              outerRadius={"90"}
              paddingAngle={5}
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-8 text-sm px-5">
        {data.map((item) => (
          <div className="flex flex-col gap-3 items-center" key={item.name}>
            <div className="flex gap-2 items-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="">{item.name}</span>
            </div>
            <span className="">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

PieChartComponent.propTypes = {
  data: propTypes.array.isRequired,
};
