import React from 'react';
import { Clock, ThermometerSun } from 'lucide-react';

const sampleInfo = [
  { key: 'lenet5', title: 'LeNet-5 (Custom)' },
  { key: 'resnet50', title: 'ResNet-50' },
  { key: 'vgg16', title: 'VGG-16' },
  { key: 'densenet121', title: 'DenseNet-121' },
];

const ResultCard = ({ title, prediction, confidence, timeMs, heatmapUrl, features }) => {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
      <div className="p-4 border-b border-slate-100">
        <h4 className="font-semibold text-slate-900">{title}</h4>
      </div>
      <div className="p-4 grid gap-3">
        <div className="aspect-video w-full rounded-lg overflow-hidden ring-1 ring-slate-200 bg-slate-50">
          {heatmapUrl ? (
            <img src={heatmapUrl} alt="Heatmap" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center text-slate-400 text-sm">
              <ThermometerSun className="w-5 h-5 mr-2" /> Heatmap preview
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-slate-500">Prediction</p>
            <p className="font-semibold text-slate-900">{prediction || '—'}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-slate-500">Confidence</p>
            <p className="font-semibold text-slate-900">{confidence != null ? `${confidence}%` : '—'}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-slate-500">Time</p>
            <p className="font-semibold text-slate-900 inline-flex items-center gap-1"><Clock className="w-4 h-4"/> {timeMs ? `${timeMs} ms` : '—'}</p>
          </div>
        </div>
        {features?.length ? (
          <div className="text-sm">
            <p className="text-slate-500">Key features</p>
            <ul className="mt-1 list-disc pl-5 text-slate-700">
              {features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ResultsGrid = ({ results }) => {
  const merged = sampleInfo.map((m) => ({
    ...m,
    ...(results?.[m.key] || {})
  }));

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Results</h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {merged.map((m) => (
            <ResultCard key={m.key} title={m.title} prediction={m.prediction} confidence={m.confidence} timeMs={m.timeMs} heatmapUrl={m.heatmapUrl} features={m.features} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsGrid;
