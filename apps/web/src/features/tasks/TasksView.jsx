import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Calendar, 
  Trash2, 
  CheckCircle, 
  Edit, 
  AlertCircle, 
  X,
  Target,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useTaskStore } from '../../app/store/taskStore.js';
import { useGoalStore } from '../../app/store/goalStore.js';
import { useAppStore } from '../../app/store/useAppStore.js';
import { 
  Button, 
  Input, 
  Loader, 
  Skeleton, 
  EmptyState,
  Modal 
} from '../../components/ui';

/**
 * Format timestamp into clean editorial reader layout
 */
function formatDate(dateString) {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'No due date';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function TasksView() {
  const { theme } = useAppStore();
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    updateTaskStatus,
    clearError
  } = useTaskStore();

  const {
    goals,
    fetchGoals
  } = useGoalStore();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    goalId: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchTasks();
    fetchGoals();
  }, [fetchTasks, fetchGoals]);

  // Compute Stats
  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedCount / totalTasks) * 100) 
    : 0;

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      goalId: ''
    });
    setFormErrors({});
    setCreateModalOpen(true);
  };

  const handleOpenEdit = (task, e) => {
    if (e) e.stopPropagation();
    let formattedDate = '';
    if (task.dueDate) {
      const d = new Date(task.dueDate);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toISOString().split('T')[0];
      }
    }
    setFormData({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'pending',
      priority: task.priority || 'medium',
      dueDate: formattedDate,
      goalId: task.goalId || ''
    });
    setSelectedTask(task);
    setFormErrors({});
    setEditModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (formData.dueDate) {
      const inputDate = new Date(formData.dueDate);
      if (isNaN(inputDate.getTime())) {
        errors.dueDate = 'Please select a valid date';
      }
    }
    return errors;
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const payload = {
        ...formData,
        goalId: formData.goalId || null,
        dueDate: formData.dueDate || null
      };
      await createTask(payload);
      setCreateModalOpen(false);
    } catch (err) {
      setFormErrors({ submit: err.message || 'Operation failed' });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const payload = {
        ...formData,
        goalId: formData.goalId || null,
        dueDate: formData.dueDate || null
      };
      await updateTask(selectedTask.id, payload);
      setEditModalOpen(false);
    } catch (err) {
      setFormErrors({ submit: err.message || 'Operation failed' });
    }
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to permanently delete this task?')) {
      try {
        await deleteTask(id);
      } catch (err) {
        alert(err.message || 'Deletion failed');
      }
    }
  };

  const handleComplete = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await completeTask(id);
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleMoveStatus = async (task, newStatus, e) => {
    if (e) e.stopPropagation();
    try {
      await updateTaskStatus(task.id, newStatus);
    } catch (err) {
      alert(err.message || 'Status shift failed');
    }
  };

  // Group tasks by status
  const pendingTasks = tasks.filter((t) => t.status === 'pending');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  const priorityStyles = {
    high: 'border-error/20 bg-error/5 text-error',
    medium: 'border-yellow-500/20 bg-yellow-500/5 text-yellow-500',
    low: 'border-success/20 bg-success/5 text-success'
  };

  const renderTaskCard = (task) => {
    const matchedGoal = goals.find((g) => g.id === task.goalId);
    const isCompleted = task.status === 'completed';

    return (
      <motion.div
        layout
        key={task.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`p-4 transition-all duration-300 flex flex-col justify-between relative group ${
          theme === 'dark-design'
            ? 'bg-[#09090b] border border-white/5 hover:border-white/15 rounded-2xl shadow-lg'
            : 'bg-white/5 border border-white/10 hover:border-white/20'
        }`}
      >
        <div className="space-y-2">
          {/* Top Row: Priority & Goal */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2 py-0.5 border text-[8px] tracking-widest uppercase transition-all duration-300 ${
              theme === 'dark-design'
                ? 'border-white/10 bg-white/5 rounded-full font-sans text-neutral-300 font-bold'
                : `font-mono ${priorityStyles[task.priority] || ''}`
            }`}>
              {task.priority}
            </span>
            {matchedGoal && (
              <span className={`px-2 py-0.5 border text-[8px] tracking-widest uppercase flex items-center gap-1 transition-all duration-300 ${
                theme === 'dark-design'
                  ? 'border-white/10 text-neutral-300 bg-white/5 rounded-full font-sans font-bold'
                  : 'border-[#8898e7]/20 text-[#8898e7] bg-[#8898e7]/5 font-mono'
              }`}>
                <Target size={8} />
                {matchedGoal.title.length > 15 ? `${matchedGoal.title.substring(0, 15)}...` : matchedGoal.title}
              </span>
            )}
          </div>

          <h4 className={`text-xs font-bold tracking-wide uppercase text-white ${isCompleted ? 'line-through opacity-50' : ''} ${
            theme === 'dark-design' ? 'font-sans' : ''
          }`}>
            {task.title}
          </h4>

          {task.description && (
            <p className={`text-[10px] leading-relaxed line-clamp-2 ${
              theme === 'dark-design' ? 'text-neutral-400 font-sans' : 'text-[#8c8c8c] font-mono'
            }`}>
              {task.description}
            </p>
          )}
        </div>

        {/* Bottom Metadata & Controls */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className={`flex items-center gap-1.5 text-[#6c6c6c] text-[9px] ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>
            <Calendar size={10} />
            <span>{formatDate(task.dueDate)}</span>
          </div>

          <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
            {/* Status shifts */}
            {task.status === 'pending' && (
              <button
                onClick={(e) => handleMoveStatus(task, 'in_progress', e)}
                title="Start Task"
                className="p-1 hover:text-[#8898e7] text-[#6c6c6c] transition-colors"
              >
                <ArrowRight size={12} />
              </button>
            )}
            {task.status === 'in_progress' && (
              <>
                <button
                  onClick={(e) => handleMoveStatus(task, 'pending', e)}
                  title="Move back to To Do"
                  className="p-1 hover:text-[#8c8c8c] text-[#6c6c6c] transition-colors"
                >
                  <ArrowLeft size={12} />
                </button>
                <button
                  onClick={(e) => handleComplete(task.id, e)}
                  title="Complete Task"
                  className="p-1 hover:text-[#00ffb2] text-[#6c6c6c] transition-colors"
                >
                  <CheckCircle size={12} />
                </button>
              </>
            )}
            {task.status === 'completed' && (
              <button
                onClick={(e) => handleMoveStatus(task, 'in_progress', e)}
                title="Reopen Task"
                className="p-1 hover:text-yellow-500 text-[#6c6c6c] transition-colors"
              >
                <ArrowLeft size={12} />
              </button>
            )}

            <button 
              onClick={(e) => handleOpenEdit(task, e)}
              title="Edit Task"
              className="p-1 hover:text-white text-[#6c6c6c] transition-colors"
            >
              <Edit size={12} />
            </button>
            <button 
              onClick={(e) => handleDelete(task.id, e)}
              title="Delete Task"
              className="p-1 hover:text-[#ff4d4d] text-[#6c6c6c] transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`space-y-12 pb-24 ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>
      {/* Header Section */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b ${
        theme === 'dark-design' ? 'border-white/5' : 'border-white/10'
      }`}>
        <div>
          <h1 className={`text-3xl font-extrabold tracking-tight text-white uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Operational Tasks</h1>
          <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>
            Calibrate task state lists and Kanban parameters.
          </p>
        </div>
        <Button 
          onClick={handleOpenCreate}
          className={`bg-white text-black border-white hover:bg-white/90 self-start md:self-auto text-[10px] tracking-widest font-bold uppercase py-2 px-4 flex items-center gap-2 ${
            theme === 'dark-design' ? 'rounded-xl font-sans' : 'rounded-none font-mono'
          }`}
        >
          <Plus size={14} />
          Create Task
        </Button>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="flex items-start gap-3 p-4 border border-error/30 bg-error/5 text-error text-xs relative">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold uppercase tracking-wider block mb-0.5">System Exception Detected</span>
            <p>{error}</p>
          </div>
          <button onClick={clearError} className="hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Task Statistics Section */}
      <section className={`grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b transition-all duration-300 ${
        theme === 'dark-design' 
          ? 'bg-[#09090b] border border-white/5 rounded-2xl p-6 shadow-xl mb-6' 
          : 'border-white/10'
      }`}>
        <div className="space-y-2">
          <span className={`text-[9px] text-[#6c6c6c] tracking-widest uppercase block ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Total Tasks</span>
          <div className="text-4xl font-black text-white font-sans tracking-tight">{totalTasks}</div>
        </div>
        <div className={`space-y-2 pl-6 ${theme === 'dark-design' ? 'border-l border-white/5' : 'border-l border-white/10'}`}>
          <span className={`text-[9px] text-[#6c6c6c] tracking-widest uppercase block ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Pending</span>
          <div className="text-4xl font-black text-[#8c8c8c] font-sans tracking-tight">{pendingCount}</div>
        </div>
        <div className={`space-y-2 pl-6 ${theme === 'dark-design' ? 'border-l border-white/5' : 'border-l border-white/10'}`}>
          <span className={`text-[9px] text-[#6c6c6c] tracking-widest uppercase block ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>In Progress</span>
          <div className="text-4xl font-black text-white font-sans tracking-tight">{inProgressCount}</div>
        </div>
        <div className={`space-y-2 pl-6 ${theme === 'dark-design' ? 'border-l border-white/5' : 'border-l border-white/10'}`}>
          <span className={`text-[9px] text-[#6c6c6c] tracking-widest uppercase block ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Completion Rate</span>
          <div className="text-4xl font-black text-[#00ffb2] font-sans tracking-tight">{completionPercentage}%</div>
        </div>
      </section>

      {/* Kanban Board columns */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 py-8 min-h-[300px] transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none gap-8' : 'border-y border-white/10'
      }`}>
        {/* To Do Column */}
        <div className={`space-y-4 ${
          theme === 'dark-design' ? 'bg-[#09090b] border border-white/5 p-6 rounded-2xl shadow-lg' : 'pr-0 md:pr-6'
        }`}>
          <h3 className={`text-sm uppercase tracking-wider border-b pb-2 font-bold flex justify-between items-center transition-all duration-300 ${
            theme === 'dark-design' ? 'text-white border-white/5 font-sans' : 'text-[#8c8c8c] border-white/10 font-mono'
          }`}>
            <span>To Do</span>
            <span className={`text-xs font-normal ${theme === 'dark-design' ? 'text-[#8c8c8c]' : 'text-[#6c6c6c]'}`}>{pendingTasks.length}</span>
          </h3>
          <div className="space-y-3">
            {loading && tasks.length === 0 ? (
              <Skeleton className={`h-24 w-full bg-white/5 ${theme === 'dark-design' ? 'rounded-2xl' : 'rounded-none'}`} />
            ) : pendingTasks.length === 0 ? (
              <div className={`text-[10px] uppercase py-4 ${theme === 'dark-design' ? 'text-neutral-400 font-sans' : 'text-[#6c6c6c] font-mono'}`}>No tasks in backlog</div>
            ) : (
              <AnimatePresence mode="popLayout">
                {pendingTasks.map(renderTaskCard)}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* In Progress Column */}
        <div className={`space-y-4 ${
          theme === 'dark-design' 
            ? 'bg-[#09090b] border border-white/5 p-6 rounded-2xl shadow-lg' 
            : 'px-0 md:px-6 md:border-x md:border-white/10'
        }`}>
          <h3 className={`text-sm uppercase tracking-wider border-b pb-2 font-bold flex items-center justify-between transition-all duration-300 ${
            theme === 'dark-design' ? 'text-white border-white/5 font-sans' : 'text-white border-[#8898e7]/30 font-mono'
          }`}>
            <span>In Progress</span>
            <span className="flex items-center gap-2">
              <span className={`text-xs font-normal ${theme === 'dark-design' ? 'text-[#8c8c8c]' : 'text-[#8c8c8c]'}`}>{inProgressTasks.length}</span>
              <span className={`h-1.5 w-1.5 rounded-full ${theme === 'dark-design' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-[#8898e7] animate-pulse'}`}></span>
            </span>
          </h3>
          <div className="space-y-3">
            {loading && tasks.length === 0 ? (
              <Skeleton className={`h-24 w-full bg-white/5 ${theme === 'dark-design' ? 'rounded-2xl' : 'rounded-none'}`} />
            ) : inProgressTasks.length === 0 ? (
              <div className={`text-[10px] uppercase py-4 ${theme === 'dark-design' ? 'text-neutral-400 font-sans' : 'text-[#6c6c6c] font-mono'}`}>No tasks active</div>
            ) : (
              <AnimatePresence mode="popLayout">
                {inProgressTasks.map(renderTaskCard)}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Completed Column */}
        <div className={`space-y-4 ${
          theme === 'dark-design' ? 'bg-[#09090b] border border-white/5 p-6 rounded-2xl shadow-lg' : 'pl-0 md:pl-6'
        }`}>
          <h3 className={`text-sm uppercase tracking-wider border-b pb-2 font-bold flex justify-between items-center transition-all duration-300 ${
            theme === 'dark-design' ? 'text-white border-white/5 font-sans' : 'text-[#6c6c6c] border-white/10 font-mono'
          }`}>
            <span>Completed</span>
            <span className={`text-xs font-normal ${theme === 'dark-design' ? 'text-[#8c8c8c]' : 'text-[#6c6c6c]'}`}>{completedTasks.length}</span>
          </h3>
          <div className="space-y-3">
            {loading && tasks.length === 0 ? (
              <Skeleton className={`h-24 w-full bg-white/5 ${theme === 'dark-design' ? 'rounded-2xl' : 'rounded-none'}`} />
            ) : completedTasks.length === 0 ? (
              <div className={`text-[10px] uppercase py-4 ${theme === 'dark-design' ? 'text-neutral-400 font-sans' : 'text-[#6c6c6c] font-mono'}`}>No tasks completed</div>
            ) : (
              <AnimatePresence mode="popLayout">
                {completedTasks.map(renderTaskCard)}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* CREATE TASK MODAL */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Initialize New Task"
        className="font-mono text-white"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-6">
          {formErrors.submit && (
            <div className="p-3 border border-error/20 bg-error/5 text-error text-[10px]">
              {formErrors.submit}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Task Title</label>
            <Input 
              placeholder="e.g. Implement middleware validations"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`text-xs bg-black border-white/20 focus:border-[#8898e7]/50 rounded-none ${formErrors.title ? 'border-error/50' : ''}`}
            />
            {formErrors.title && <span className="text-[9px] text-error block">{formErrors.title}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Description (Optional)</label>
            <textarea
              placeholder="Provide strategic details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="flex w-full border border-white/20 bg-black/40 px-4 py-3 text-xs text-foreground transition-all duration-300 placeholder:text-muted focus:outline-none focus:border-[#8898e7]/50 rounded-none resize-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Status</label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none appearance-none font-mono"
                >
                  <option value="pending">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#6c6c6c] text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Priority</label>
              <div className="relative">
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none appearance-none font-mono"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#6c6c6c] text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Due Date</label>
              <input 
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none font-mono ${formErrors.dueDate ? 'border-error/50' : ''}`}
              />
              {formErrors.dueDate && <span className="text-[9px] text-error block">{formErrors.dueDate}</span>}
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Link to Goal (Optional)</label>
              <div className="relative">
                <select
                  value={formData.goalId}
                  onChange={(e) => setFormData({ ...formData, goalId: e.target.value })}
                  className="flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none appearance-none font-mono"
                >
                  <option value="">None</option>
                  {goals.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title.length > 25 ? `${g.title.substring(0, 25)}...` : g.title}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#6c6c6c] text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button 
              type="submit" 
              className="flex-1 bg-white text-black border-white hover:bg-white/90 rounded-none text-[10px] uppercase font-bold"
            >
              INITIALIZE TASK
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setCreateModalOpen(false)}
              className="flex-1 border-white/20 hover:bg-white/5 rounded-none text-[10px] uppercase font-bold text-white"
            >
              CANCEL
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT TASK MODAL */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Recalibrate Task Parameters"
        className="font-mono text-white"
      >
        <form onSubmit={handleEditSubmit} className="space-y-6">
          {formErrors.submit && (
            <div className="p-3 border border-error/20 bg-error/5 text-error text-[10px]">
              {formErrors.submit}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Task Title</label>
            <Input 
              placeholder="e.g. Implement middleware validations"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`text-xs bg-black border-white/20 focus:border-[#8898e7]/50 rounded-none ${formErrors.title ? 'border-error/50' : ''}`}
            />
            {formErrors.title && <span className="text-[9px] text-error block">{formErrors.title}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Description (Optional)</label>
            <textarea
              placeholder="Provide strategic details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="flex w-full border border-white/20 bg-black/40 px-4 py-3 text-xs text-foreground transition-all duration-300 placeholder:text-muted focus:outline-none focus:border-[#8898e7]/50 rounded-none resize-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Status</label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none appearance-none font-mono"
                >
                  <option value="pending">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#6c6c6c] text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Priority</label>
              <div className="relative">
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none appearance-none font-mono"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#6c6c6c] text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Due Date</label>
              <input 
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none font-mono ${formErrors.dueDate ? 'border-error/50' : ''}`}
              />
              {formErrors.dueDate && <span className="text-[9px] text-error block">{formErrors.dueDate}</span>}
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Link to Goal (Optional)</label>
              <div className="relative">
                <select
                  value={formData.goalId}
                  onChange={(e) => setFormData({ ...formData, goalId: e.target.value })}
                  className="flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none appearance-none font-mono"
                >
                  <option value="">None</option>
                  {goals.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title.length > 25 ? `${g.title.substring(0, 25)}...` : g.title}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#6c6c6c] text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button 
              type="submit" 
              className="flex-1 bg-white text-black border-white hover:bg-white/90 rounded-none text-[10px] uppercase font-bold"
            >
              SAVE CHANGES
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setEditModalOpen(false)}
              className="flex-1 border-white/20 hover:bg-white/5 rounded-none text-[10px] uppercase font-bold text-white"
            >
              CANCEL
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
