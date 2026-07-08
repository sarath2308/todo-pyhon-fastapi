import TodoComponent from "./components/todo.component.jsx";
import "./App.css";

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Task Manager</h1>
          <p className="mt-2 text-slate-400">Add, edit, remove, and manage your tasks.</p>
        </header>

        <TodoComponent />
      </div>
    </main>
  );
}

export default App;