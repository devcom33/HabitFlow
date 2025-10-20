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
            {completion.habit.category?.name && (
              <span className="inline-flex items-center px-2 py-0.5 mb-1 rounded-full bg-gray-100 text-gray-700 text-[10px] sm:text-xs font-medium">
                {completion.habit.category.name}
              </span>
            )}
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
            role="checkbox"
            aria-checked={completion.completed}
            aria-label={
              completion.completed
                ? "Mark as not completed"
                : "Mark as completed"
            }
            title={completion.completed ? "Completed" : "Mark as done"}
            className={`group relative flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-full border flex items-center justify-center
    transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500
    focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95
    ${
      completion.completed
        ? "border-green-500 bg-white text-green-600"
        : "border-gray-300 bg-white text-gray-400 hover:bg-gray-50 hover:border-gray-400"
    }`}
          >
            <svg
              className={`w-4 h-4 transition-all duration-150
      ${
        completion.completed
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 group-hover:opacity-60"
      }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">
              {completion.completed
                ? "Mark as not completed"
                : "Mark as completed"}
            </span>
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
