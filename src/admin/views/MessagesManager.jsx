import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle2, Search, RefreshCw, Calendar, User, Eye, X } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import ConfirmModal from '../components/ConfirmModal';

export default function MessagesManager({ showToast }) {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getMessages();
      setMessages(data || []);
    } catch (err) {
      showToast?.(err.message || 'Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await portfolioApi.markMessageRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    } catch {
      // Ignore
    }
  };

  const handleViewMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      handleMarkRead(msg.id);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioApi.deleteMessage(deleteTargetId);
      showToast?.('Message deleted', 'success');
      if (selectedMessage?.id === deleteTargetId) {
        setSelectedMessage(null);
      }
      setDeleteTargetId(null);
      loadMessages();
    } catch (err) {
      showToast?.(err.message || 'Failed to delete message', 'error');
    }
  };

  const filteredMessages = messages.filter((m) => {
    const term = search.toLowerCase();
    return (
      m.fullName?.toLowerCase().includes(term) ||
      m.email?.toLowerCase().includes(term) ||
      m.subject?.toLowerCase().includes(term) ||
      m.message?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Visitor Inquiries</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Contact Messages</h1>
          <p className="text-xs sm:text-sm text-slate-400">View, search, mark read, or delete messages sent through your public Contact form.</p>
        </div>

        <button
          type="button"
          onClick={loadMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by sender name, email, subject, or keywords..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Message Modal Preview */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0b1024] border border-cyan-500/40 p-6 sm:p-7 shadow-2xl text-left space-y-4">
            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider">Message Details</span>
              <h3 className="text-lg font-bold text-white mt-1">{selectedMessage.subject}</h3>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{selectedMessage.fullName}</span>
                <span className="font-mono text-slate-400 text-[11px]">
                  {selectedMessage.submittedAt ? new Date(selectedMessage.submittedAt).toLocaleString() : ''}
                </span>
              </div>
              <a href={`mailto:${selectedMessage.email}`} className="text-cyan-400 hover:underline block break-all">
                {selectedMessage.email}
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
              {selectedMessage.message}
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply via Email</span>
              </a>

              <button
                type="button"
                onClick={() => setDeleteTargetId(selectedMessage.id)}
                className="px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-cyan-400" />
          <span>Loading messages...</span>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="glass-card rounded-3xl p-10 text-center border border-slate-800 space-y-3">
          <Mail className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Messages Found</h3>
          <p className="text-xs text-slate-400">
            {search ? 'No inquiries matched your search term.' : 'Inquiries submitted through your public contact form will appear here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleViewMessage(msg)}
              className={`glass-card rounded-2xl p-4 sm:p-5 border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                msg.read ? 'border-slate-800 hover:border-slate-700' : 'border-purple-500/50 bg-purple-950/20'
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                  <h4 className="text-sm font-bold text-white">{msg.subject}</h4>
                  <span className="text-xs text-slate-400 font-normal">from {msg.fullName}</span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-1">{msg.message}</p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                  <span className="font-mono text-cyan-300">{msg.email}</span>
                  <span>•</span>
                  <span>{msg.submittedAt ? new Date(msg.submittedAt).toLocaleDateString() : ''}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => handleViewMessage(msg)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
                  title="View message"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteTargetId(msg.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 border border-slate-800"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Message"
        message="Are you sure you want to permanently delete this message inquiry?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

