import { useState } from 'react';
import { Code2, Zap, Brain, User as UserIcon, LogOut } from 'lucide-react';
import PracticeHistory from './PracticeHistory';
import { useAuth } from '../contexts/AuthContext';
import { Language, Mode, DSATopic, Duration, PracticeConfig, DSA_TOPICS } from '../types';

interface SetupScreenProps {
  onStart: (config: PracticeConfig) => void;
  onHome?: () => void;
  onSignOut?: () => void;
}

export default function SetupScreen({ onStart, onHome, onSignOut }: SetupScreenProps) {
  const [language, setLanguage] = useState<Language>('python');
  const [mode, setMode] = useState<Mode>('random');
  const [topic, setTopic] = useState<DSATopic>('arrays');
  const [duration, setDuration] = useState<Duration>(60);
  const [customDuration, setCustomDuration] = useState('');

  const handleStart = () => {
    const finalDuration = duration === 0 ? parseInt(customDuration) || 60 : duration;
    onStart({
      language,
      mode,
      topic: mode === 'dsa' ? topic : undefined,
      duration: finalDuration
    });
  };

  const formatTopicName = (topic: string) => {
    return topic.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const { user, isGuest, signOut } = useAuth();
  const [isHistoryOpen, setHistoryOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    if (onSignOut) {
      onSignOut();
    } else if (onHome) {
      onHome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Fixed account group placed top-right */}
        {user || isGuest ? (
          <div className="fixed top-4 right-6 z-50 flex items-center gap-3">
            {!isGuest && (
              <button
                onClick={() => onHome && onHome()}
                className="flex items-center gap-2 py-2 px-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all shadow-lg"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12L12 3L21 12" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 21V12H15V21" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm">Home</span>
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => {
                  const el = document.getElementById('accountMenuSetup');
                  if (el) el.classList.toggle('hidden');
                }}
                className="flex items-center gap-2 py-2 px-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all shadow-lg"
              >
                <UserIcon className="w-4 h-4" />
                <span className="text-sm">{user?.user_metadata?.display_name || user?.email || (isGuest ? 'Guest' : 'Account')}</span>
              </button>

              <div id="accountMenuSetup" className="hidden absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
                <button
                  onClick={() => { setHistoryOpen(true); const el = document.getElementById('accountMenuSetup'); if (el) el.classList.add('hidden'); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 flex items-center gap-2"
                >
                  History
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 rounded-b-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
  ) : null}

  <PracticeHistory isOpen={isHistoryOpen} onClose={() => setHistoryOpen(false)} />

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Code2 className="w-16 h-16 text-emerald-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">Typester</h1>
          <p className="text-slate-300 text-lg">Master coding syntax while improving your typing speed</p>
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Programming Language</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['c', 'cpp', 'java', 'python'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      language === lang
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Practice Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMode('random')}
                  className={`py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    mode === 'random'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  Random Code
                </button>
                <button
                  onClick={() => setMode('dsa')}
                  className={`py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    mode === 'dsa'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Brain className="w-5 h-5" />
                  DSA Practice
                </button>
              </div>
            </div>

            {mode === 'dsa' && (
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">DSA Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as DSATopic)}
                  className="w-full py-3 px-4 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {DSA_TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {formatTopicName(t)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Time Limit</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[30, 60, 120].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setDuration(dur as Duration)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      duration === dur
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {dur}s
                  </button>
                ))}
                <button
                  onClick={() => setDuration(0)}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    duration === 0
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Custom
                </button>
              </div>
              {duration === 0 && (
                <input
                  type="number"
                  placeholder="Enter seconds"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  className="mt-3 w-full py-3 px-4 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min="10"
                  max="600"
                />
              )}
            </div>

            <button
              onClick={handleStart}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Start Practice
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>Practice real programming code to improve both typing speed and coding familiarity</p>
        </div>
      </div>
    </div>
  );
}
