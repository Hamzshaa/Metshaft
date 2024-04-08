import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Group A", value: 400, color: "#FFBB28" },
  { name: "Group B", value: 300, color: "#FF8042" },
  { name: "Group C", value: 300, color: "#FF4E42" },
  { name: "Group D", value: 200, color: "#FF4E42" },
];
export default function PieChartComponent() {
  return (
    <div className="h-full w-full border-2 border-gray-100 dark:border-gray-800 flex flex-col justify-between shadow-xl px-2 py-4 my-2">
      <h1 className="font-semibold text-xl">Leads by Source</h1>
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

      <div className="flex justify-between gap-3 text-sm px-5">
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
