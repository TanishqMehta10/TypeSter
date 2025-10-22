import { Trophy, Target, Zap, AlertCircle, CheckCircle, RotateCcw, Home } from 'lucide-react';
import { TypingStats } from '../types';
import { CodeSnippet } from '../lib/supabase';

interface ResultsScreenProps {
  snippet: CodeSnippet;
  stats: TypingStats;
  typedText: string;
  onRestart: () => void;
  onHome: () => void;
}

export default function ResultsScreen({ snippet, stats, typedText, onRestart, onHome }: ResultsScreenProps) {
  const getPerformanceMessage = () => {
    if (stats.accuracy >= 95 && stats.wpm >= 40) return { text: 'Outstanding!', color: 'text-emerald-400' };
    if (stats.accuracy >= 90 && stats.wpm >= 30) return { text: 'Excellent Work!', color: 'text-blue-400' };
    if (stats.accuracy >= 80 && stats.wpm >= 20) return { text: 'Good Job!', color: 'text-purple-400' };
    if (stats.accuracy >= 70) return { text: 'Keep Practicing!', color: 'text-yellow-400' };
    return { text: 'Try Again!', color: 'text-orange-400' };
  };

  const performance = getPerformanceMessage();

  const renderComparison = () => {
    const lines = snippet.code.split('\n');
    const typedLines = typedText.split('\n');

    return lines.map((line, lineIndex) => {
      const typedLine = typedLines[lineIndex] || '';
      const chars = line.split('');

      return (
        <div key={lineIndex} className="mb-1">
          <div className="flex font-mono text-sm">
            <span className="text-slate-600 mr-4 select-none w-8 text-right">{lineIndex + 1}</span>
            <div className="flex-1">
              {chars.map((char, charIndex) => {
                const typedChar = typedLine[charIndex];
                let className = 'text-slate-500';

                if (typedChar !== undefined) {
                  if (typedChar === char) {
                    className = 'text-emerald-400';
                  } else {
                    className = 'text-red-400 bg-red-900/30';
                  }
                }

                return (
                  <span key={charIndex} className={className}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                );
              })}
              {typedLine.length > line.length && (
                <span className="text-red-400 bg-red-900/30">
                  {typedLine.substring(line.length)}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className={`text-5xl font-bold mb-2 ${performance.color}`}>{performance.text}</h1>
          <p className="text-slate-400 text-lg">Here's how you performed</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-slate-400 text-sm mb-1">Accuracy</div>
            <div className="text-3xl font-bold text-white">{stats.accuracy.toFixed(1)}%</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-slate-400 text-sm mb-1">Words Per Minute</div>
            <div className="text-3xl font-bold text-white">{stats.wpm}</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-slate-400 text-sm mb-1">Characters Per Minute</div>
            <div className="text-3xl font-bold text-white">{stats.cpm}</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-slate-400 text-sm mb-1">Total Mistakes</div>
            <div className="text-3xl font-bold text-white">{stats.mistakes}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Total Characters</div>
            <div className="text-2xl font-bold text-white">{snippet.code.length}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Characters Typed</div>
            <div className="text-2xl font-bold text-white">{typedText.length}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Syntax Accuracy</div>
            <div className="text-2xl font-bold text-white">{stats.syntaxAccuracy.toFixed(1)}%</div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            Code Comparison
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-96 border border-slate-700">
            {renderComparison()}
          </div>
          <div className="mt-4 flex items-start gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-400 rounded"></span>
              <span className="text-slate-400">Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-400 rounded"></span>
              <span className="text-slate-400">Incorrect</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-slate-500 rounded"></span>
              <span className="text-slate-400">Not Typed</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 py-3 px-8 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={onHome}
            className="flex items-center gap-2 py-3 px-8 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
