import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { X } from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  language: string;
  mode: string;
  duration: number;
  wpm: number;
  accuracy: number;
  date: string;
}

interface PracticeHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PracticeHistory({ isOpen, onClose }: PracticeHistoryProps) {
  const { user, isGuest } = useAuth();
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const key = `practice_history_${user?.id ?? 'guest'}`;
    try {
      const raw = localStorage.getItem(key);
      const parsed: HistoryItem[] = raw ? JSON.parse(raw) : [];
      setItems(parsed);
    } catch (e) {
      setItems([]);
    }
  }, [isOpen, user, isGuest]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Practice History (last 5)</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-slate-400">No saved practice sessions yet.</div>
        ) : (
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{it.title}</div>
                    <div className="text-slate-400 text-sm">{it.language.toUpperCase()} • {it.mode} • {it.duration}s</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{it.wpm} WPM</div>
                    <div className="text-slate-400 text-sm">{it.accuracy.toFixed(1)}%</div>
                    <div className="text-slate-400 text-xs">{new Date(it.date).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
