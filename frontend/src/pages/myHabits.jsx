import HabitList from "../components/HabitList";
import NavBar from "../components/NavBar";
import useHabitData from "../hooks/useHabitData";

const MyHabits = () => {
  const { habitCompletions, toggleHabit, addCompletionHabit } = useHabitData();

  return (
    <div className="min-h-screen bg-white">
      <NavBar onAddHabit={addCompletionHabit} />
      <h1>My Habits</h1>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <HabitList
          habitCompletions={habitCompletions}
          toggleHabit={toggleHabit}
          addHabit={addCompletionHabit}
        />
      </div>
    </div>
  );
};

export default MyHabits;
