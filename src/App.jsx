import React, { useState } from 'react';
import { Plus, Check, X, Trash2, RotateCcw, Info, ListTodo } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete Laboratory for DCIT 22', completed: false },
    { id: 2, text: 'Review React State and Event Handling', completed: true }
  ]);
  const [newTask, setNewTask] = useState('');
  const [activeTab, setActiveTab] = useState('app');

  // Task Handlers
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
    setNewTask('');
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleClearAll = () => {
    if (tasks.length === 0) return;
    if (window.confirm('Are you sure you want to clear all tasks?')) setTasks([]);
  };

  return (
    <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-pink-600 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <ListTodo className="h-8 w-8 text-pink-100" />
            <div>
              <h1 className="text-xl font-bold tracking-wide">Your To-Do List</h1>
              <p className="text-xs text-pink-100">DCIT 22 - Laboratory</p>
            </div>
          </div>
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab('app')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'app' ? 'bg-white text-pink-700 shadow' : 'hover:bg-pink-500 text-pink-50'
              }`}
            >
              To-Do Interface
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-1 ${
                activeTab === 'guide' ? 'bg-white text-pink-700 shadow' : 'hover:bg-pink-500 text-pink-50'
              }`}
            >
              <Info className="w-4 h-4 mr-1" /> User Guide
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'app' ? (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-200">
              <form onSubmit={handleAddTask} className="flex gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter a new task..."
                  className="flex-1 px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-900 placeholder-pink-300"
                />
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition shadow-sm"
                >
                  <Plus className="w-5 h-5" /> Add Task
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-200">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-pink-100">
                <h2 className="text-lg font-bold text-pink-800">Your Tasks ({tasks.length})</h2>
                {tasks.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Clear All
                  </button>
                )}
              </div>

              {tasks.length === 0 ? (
                <div className="text-center py-10 text-pink-300">No tasks available. Add one above to get started!</div>
              ) : (
                <ul className="space-y-3">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition ${
                        task.completed ? 'bg-pink-50/60 border-pink-200' : 'bg-white border-pink-100'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase ${
                            task.completed ? 'bg-pink-200 text-pink-800' : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {task.completed ? 'Done' : 'Not Done'}
                        </span>
                        <span className={`text-sm truncate ${task.completed ? 'line-through text-pink-300' : 'text-pink-900 font-medium'}`}>
                          {task.text}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleTask(task.id)}
                          className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
                            task.completed ? 'bg-pink-100 hover:bg-pink-200 text-pink-700' : 'bg-pink-500 hover:bg-pink-600 text-white'
                          }`}
                        >
                          {task.completed ? <><X className="w-4 h-4" /> Undo</> : <><Check className="w-4 h-4" /> Mark Done</>}
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-pink-200 space-y-6">
            <h2 className="text-xl font-bold text-pink-800 border-b border-pink-100 pb-3">Instructions & User Guide</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-4 rounded-xl bg-pink-50 border border-pink-100">
                <div className="font-semibold text-pink-700 mb-2">1. Adding Tasks</div>
                <p className="text-sm text-pink-600">Type into the input field and click <strong>Add Task</strong> to create new items.</p>
              </div>
              <div className="p-4 rounded-xl bg-pink-50 border border-pink-100">
                <div className="font-semibold text-pink-700 mb-2">2. Toggle Status</div>
                <p className="text-sm text-pink-600">Click <strong>Mark Done</strong> or <strong>Undo</strong> to change task status between Done and Not Done.</p>
              </div>
              <div className="p-4 rounded-xl bg-pink-50 border border-pink-100">
                <div className="font-semibold text-pink-700 mb-2">3. Deleting Tasks</div>
                <p className="text-sm text-pink-600">Click the trash icon to delete individual tasks, or <strong>Clear All</strong> to remove all tasks.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-pink-600 text-white py-4 px-6 mt-8 shadow-inner">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-sm">
          <span>BSIT 3-3</span>
          <span className="font-bold">Jasmine S. Lapaz</span>
        </div>
      </footer>
    </div>
  );
}