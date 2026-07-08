import { useMemo, useState } from "react";
import { useGetTodos } from "../hooks/todo.get.js";
import { useCreateTodo } from "../hooks/todo.create.js";
import { useUpdateTodo } from "../hooks/todo.update.js";
import { useDeleteTodo } from "../hooks/todo.delete.js";

function TodoComponent() {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const todosQuery = useGetTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const todos = todosQuery.data ?? [];
  const loading = todosQuery.isLoading || todosQuery.isFetching;

  // NOTE: if your API returns Mongo's `_id` instead of `id`, every todo.id
  // will be `undefined`, which makes editId === todo.id true for ALL rows
  // once you start editing one. Best fix: alias `_id` -> `id` in your
  // FastAPI response model. This getId() is a defensive fallback only.
  const getId = (todo) => todo?.id ?? todo?._id;

  // react-query v5 renamed mutation.isLoading -> mutation.isPending.
  // This helper works whichever version you're on.
  const isPending = (mutation) => mutation.isPending ?? mutation.isLoading ?? false;

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    createTodo.mutate(
      { title: title.trim() },
      { onSuccess: () => setTitle("") }
    );
  };

  const handleEdit = (todo) => {
    setEditId(getId(todo));
    setEditingTitle(todo.title);
  };

  const handleSaveEdit = () => {
    if (!editingTitle.trim()) return;

    updateTodo.mutate(
      { id: editId, title: editingTitle.trim() },
      {
        onSuccess: () => {
          setEditId(null);
          setEditingTitle("");
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditingTitle("");
  };

  const handleToggleComplete = (todo) => {
    updateTodo.mutate({ id: getId(todo), completed: !todo.completed });
  };

  const handleMarkCompleted = (todo) => {
    updateTodo.mutate({ id: getId(todo), completed: true });
  };

  const handleDelete = (todoId) => {
    deleteTodo.mutate(todoId);
  };

  const sortedTodos = useMemo(
    () => [...todos].sort((a, b) => Number(a.completed) - Number(b.completed)),
    [todos]
  );

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
      <form onSubmit={handleAddTask} className="space-y-4">
        <label htmlFor="new-task-input" className="block text-sm font-semibold text-slate-200">
          New task
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="new-task-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a task name"
            className="min-h-[46px] flex-1 rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isPending(createTodo) || !title.trim()}
          >
            {isPending(createTodo) ? "Adding..." : "Add task"}
          </button>
        </div>
        {createTodo.isError && (
          <p className="text-sm text-red-400">
            Couldn't add task. Please try again.
          </p>
        )}
      </form>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Tasks</h2>
          <p className="text-sm text-slate-400">
            {loading ? "Loading..." : `${todos.length} total`}
          </p>
        </div>

        {todosQuery.isError && (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
            Couldn't load tasks. Check that the backend is running.
          </div>
        )}

        <div className="space-y-3">
          {sortedTodos.length === 0 && !loading ? (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/50 p-8 text-center text-slate-500">
              No tasks yet. Add one to get started.
            </div>
          ) : (
            sortedTodos.map((todo) => {
              const todoId = getId(todo);
              const isEditing = editId !== null && editId === todoId;

              return (
                <article
                  key={todoId}
                  className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 shadow-sm shadow-slate-950/20"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      {isEditing ? (
                        <input
                          autoFocus
                          value={editingTitle}
                          onChange={(event) => setEditingTitle(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") handleSaveEdit();
                            if (event.key === "Escape") handleCancelEdit();
                          }}
                          className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-50 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleToggleComplete(todo)}
                          className="text-left text-base font-semibold leading-6 text-white"
                        >
                          <span
                            className={
                              todo.completed
                                ? "line-through text-slate-400"
                                : "text-white"
                            }
                          >
                            {todo.title}
                          </span>
                        </button>
                      )}
                      <p className="mt-1 text-sm text-slate-500">
                        {todo.completed ? "Completed" : "Not completed"}
                      </p>
                    </div>

                    <div className="flex flex-shrink-0 flex-wrap gap-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={handleSaveEdit}
                            className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isPending(updateTodo) || !editingTitle.trim()}
                          >
                            {isPending(updateTodo) ? "Saving..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          {!todo.completed && (
                            <button
                              type="button"
                              onClick={() => handleMarkCompleted(todo)}
                              className="rounded-2xl bg-emerald-500/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                              disabled={isPending(updateTodo)}
                            >
                              {isPending(updateTodo) ? "Updating..." : "Mark as completed"}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleEdit(todo)}
                            className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(todoId)}
                            className="rounded-2xl border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isPending(deleteTodo)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default TodoComponent;