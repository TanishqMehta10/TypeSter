import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import SetupScreen from './components/SetupScreen';
import TypingScreen from './components/TypingScreen';
import ResultsScreen from './components/ResultsScreen';
import { supabase, CodeSnippet, PracticeSession } from './lib/supabase';
import { PracticeConfig, TypingStats } from './types';
import { seedDatabase } from './utils/seedData';

type AppState = 'landing' | 'login' | 'signup' | 'setup' | 'loading' | 'typing' | 'results';

function App() {
  const { user, isGuest, loading: authLoading, continueAsGuest, signOut } = useAuth();
  const [state, setState] = useState<AppState>('landing');
  const [config, setConfig] = useState<PracticeConfig | null>(null);
  const [snippet, setSnippet] = useState<CodeSnippet | null>(null);
  const [stats, setStats] = useState<TypingStats | null>(null);
  const [typedText, setTypedText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    seedDatabase();
  }, []);

  useEffect(() => {
    if (!authLoading && (user || isGuest)) {
      // Guests should be taken from landing -> setup when they choose to continue as guest.
      // Logged-in users still navigate to setup after completing login/signup flows.
      if (isGuest && state === 'landing') {
        setState('setup');
        return;
      }

      if (user && (state === 'login' || state === 'signup')) {
        setState('setup');
      }
    }
  }, [user, isGuest, authLoading]);

  const handleStart = async (newConfig: PracticeConfig) => {
    setState('loading');
    setConfig(newConfig);
    setError(null);

    try {
      const randomSnippet = await fetchSnippet(newConfig);
      setSnippet(randomSnippet);
      setState('typing');
    } catch (err) {
      console.error('Error fetching snippet:', err);
      setError(err instanceof Error ? err.message : 'Failed to load code snippet');
      setState('setup');
    }
  };

  // Fetch a snippet matching config, with fallback
  const fetchSnippet = async (cfg: PracticeConfig) => {
    let query = supabase
      .from('code_snippets')
      .select('*')
      .eq('language', cfg.language)
      .eq('category', cfg.mode);

    if (cfg.mode === 'dsa' && cfg.topic) {
      query = query.eq('topic', cfg.topic);
    }

    query = query.lte('estimated_time', cfg.duration + 30);
    query = query.gte('estimated_time', Math.max(cfg.duration - 30, 20));

    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;

    if (!data || data.length === 0) {
      const { data: fallback, error: fallbackError } = await supabase
        .from('code_snippets')
        .select('*')
        .eq('language', cfg.language)
        .eq('category', cfg.mode)
        .limit(10);

      if (fallbackError) throw fallbackError;
      if (!fallback || fallback.length === 0) throw new Error('No code snippets available for this configuration');
      return fallback[Math.floor(Math.random() * fallback.length)];
    }

    return data[Math.floor(Math.random() * data.length)];
  };

  const handleNewCode = async () => {
    if (!config) return;
    setState('loading');
    setError(null);
    try {
      const newSnippet = await fetchSnippet(config);
      setSnippet(newSnippet);
      // reset any typing-specific state
      setState('typing');
    } catch (err) {
      console.error('Error fetching new snippet:', err);
      setError(err instanceof Error ? err.message : 'Failed to load new code');
      setState('setup');
    }
  };

  const handleComplete = async (finalStats: TypingStats, finalTypedText: string) => {
    setStats(finalStats);
    setTypedText(finalTypedText);

    if (snippet) {
      try {
        const session: PracticeSession = {
          snippet_id: snippet.id,
          duration: config?.duration || 60,
          accuracy: finalStats.accuracy,
          cpm: finalStats.cpm,
          wpm: finalStats.wpm,
          total_chars: snippet.code.length,
          typed_chars: finalTypedText.length,
          mistakes: finalStats.mistakes,
          user_id: user?.id || null,
          is_guest: isGuest
        };

        await supabase.from('practice_sessions').insert(session);
      } catch (err) {
        console.error('Error saving session:', err);
      }
    }

    setState('results');

    // Save lightweight history to localStorage (last 5 per user/guest)
    try {
      const key = `practice_history_${user?.id ?? 'guest'}`;
      const existingRaw = localStorage.getItem(key);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const record = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: snippet?.title ?? 'Practice',
        language: snippet?.language ?? 'unknown',
        mode: snippet?.category ?? 'random',
        duration: config?.duration ?? 60,
        wpm: finalStats.wpm,
        accuracy: finalStats.accuracy,
        date: new Date().toISOString()
      };

      const next = [record, ...existing].slice(0, 5);
      localStorage.setItem(key, JSON.stringify(next));
    } catch (e) {
      // ignore localStorage errors
    }
  };

  const handleRestart = () => {
    if (config) {
      handleStart(config);
    }
  };

  const handleHome = () => {
    // If the user is a guest, return them to the setup options; otherwise go to the public landing page
    if (isGuest) {
      setState('setup');
    } else {
      setState('landing');
    }
    setConfig(null);
    setSnippet(null);
    setStats(null);
    setTypedText('');
    setError(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-300 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (state === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setState('signup')}
        onLogin={() => setState('login')}
        onSignup={() => setState('signup')}
        onGuest={() => {
          continueAsGuest();
        }}
      />
    );
  }

  if (state === 'login') {
    return (
      <LoginPage
        onBack={() => setState('landing')}
        onSignupClick={() => setState('signup')}
        onSuccess={() => setState('setup')}
      />
    );
  }

  if (state === 'signup') {
    return (
      <SignupPage
        onBack={() => setState('landing')}
        onLoginClick={() => setState('login')}
        onSuccess={() => setState('setup')}
      />
    );
  }

  if (state === 'setup') {
    return (
      <>
        <SetupScreen
          onStart={handleStart}
          onHome={handleHome}
          onSignOut={async () => {
            await signOut();
            // ensure landing view and clear session data
            setState('landing');
            setConfig(null);
            setSnippet(null);
            setStats(null);
            setTypedText('');
            setError(null);
          }}
        />
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {error}
          </div>
        )}
      </>
    );
  }

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-300 text-lg">Loading code snippet...</p>
        </div>
      </div>
    );
  }

  if (state === 'typing' && snippet && config) {
    return <TypingScreen snippet={snippet} duration={config.duration} onComplete={handleComplete} onHome={handleHome} onNewCode={handleNewCode} />;
  }

  if (state === 'results' && snippet && stats) {
    return (
      <ResultsScreen
        snippet={snippet}
        stats={stats}
        typedText={typedText}
        onRestart={handleRestart}
        onHome={handleHome}
      />
    );
  }

  return null;
}

export default App;
