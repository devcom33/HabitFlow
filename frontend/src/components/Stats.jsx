const Stats = ({ habitCompletions, habitData }) => {
  const today = new Date().toISOString().split("T")[0];
  const completed = habitData[today] || 0;
  const total = habitCompletions.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const calculateStreak = () => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateKey = currentDate.toISOString().split("T")[0];
      if ((habitData[dateKey] || 0) > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  return (
    <div className="inline-flex items-center gap-6 px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg">
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">
          {completed}/{total}
        </div>
        <div className="text-xs text-gray-600">Today's Progress</div>
      </div>
      <div className="w-px h-8 bg-gray-300" />
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{percent}%</div>
        <div className="text-xs text-gray-600">Completion Rate</div>
      </div>
      <div className="w-px h-8 bg-gray-300" />
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600">{total}</div>
        <div className="text-xs text-gray-600">Total Habits</div>
      </div>
      {/*<div className="text-center col-span-2">
          <div className="text-3xl font-bold text-purple-600">
            {currentStreak}
          </div>
          <div className="text-gray-600 text-sm">Day Streak</div>
  </div>*/}
    </div>
  );
};

export default Stats;
