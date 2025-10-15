import HabitMiniGrid from "./HabitMiniGrid";
import useHabitGrid from "../hooks/useHabitGrid";

const HabitItem = ({ completion, toggleHabit, onDayClick }) => {
  const { habitGridData, refreshGridData, gridLoading } = useHabitGrid(
    completion.habit.id
  );

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
      <div
        className={`absolute top-0 left-0 w-full h-1 ${
          completion.completed
            ? "bg-gradient-to-r from-green-400 to-green-600"
            : "bg-gray-300"
        }`}
      />

      <div className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 mr-3 sm:mr-4">
            <h3
              className={`font-medium text-base sm:text-lg transition-all duration-200 ${
                completion.completed
                  ? "text-green-600 opacity-90"
                  : "text-gray-800 group-hover:text-gray-700"
              }`}
            >
              {completion.habit.name}
            </h3>
            <div
              className={`text-xs sm:text-sm mt-1 ${
                completion.completed ? "text-green-600/70" : "text-gray-500"
              }`}
            >
              {completion.completed ? "Completed today" : "Not completed"}
            </div>
          </div>

          <button
            onClick={() => toggleHabit(completion.id)}
            className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
              completion.completed
                ? "border-green-600 bg-green-100 text-green-600"
                : "border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {completion.completed ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <div className="w-2 h-2 rounded-full bg-gray-500" />
            )}
          </button>
        </div>

        <div className="relative">
          <HabitMiniGrid
            habitData={habitGridData}
            onDayClick={onDayClick}
            loading={gridLoading}
            onRefresh={refreshGridData}
          />
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
