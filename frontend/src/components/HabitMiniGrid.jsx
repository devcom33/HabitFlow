import { RefreshCw } from "lucide-react";

const HabitMiniGrid = ({ habitData, onDayClick, loading, onRefresh }) => {
  const today = new Date();
  const startDate = new Date();

  startDate.setMonth(today.getMonth() - 3);

  const getDayIntensity = (date) => {
    const dateKey = date.toISOString().split("T")[0];
    const count = habitData[dateKey] || 0;
    if (count === 0) return "bg-gray-200";
    if (count <= 2) return "bg-green-400";
    return "bg-green-500";
  };

  const weeks = [];

  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  const diffInDays = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.ceil(diffInDays / 7);

  for (let week = 0; week < totalWeeks; week++) {
    const days = [];

    for (let day = 0; day < 7; day++) {
      const dayKey = new Date(currentDate).toISOString().split("T")[0];
      const isToday = dayKey === today.toISOString().split("T")[0];
      const isPastYear = currentDate.getFullYear() < today.getFullYear();

      const isWithinRange = currentDate >= startDate && currentDate <= today;

      if (!isPastYear && isWithinRange) {
        days.push(
          <div
            key={`${week}-${day}`}
            className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:scale-110 ${getDayIntensity(
              currentDate
            )} ${isToday ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => onDayClick && onDayClick(dayKey)}
            title={`${currentDate.toDateString()}: ${
              habitData[dayKey] || 0
            } habits completed`}
          />
        );
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (days.length > 0) {
      weeks.push(
        <div key={week} className="flex flex-col gap-1">
          {days}
        </div>
      );
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
              title="Refresh grid data"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading grid data...</div>
        </div>
      ) : (
        <div className="flex gap-1 overflow-x-auto pb-2">{weeks}</div>
      )}

      <div className="text-xs text-gray-500 mt-2">
        Showing last 3 months: {startDate.toLocaleDateString()} to{" "}
        {today.toLocaleDateString()}
      </div>
    </div>
  );
};

export default HabitMiniGrid;
