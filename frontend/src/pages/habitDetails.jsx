import NavBar from "../components/NavBar";
import HabitGrid from "../components/HabitGrid";
import Stats from "../components/Stats";
import useHabitData from "../hooks/useHabitData";

const HabitDetails = () => {
  const { habitCompletions, habitData, gridLoading, refreshGridData } =
    useHabitData();

  const handleDayClick = (dateKey) => {
    console.log(`Clicked on ${dateKey}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <NavBar />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HabitGrid
              habitData={habitData}
              onDayClick={handleDayClick}
              loading={gridLoading}
              onRefresh={refreshGridData}
            />
          </div>

          <div className="space-y-6">
            <Stats habitCompletions={habitCompletions} habitData={habitData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
