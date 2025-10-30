import HabitList from "../components/HabitList";
import NavBar from "../components/NavBar";
import useHabitData from "../hooks/useHabitData";

const MyHabits = () => {
  const { addCompletionHabit } = useHabitData();

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <HabitList onAddHabit={addCompletionHabit} />
      </div>
    </div>
  );
};

export default MyHabits;
