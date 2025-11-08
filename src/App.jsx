import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav.jsx';
import HeroSpline from './components/HeroSpline.jsx';
import UploadPanel from './components/UploadPanel.jsx';
import ResultsGrid from './components/ResultsGrid.jsx';

function App() {
  const [results, setResults] = useState(null);

  // Simulated upload + inference handler. Hook this to your backend later.
  const handleUpload = async (formData, setProgress) => {
    // Example to show how you would call your backend later:
    // const BASE = import.meta.env.VITE_BACKEND_URL;
    // const res = await fetch(`${BASE}/api/infer`, { method: 'POST', body: formData });
    // const data = await res.json();
    // setResults(data);

    // For now, simulate multi-model processing
    await new Promise((r) => setTimeout(r, 1400));
    setProgress?.(96);

    const fake = {
      lenet5: {
        prediction: 'Glioma',
        confidence: 92.4,
        timeMs: 118,
        heatmapUrl: '',
        features: ['Irregular border', 'Hyperintense core', 'Edema region']
      },
      resnet50: {
        prediction: 'Meningioma',
        confidence: 81.1,
        timeMs: 204,
        heatmapUrl: '',
        features: ['Dural tail sign', 'Extra-axial position']
      },
      vgg16: {
        prediction: 'Glioma',
        confidence: 87.9,
        timeMs: 173,
        heatmapUrl: '',
        features: ['Heterogeneous texture', 'Mass effect']
      },
      densenet121: {
        prediction: 'Pituitary',
        confidence: 69.5,
        timeMs: 226,
        heatmapUrl: '',
        features: ['Sellar region', 'Clear margins']
      },
    };

    setResults(fake);
  };

  const downloadResults = () => {
    if (!results) return;
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brainsightai_results.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeaderNav />
      <main>
        <HeroSpline />

        <section id="how-it-works" className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
              <h2 className="text-2xl font-bold">How It Works</h2>
              <div className="mt-4 grid md:grid-cols-3 gap-6 text-sm text-slate-700">
                <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <p className="font-semibold mb-1">1. Upload</p>
                  <p>Provide MRI images in JPG, PNG, or DICOM format. Files are processed securely.</p>
                </div>
                <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <p className="font-semibold mb-1">2. Analyze</p>
                  <p>Multiple CNN architectures run in parallel to classify tumor type and generate heatmaps.</p>
                </div>
                <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <p className="font-semibold mb-1">3. Review</p>
                  <p>Compare predictions, confidence, and processing time side-by-side, and download a report.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <UploadPanel onUpload={handleUpload} />

        <ResultsGrid results={results} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-8">
            <p className="text-xs text-slate-500">Results are for research support and not a substitute for professional diagnosis. Always consult a specialist.</p>
            <button
              onClick={downloadResults}
              className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-white shadow hover:bg-slate-800 disabled:opacity-60"
              disabled={!results}
            >
              Download Results
            </button>
          </div>
        </div>

        <footer id="contact" className="border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-600">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold text-slate-900">BrainSightAI</p>
                <p className="mt-1">AI-powered insights for neuroimaging. Built for clinicians and researchers.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Resources</p>
                <ul className="mt-1 space-y-1">
                  <li><a href="#models" className="hover:text-blue-700">Models</a></li>
                  <li><a href="#how-it-works" className="hover:text-blue-700">How it works</a></li>
                  <li><a href="#upload" className="hover:text-blue-700">Upload</a></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Contact</p>
                <p className="mt-1">contact@brainsight.ai</p>
                <p className="text-xs mt-2">© {new Date().getFullYear()} BrainSightAI. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
