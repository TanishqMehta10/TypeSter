import { useState, useEffect, useRef } from 'react';
import { Timer, Gauge, Target, AlertCircle, TrendingUp, CheckCircle, Home } from 'lucide-react';
import { CodeSnippet } from '../lib/supabase';
import { TypingStats } from '../types';

interface TypingScreenProps {
  snippet: CodeSnippet;
  duration: number;
  onComplete: (stats: TypingStats, typedText: string) => void;
  onHome?: () => void;
  onNewCode?: () => void;
}

export default function TypingScreen({ snippet, duration, onComplete, onHome, onNewCode }: TypingScreenProps) {
  const [typedText, setTypedText] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [hasStarted, setHasStarted] = useState(false);
  const [stats, setStats] = useState<TypingStats>({
    accuracy: 100,
    cpm: 0,
    wpm: 0,
    mistakes: 0,
    progress: 0,
    syntaxAccuracy: 100
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (hasStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hasStarted, timeLeft]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleComplete = () => {
    onComplete(stats, typedText);
  };

  const calculateStats = (typed: string) => {
    const originalCode = snippet.code;
    const typedLength = typed.length;
    const originalLength = originalCode.length;

    let correctChars = 0;
    let mistakes = 0;
    let correctSyntaxChars = 0;
    let totalSyntaxChars = 0;

    const syntaxRegex = /[{}()\[\];,.<>=+\-*/%!&|]/;

    for (let i = 0; i < typedLength; i++) {
      if (i < originalLength) {
        if (typed[i] === originalCode[i]) {
          correctChars++;
          if (syntaxRegex.test(typed[i])) {
            correctSyntaxChars++;
          }
        } else {
          mistakes++;
        }
        if (syntaxRegex.test(originalCode[i])) {
          totalSyntaxChars++;
        }
      } else {
        mistakes++;
      }
    }

    const accuracy = typedLength > 0 ? (correctChars / typedLength) * 100 : 100;
    const progress = (typedLength / originalLength) * 100;

    const elapsedSeconds = (duration - timeLeft) || 1;
    const cpm = (correctChars / elapsedSeconds) * 60;
    const wpm = (correctChars / 5 / elapsedSeconds) * 60;

    const syntaxAccuracy = totalSyntaxChars > 0
      ? (correctSyntaxChars / totalSyntaxChars) * 100
      : 100;

    return {
      accuracy: Math.round(accuracy * 100) / 100,
      cpm: Math.round(cpm),
      wpm: Math.round(wpm),
      mistakes,
      progress: Math.min(100, Math.round(progress * 100) / 100),
      syntaxAccuracy: Math.round(syntaxAccuracy * 100) / 100
    };
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (timeLeft === 0) return;

    if (!hasStarted) {
      setHasStarted(true);
      startTimeRef.current = Date.now();
    }

    const newText = e.target.value;
    setTypedText(newText);

    const newStats = calculateStats(newText);
    setStats(newStats);

    if (newText.length >= snippet.code.length) {
      handleComplete();
    }
  };

  const getCharacterClass = (index: number) => {
    if (index >= typedText.length) return 'text-slate-500';
    if (typedText[index] === snippet.code[index]) return 'text-emerald-400';
    return 'text-red-400 bg-red-900/30';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{snippet.title}</h2>
            <p className="text-slate-400 text-sm mt-1">
              {snippet.language.toUpperCase()} {snippet.topic && `• ${snippet.topic.replace(/_/g, ' ')}`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onHome && onHome()}
                className="flex items-center gap-2 py-2 px-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                aria-label="Back to home"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Home</span>
              </button>

              <button
                onClick={() => onNewCode && onNewCode()}
                className="flex items-center gap-2 py-2 px-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                aria-label="New code"
              >
                <span className="text-sm">New Code</span>
              </button>

              <div className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-emerald-400'}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 text-sm font-semibold">Accuracy</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.accuracy.toFixed(1)}%</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-300 text-sm font-semibold">Speed</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.wpm} <span className="text-lg text-slate-400">WPM</span></div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-slate-300 text-sm font-semibold">Progress</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.progress.toFixed(0)}%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
            <div className="text-slate-400 text-xs mb-1">CPM</div>
            <div className="text-xl font-bold text-white">{stats.cpm}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
            <div className="text-slate-400 text-xs mb-1">Mistakes</div>
            <div className="text-xl font-bold text-white">{stats.mistakes}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
            <div className="text-slate-400 text-xs mb-1">Syntax Accuracy</div>
            <div className="text-xl font-bold text-white">{stats.syntaxAccuracy.toFixed(0)}%</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
            <div className="text-slate-400 text-xs mb-1">Chars Typed</div>
            <div className="text-xl font-bold text-white">{typedText.length}/{snippet.code.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Timer className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Code to Type</h3>
            </div>
            <pre className="bg-slate-900 rounded-lg p-4 font-mono text-sm leading-relaxed overflow-auto max-h-96 border border-slate-700 whitespace-pre">
              {snippet.code.split('').map((char, index) => (
                <span key={index} className={getCharacterClass(index)}>
                  {char}
                </span>
              ))}
            </pre>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Your Input</h3>
            </div>
            <textarea
              ref={textareaRef}
              value={typedText}
              onChange={handleTextChange}
              disabled={timeLeft === 0}
              className="w-full h-80 bg-slate-900 rounded-lg p-4 font-mono text-sm text-white leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-700 whitespace-pre"
              placeholder="Start typing here..."
              spellCheck={false}
              wrap="off"
            />
            {!hasStarted && (
              <div className="flex items-center gap-2 mt-3 text-slate-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Timer starts when you begin typing</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
