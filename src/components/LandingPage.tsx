import { Code2, Zap, Target, BarChart3, Trophy, Users, ArrowRight, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PracticeHistory from './PracticeHistory';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onGuest: () => void;
}

export default function LandingPage({ onGetStarted, onLogin, onSignup, onGuest }: LandingPageProps) {
  const { user, isGuest, signOut } = useAuth();

  const displayName = user?.user_metadata?.display_name || user?.email || (isGuest ? 'Guest' : '');

  const handleSignOut = async () => {
    await signOut();
  };
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  // contact form removed per user request

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code2 className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold text-white">Typester</span>
          </div>
          <div className="flex items-center gap-3">
            {/* For unauthenticated users show Login / Sign Up in the nav */}
            {!user && !isGuest && (
              <>
                <button
                  onClick={onLogin}
                  className="px-6 py-2 text-slate-300 hover:text-white transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  onClick={onSignup}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all font-medium shadow-lg shadow-emerald-500/30"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

      {/* Fixed top-right account group for signed-in / guest users */}
      {user || isGuest ? (
        <div className="fixed top-4 right-6 z-50 flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 py-2 px-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all shadow-lg"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L12 3L21 12" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 21V12H15V21" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm">Home</span>
          </button>

          <div className="relative">
            <button
              id="accountBtn"
              onClick={() => {
                const el = document.getElementById('accountMenu');
                if (el) el.classList.toggle('hidden');
              }}
              className="flex items-center gap-2 py-2 px-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all shadow-lg"
            >
              <UserIcon className="w-4 h-4" />
              <span className="text-sm">{displayName}</span>
            </button>

            <div id="accountMenu" className="hidden absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
              <button
                onClick={() => { setHistoryOpen(true); const el = document.getElementById('accountMenu'); if (el) el.classList.add('hidden'); }}
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
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-emerald-500/10 rounded-2xl mb-6">
            <Code2 className="w-20 h-20 text-emerald-400" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Master Coding Syntax<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
              While Typing Faster
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Practice typing real programming code in C, C++, Java, and Python. Improve your speed,
            accuracy, and muscle memory with actual code snippets and data structure algorithms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all font-bold text-lg shadow-lg shadow-emerald-500/30 flex items-center gap-2 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onGuest}
              className="px-8 py-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all font-bold text-lg border border-slate-600"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </section>

      {/* Contact form moved to footer area */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-all">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Real Code Practice</h3>
            <p className="text-slate-400 leading-relaxed">
              Type actual programming code snippets instead of random text. Build muscle memory
              for syntax patterns you'll use every day.
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">DSA Focused</h3>
            <p className="text-slate-400 leading-relaxed">
              Practice with data structures and algorithms code. Choose from 19 topics including
              arrays, trees, graphs, dynamic programming, and more.
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all">
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Real-Time Stats</h3>
            <p className="text-slate-400 leading-relaxed">
              Track your accuracy, WPM, CPM, mistakes, and syntax accuracy in real-time.
              See detailed results after each session.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-3xl p-12 border border-emerald-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Typester?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-white">Multiple Languages:</strong> Practice with C, C++, Java, or Python code
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-white">Flexible Timing:</strong> Choose 30s, 60s, 120s, or custom time limits
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-white">Two Modes:</strong> Random code or focused DSA topic practice
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-white">Detailed Feedback:</strong> See exactly where you made mistakes with highlighted comparisons
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <Trophy className="w-10 h-10 text-yellow-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">19+</div>
                <div className="text-slate-400 text-sm">DSA Topics</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <Code2 className="w-10 h-10 text-emerald-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">4</div>
                <div className="text-slate-400 text-sm">Languages</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <BarChart3 className="w-10 h-10 text-blue-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">6</div>
                <div className="text-slate-400 text-sm">Live Metrics</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <Users className="w-10 h-10 text-purple-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">Free</div>
                <div className="text-slate-400 text-sm">To Use</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Improve Your Coding Speed?
        </h2>
        <p className="text-xl text-slate-300 mb-10">
          Join developers who are mastering both typing speed and coding syntax
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onSignup}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all font-bold text-lg shadow-lg shadow-emerald-500/30 transform hover:scale-105"
          >
            Create Free Account
          </button>
          <button
            onClick={onGuest}
            className="px-10 py-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all font-bold text-lg border border-slate-600"
          >
            Try as Guest
          </button>
        </div>
      </section>

      {/* Contact form removed per user request */}

      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-8">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Code2 className="w-6 h-6 text-emerald-400" />
            <span className="text-lg font-bold text-white">Typester</span>
          </div>
          <p className="text-slate-400 text-sm">
            Practice coding syntax while improving your typing speed
          </p>
        </div>
      </footer>
    </div>
  );
}
