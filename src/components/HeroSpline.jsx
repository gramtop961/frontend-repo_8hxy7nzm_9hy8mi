import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSpline = () => {
  return (
    <section id="home" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center py-12 md:py-20">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold ring-1 ring-blue-200">
              Advanced AI • Medical Grade
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Advanced AI-Powered Brain Tumor Detection
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              BrainSightAI analyzes MRI scans using multiple state-of-the-art deep learning models to classify tumor types with confidence scores and visual explanations.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#upload" className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-white shadow hover:bg-blue-700">
                Upload MRI Scan
              </a>
              <a href="#how-it-works" className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
                How it works
              </a>
            </div>
          </div>
          <div className="h-[420px] md:h-[520px] rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-gradient-to-br from-slate-50 to-white relative">
            <Spline scene="https://prod.spline.design/Zn7XRxnnbSat5OJG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSpline;
