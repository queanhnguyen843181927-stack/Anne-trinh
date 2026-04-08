import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Heart, Wallet, Compass, ArrowRight, Loader2 } from 'lucide-react';
import { analyzePath, AnalysisResult } from './services/ai';
import { cn } from './lib/utils';

export default function App() {
  const [reflection, setReflection] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showChartInput, setShowChartInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!reflection.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await analyzePath(reflection, birthDate, birthTime);
      setResult(data);
    } catch (err) {
      console.error("Analysis failed", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Left Iridescent Panel */}
      <div className="hidden lg:block lg:w-1/4 iridescent-side fixed left-0 top-0 bottom-0 z-0" />
      
      {/* Right Iridescent Panel */}
      <div className="hidden lg:block lg:w-1/4 iridescent-side fixed right-0 top-0 bottom-0 z-0" />

      {/* Main Content Column */}
      <main className="relative z-10 w-full lg:w-1/2 mx-auto center-column min-h-screen shadow-2xl">
        {/* Background Leaves for Center */}
        <div className="absolute inset-0 pointer-events-none center-leaves z-0" />

        <div className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
          {/* Hero Section */}
          <header className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 rounded-full border border-black/10 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 mb-6 glass-light">
                Drawing your authentic path, guided by anne trinh
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-stone-900 mb-8 leading-[0.9]">
                Wisdom, Wealth <br />
                <span className="italic text-stone-400">& Emotional Depth.</span>
              </h1>
              <p className="text-stone-500 max-w-md mx-auto text-base font-light leading-relaxed">
                For those who refuse to settle for the rote, the industrial, or the uninspired. 
                Map your journey toward a life of internal satisfaction and external abundance.
              </p>
            </motion.div>
          </header>

          {/* Input Section */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-light rounded-3xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <Compass className="w-5 h-5 text-stone-400" />
                <h2 className="text-sm uppercase tracking-widest font-semibold text-stone-600">Your Reflection</h2>
              </div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Describe the life you seek..."
                className="w-full h-48 bg-transparent border-none focus:ring-0 text-xl font-serif font-light placeholder:text-stone-300 resize-none leading-relaxed text-stone-800"
              />

              <div className="mt-8 pt-8 border-t border-black/5">
                <button 
                  onClick={() => setShowChartInput(!showChartInput)}
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 hover:text-stone-600 transition-colors flex items-center gap-2"
                >
                  {showChartInput ? "- Hide Destiny Data" : "+ Add Birth Info (Tu Vi)"}
                </button>
                
                <AnimatePresence>
                  {showChartInput && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Birth Date</label>
                          <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full p-4 bg-white/20 rounded-2xl border border-black/5 text-sm font-sans text-stone-600 focus:outline-none focus:border-stone-300 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Birth Time (Hour)</label>
                          <select
                            value={birthTime}
                            onChange={(e) => setBirthTime(e.target.value)}
                            className="w-full p-4 bg-white/20 rounded-2xl border border-black/5 text-sm font-sans text-stone-600 focus:outline-none focus:border-stone-300 transition-colors appearance-none"
                          >
                            <option value="">Select Hour</option>
                            {Array.from({ length: 24 }).map((_, i) => (
                              <option key={i} value={`${i}:00`}>{i}:00</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !reflection.trim()}
                  className={cn(
                    "group flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300",
                    "bg-stone-900 text-stone-50 hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing Soul...</span>
                    </>
                  ) : (
                    <>
                      <span>Illuminate the Path</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </section>

          {/* Results Section */}
          <AnimatePresence>
            {result && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="space-y-12 pb-32"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Score Card */}
                  <div className="glass-light rounded-3xl p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4">Alignment Score</h3>
                      <div className="text-6xl font-serif font-light text-stone-900">{result.alignmentScore}%</div>
                    </div>
                    <p className="text-sm text-stone-500 mt-4 italic">
                      Your vision is remarkably clear. You are seeking a rare integration of values.
                    </p>
                  </div>

                  {/* Philosophy Card */}
                  <div className="md:col-span-2 glass-dark rounded-3xl p-8 text-stone-100">
                    <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-4">Philosophical Archetype</h3>
                    <div className="text-4xl font-serif italic mb-6 text-white">{result.philosophicalMatch}</div>
                    <p className="text-stone-300 font-light leading-relaxed">
                      {result.emotionalIntelligenceInsight}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Career Paths */}
                  <div className="glass-light rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Brain className="w-5 h-5 text-stone-400" />
                      <h3 className="text-sm uppercase tracking-widest text-stone-600">Career Archetypes</h3>
                    </div>
                    <div className="space-y-4">
                      {result.careerArchetypes.map((path, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-black/5 last:border-0">
                          <span className="text-lg font-serif text-stone-800">{path}</span>
                          <div className="w-2 h-2 rounded-full bg-stone-300" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* University Advice */}
                  <div className="glass-light rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Sparkles className="w-5 h-5 text-stone-400" />
                      <h3 className="text-sm uppercase tracking-widest text-stone-600">Higher Education Strategy</h3>
                    </div>
                    <p className="text-stone-600 font-light leading-relaxed mb-6">
                      {result.universityAdvice}
                    </p>
                    <div className="p-4 bg-black/5 rounded-2xl border border-black/5">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2">Key Criteria</h4>
                      <p className="text-xs text-stone-500">Look for: Project-based learning, high emotional safety, and industry-integrated theory.</p>
                    </div>
                  </div>
                </div>

                {/* Practices */}
                <div className="glass-light rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Heart className="w-5 h-5 text-stone-400" />
                    <h3 className="text-sm uppercase tracking-widest text-stone-600">Daily Alignment Practices</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {result.suggestedPractices.map((practice, i) => (
                      <div key={i} className="space-y-3">
                        <div className="text-stone-200 font-serif text-3xl">0{i + 1}</div>
                        <p className="text-stone-600 font-light text-sm leading-relaxed">{practice}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Destiny Insight */}
                {result.destinyInsight && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 rounded-3xl bg-black/5 border border-black/5 text-center"
                  >
                    <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">Destiny Alignment</h3>
                    <p className="text-2xl font-serif italic text-stone-800 leading-relaxed max-w-xl mx-auto">
                      "{result.destinyInsight}"
                    </p>
                  </motion.div>
                )}
              </motion.section>
            )}
          </AnimatePresence>

          {/* Footer */}
          <footer className="relative z-10 border-t border-black/5 py-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
              Anne trinh created space &bull; Crafted for the seekers of deep core wisdom.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
