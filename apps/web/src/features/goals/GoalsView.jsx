import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Calendar, 
  Tag, 
  Trash2, 
  CheckCircle, 
  Archive, 
  Edit, 
  AlertCircle, 
  X 
} from 'lucide-react';
import { useGoalStore } from '../../app/store/goalStore.js';
import { 
  Button, 
  Input, 
  Loader, 
  Skeleton, 
  EmptyState 
} from '../../components/ui';

// Shared Modal wrapper from design system
import { Modal } from '../../components/ui';

/**
 * Format timestamp into clean editorial reader layout
 */
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Main Goals View Controller
 */
export function GoalsView() {
  const {
    goals,
    activeGoals,
    completedGoals,
    archivedGoals,
    loading,
    error,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    completeGoal,
    archiveGoal,
    clearError
  } = useGoalStore();

  const [activeTab, setActiveTab] = useState('all'); // all, active, completed, archived
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    targetDate: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // Derive stats
  const totalGoals = goals.length;
  const activeGoalsCount = activeGoals.length;
  const completedGoalsCount = completedGoals.length;
  const completionPercentage = totalGoals > 0 
    ? Math.round((completedGoalsCount / totalGoals) * 100) 
    : 0;

  // Filter list based on selected tab
  const getFilteredGoals = () => {
    switch (activeTab) {
      case 'active': return activeGoals;
      case 'completed': return completedGoals;
      case 'archived': return archivedGoals;
      default: return goals;
    }
  };

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      targetDate: ''
    });
    setFormErrors({});
    setCreateModalOpen(true);
  };

  const handleOpenEdit = (goal, e) => {
    e.stopPropagation();
    let formattedDate = '';
    if (goal.targetDate) {
      const d = new Date(goal.targetDate);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toISOString().split('T')[0];
      }
    }
    setFormData({
      title: goal.title || '',
      description: goal.description || '',
      category: goal.category || '',
      priority: goal.priority || 'medium',
      targetDate: formattedDate
    });
    setSelectedGoal(goal);
    setFormErrors({});
    setEditModalOpen(true);
  };

  const handleOpenDetail = (goal) => {
    setSelectedGoal(goal);
    setDetailModalOpen(true);
  };

  // Form validations
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }

    if (!formData.priority) {
      errors.priority = 'Priority is required';
    }

    if (!formData.targetDate) {
      errors.targetDate = 'Target Date is required';
    } else {
      const inputDate = new Date(formData.targetDate);
      if (isNaN(inputDate.getTime())) {
        errors.targetDate = 'Please select a valid date';
      } else if (inputDate <= new Date()) {
        errors.targetDate = 'Target date must be in the future';
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
      await createGoal(formData);
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
      await updateGoal(selectedGoal.id, formData);
      setEditModalOpen(false);
      if (detailModalOpen && selectedGoal.id === selectedGoal.id) {
        setSelectedGoal({ ...selectedGoal, ...formData });
      }
    } catch (err) {
      setFormErrors({ submit: err.message || 'Operation failed' });
    }
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to permanently delete this goal?')) {
      try {
        await deleteGoal(id);
        if (detailModalOpen && selectedGoal?.id === id) {
          setDetailModalOpen(false);
        }
      } catch (err) {
        alert(err.message || 'Deletion failed');
      }
    }
  };

  const handleComplete = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await completeGoal(id);
      if (detailModalOpen && selectedGoal?.id === id) {
        const updated = { ...selectedGoal, status: 'completed', completedAt: new Date() };
        setSelectedGoal(updated);
      }
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleArchive = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await archiveGoal(id);
      if (detailModalOpen && selectedGoal?.id === id) {
        const updated = { ...selectedGoal, status: 'archived' };
        setSelectedGoal(updated);
      }
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const filteredGoals = getFilteredGoals();

  return (
    <div className="space-y-12 pb-24 font-mono">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase font-mono">Strategic Goals</h1>
          <p className="text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase font-mono">
            Define milestone targets to calibrate task boards and learning pathways.
          </p>
        </div>
        <Button 
          onClick={handleOpenCreate}
          className="bg-white text-black border-white hover:bg-white/90 self-start md:self-auto rounded-none text-[10px] tracking-widest font-bold uppercase py-2 px-4 flex items-center gap-2"
        >
          <Plus size={14} />
          Create Goal
        </Button>
      </div>

      {/* 2. Global Error Warning Banner */}
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

      {/* 3. Goal Statistics Section (Cardless Editorial grid) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b border-white/10">
        <div className="space-y-2">
          <span className="text-[9px] text-[#6c6c6c] tracking-widest uppercase font-mono block">Total Objectives</span>
          <div className="text-4xl font-black text-white font-sans tracking-tight">{totalGoals}</div>
        </div>
        <div className="space-y-2 border-l border-white/10 pl-6">
          <span className="text-[9px] text-[#6c6c6c] tracking-widest uppercase font-mono block">Active Scopes</span>
          <div className="text-4xl font-black text-[#8898e7] font-sans tracking-tight">{activeGoalsCount}</div>
        </div>
        <div className="space-y-2 border-l border-white/10 pl-6">
          <span className="text-[9px] text-[#6c6c6c] tracking-widest uppercase font-mono block">Completed Nodes</span>
          <div className="text-4xl font-black text-[#00ffb2] font-sans tracking-tight">{completedGoalsCount}</div>
        </div>
        <div className="space-y-2 border-l border-white/10 pl-6">
          <span className="text-[9px] text-[#6c6c6c] tracking-widest uppercase font-mono block">Completion Rate</span>
          <div className="text-4xl font-black text-white font-sans tracking-tight">{completionPercentage}%</div>
        </div>
      </section>

      {/* 4. Controls: Tabs */}
      <div className="flex border-b border-white/10 gap-8">
        {['all', 'active', 'completed', 'archived'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[10px] tracking-[0.15em] uppercase transition-all relative ${
              activeTab === tab 
                ? 'text-white font-bold' 
                : 'text-[#6c6c6c] hover:text-white'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#8898e7]" 
              />
            )}
          </button>
        ))}
      </div>

      {/* 5. Goals List Grid */}
      <div className="relative min-h-[250px]">
        {loading && goals.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            <Skeleton className="h-44 w-full bg-white/5 rounded-none" />
            <Skeleton className="h-44 w-full bg-white/5 rounded-none" />
          </div>
        ) : filteredGoals.length === 0 ? (
          <div className="py-16">
            <EmptyState 
              title={`No ${activeTab === 'all' ? '' : activeTab + ' '}goals initialized`}
              description="Calibrate target objectives to structure operational tasks and track progress."
              action={activeTab !== 'archived' && (
                <Button 
                  onClick={handleOpenCreate} 
                  className="bg-white text-black border-white hover:bg-white/90 rounded-none text-[10px] uppercase font-bold"
                >
                  Initialize First Goal
                </Button>
              )}
            />
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredGoals.map((goal) => {
                const isCompleted = goal.status === 'completed';
                const isArchived = goal.status === 'archived';

                const priorityStyles = {
                  high: 'border-error/20 bg-error/5 text-error',
                  medium: 'border-yellow-500/20 bg-yellow-500/5 text-yellow-500',
                  low: 'border-success/20 bg-success/5 text-success'
                };

                return (
                  <motion.div
                    layout
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => handleOpenDetail(goal)}
                    className="p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative"
                  >
                    {/* Top Row: Tags */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 border border-white/10 text-[8px] tracking-widest uppercase text-[#8c8c8c] bg-white/5 font-mono">
                          {goal.category}
                        </span>
                        <span className={`px-2 py-0.5 border text-[8px] tracking-widest uppercase font-mono ${priorityStyles[goal.priority] || ''}`}>
                          {goal.priority}
                        </span>
                      </div>
                      <span className={`text-[8px] tracking-wider uppercase font-bold ${
                        isCompleted ? 'text-[#00ffb2]' : isArchived ? 'text-[#6c6c6c]' : 'text-[#8898e7]'
                      }`}>
                        {goal.status}
                      </span>
                    </div>

                    {/* Middle: Title & Description */}
                    <div className="space-y-2 flex-1">
                      <h3 className={`text-base font-extrabold tracking-wide uppercase text-white ${isCompleted ? 'line-through opacity-60' : ''}`}>
                        {goal.title}
                      </h3>
                      {goal.description && (
                        <p className="text-[11px] text-[#8c8c8c] leading-relaxed line-clamp-2 font-mono">
                          {goal.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom: Date & Actions */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#6c6c6c] text-[10px]">
                        <Calendar size={12} />
                        <span className="tracking-wider">{formatDate(goal.targetDate)}</span>
                      </div>

                      {/* Card Action Controls */}
                      <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        {!isCompleted && !isArchived && (
                          <button 
                            onClick={(e) => handleComplete(goal.id, e)}
                            title="Complete Goal"
                            className="p-1 hover:text-[#00ffb2] text-[#6c6c6c] transition-colors"
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}
                        {!isArchived && (
                          <button 
                            onClick={(e) => handleArchive(goal.id, e)}
                            title="Archive Goal"
                            className="p-1 hover:text-[#8c8c8c] text-[#6c6c6c] transition-colors"
                          >
                            <Archive size={14} />
                          </button>
                        )}
                        <button 
                          onClick={(e) => handleOpenEdit(goal, e)}
                          title="Edit Goal"
                          className="p-1 hover:text-white text-[#6c6c6c] transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(goal.id, e)}
                          title="Delete Goal"
                          className="p-1 hover:text-[#ff4d4d] text-[#6c6c6c] transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* --- 6. MODALS --- */}

      {/* CREATE GOAL MODAL */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Initialize New Goal"
        className="font-mono text-white"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-6">
          {formErrors.submit && (
            <div className="p-3 border border-error/20 bg-error/5 text-error text-[10px]">
              {formErrors.submit}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Goal Title</label>
            <Input 
              placeholder="e.g. Architect Backend Core"
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
              className="flex w-full border border-white/20 bg-black/40 px-4 py-3 text-xs text-foreground transition-all duration-300 placeholder:text-muted focus:outline-none focus:border-[#8898e7]/50 rounded-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Category</label>
              <Input 
                placeholder="e.g. Infrastructure"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`text-xs bg-black border-white/20 focus:border-[#8898e7]/50 rounded-none ${formErrors.category ? 'border-error/50' : ''}`}
              />
              {formErrors.category && <span className="text-[9px] text-error block">{formErrors.category}</span>}
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Priority</label>
              <div className="relative">
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none appearance-none"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#6c6c6c] text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Target Date</label>
            <input 
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
              className={`flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none ${formErrors.targetDate ? 'border-error/50' : ''}`}
            />
            {formErrors.targetDate && <span className="text-[9px] text-error block">{formErrors.targetDate}</span>}
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button 
              type="submit" 
              className="flex-1 bg-white text-black border-white hover:bg-white/90 rounded-none text-[10px] uppercase font-bold"
            >
              INITIALIZE GOAL
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

      {/* EDIT GOAL MODAL */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Recalibrate Goal Parameters"
        className="font-mono text-white"
      >
        <form onSubmit={handleEditSubmit} className="space-y-6">
          {formErrors.submit && (
            <div className="p-3 border border-error/20 bg-error/5 text-error text-[10px]">
              {formErrors.submit}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Goal Title</label>
            <Input 
              placeholder="e.g. Architect Backend Core"
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
              className="flex w-full border border-white/20 bg-black/40 px-4 py-3 text-xs text-foreground transition-all duration-300 placeholder:text-muted focus:outline-none focus:border-[#8898e7]/50 rounded-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Category</label>
              <Input 
                placeholder="e.g. Infrastructure"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`text-xs bg-black border-white/20 focus:border-[#8898e7]/50 rounded-none ${formErrors.category ? 'border-error/50' : ''}`}
              />
              {formErrors.category && <span className="text-[9px] text-error block">{formErrors.category}</span>}
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Priority</label>
              <div className="relative">
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none appearance-none"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#6c6c6c] text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block font-bold">Target Date</label>
            <input 
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
              className={`flex h-12 w-full border border-white/20 bg-black px-4 py-3 text-xs text-white transition-all duration-300 focus:outline-none focus:border-[#8898e7]/50 rounded-none ${formErrors.targetDate ? 'border-error/50' : ''}`}
            />
            {formErrors.targetDate && <span className="text-[9px] text-error block">{formErrors.targetDate}</span>}
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

      {/* DETAIL MODAL OVERLAY */}
      {selectedGoal && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title="Goal Scope Details"
          className="font-mono text-white"
        >
          <div className="space-y-6 text-xs leading-relaxed">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[9px] text-[#6c6c6c] uppercase tracking-widest block font-mono mb-1">Objective Title</span>
              <h2 className="text-xl font-bold uppercase text-white">{selectedGoal.title}</h2>
            </div>

            <div className="grid grid-cols-2 gap-6 py-2 border-b border-white/10">
              <div>
                <span className="text-[9px] text-[#6c6c6c] uppercase tracking-widest block font-mono mb-1">Category Scope</span>
                <span className="px-2 py-0.5 border border-white/10 text-[9px] uppercase tracking-wider text-white bg-white/5">
                  {selectedGoal.category}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-[#6c6c6c] uppercase tracking-widest block font-mono mb-1">Priority Index</span>
                <span className={`px-2 py-0.5 border text-[9px] uppercase font-bold ${
                  selectedGoal.priority === 'high' ? 'border-error/20 bg-error/5 text-error' :
                  selectedGoal.priority === 'medium' ? 'border-yellow-500/20 bg-yellow-500/5 text-yellow-500' :
                  'border-success/20 bg-success/5 text-success'
                }`}>
                  {selectedGoal.priority}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-2 border-b border-white/10">
              <div>
                <span className="text-[9px] text-[#6c6c6c] uppercase tracking-widest block font-mono mb-1">Target Date</span>
                <span className="text-white flex items-center gap-1.5 font-mono">
                  <Calendar size={12} className="text-[#8c8c8c]" />
                  {formatDate(selectedGoal.targetDate)}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-[#6c6c6c] uppercase tracking-widest block font-mono mb-1">Current State</span>
                <span className={`uppercase font-bold ${
                  selectedGoal.status === 'completed' ? 'text-[#00ffb2]' :
                  selectedGoal.status === 'archived' ? 'text-[#6c6c6c]' :
                  'text-[#8898e7]'
                }`}>
                  {selectedGoal.status}
                </span>
              </div>
            </div>

            {selectedGoal.description && (
              <div className="py-2 border-b border-white/10">
                <span className="text-[9px] text-[#6c6c6c] uppercase tracking-widest block font-mono mb-1">Operational Description</span>
                <p className="text-[#a0a0a0] leading-relaxed whitespace-pre-wrap">{selectedGoal.description}</p>
              </div>
            )}

            {selectedGoal.completedAt && (
              <div className="py-2 border-b border-white/10">
                <span className="text-[9px] text-[#6c6c6c] uppercase tracking-widest block font-mono mb-1">Completion Timestamp</span>
                <span className="text-[#00ffb2] font-mono">{formatDate(selectedGoal.completedAt)}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              {selectedGoal.status === 'active' && (
                <Button 
                  onClick={(e) => handleComplete(selectedGoal.id, e)}
                  className="bg-white text-black border-white hover:bg-white/90 rounded-none text-[9px] uppercase font-bold tracking-widest px-4 py-2"
                >
                  MARK COMPLETED
                </Button>
              )}
              {selectedGoal.status !== 'archived' && (
                <Button 
                  variant="outline"
                  onClick={(e) => handleArchive(selectedGoal.id, e)}
                  className="border-white/20 text-white hover:bg-white/5 rounded-none text-[9px] uppercase font-bold tracking-widest px-4 py-2"
                >
                  ARCHIVE GOAL
                </Button>
              )}
              <Button 
                variant="secondary"
                onClick={(e) => handleOpenEdit(selectedGoal, e)}
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-none text-[9px] uppercase font-bold tracking-widest px-4 py-2"
              >
                RECALIBRATE
              </Button>
              <Button 
                variant="destructive"
                onClick={(e) => handleDelete(selectedGoal.id, e)}
                className="bg-error/10 border-error/30 hover:bg-error/20 text-error rounded-none text-[9px] uppercase font-bold tracking-widest px-4 py-2"
              >
                DELETE
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
