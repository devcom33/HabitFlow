import { CheckCircle, Calendar } from "lucide-react";
import HabitItem from "./HabitItem";

const HabitList = ({ habitCompletions, toggleHabit }) => {
  const handleDayClick = (dateKey) => {
    console.log(`Clicked on ${dateKey}`);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 sm:p-6 shadow-lg">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          Today's Habits
        </h2>
        <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-4">
        {habitCompletions?.map((completion) => (
          <HabitItem
            key={completion.id}
            completion={completion}
            toggleHabit={toggleHabit}
            onDayClick={handleDayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitList;
