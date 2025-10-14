import NavBar from "../components/NavBar";
import HabitList from "../components/HabitList";
import Stats from "../components/Stats";
import useHabitData from "../hooks/useHabitData";

const Dashboard = () => {
  const { habitCompletions, toggleHabit, addCompletionHabit, habitData } =
    useHabitData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavBar onAddHabit={addCompletionHabit} />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Welcome back Champion!
          </h1>
          <p className="text-gray-600">
            Track your daily habits and build lasting routines
          </p>
        </div>

        <div className="text-center mb-12">
          <div className="relative">
            <Stats habitCompletions={habitCompletions} habitData={habitData} />
          </div>
        </div>

        <HabitList
          habitCompletions={habitCompletions}
          toggleHabit={toggleHabit}
          addHabit={addCompletionHabit}
        />
      </div>

      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          "Success is the sum of small efforts repeated day in and day out." -
          Robert Collier
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
