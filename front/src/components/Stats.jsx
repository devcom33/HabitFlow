import React from "react";
import { TrendingUp } from "lucide-react";

const Stats = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        Statistics
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400">1/4</div>
          <div className="text-gray-400 text-sm">Today's Progress</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">25%</div>
          <div className="text-gray-400 text-sm">Completion Rate</div>
        </div>
        <div className="text-center col-span-2">
          <div className="text-3xl font-bold text-purple-400">3</div>
          <div className="text-gray-400 text-sm">Day Streak</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
