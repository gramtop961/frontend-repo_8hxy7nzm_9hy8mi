import React, { useCallback, useRef, useState } from 'react';
import { CloudUpload, FileImage, FileType, Loader2, Info } from 'lucide-react';

const ACCEPTED = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/dicom': ['.dcm'],
};

const UploadPanel = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  const handleFiles = useCallback((fileList) => {
    const arr = Array.from(fileList);
    setFiles(arr);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const startUpload = async () => {
    if (!files.length) return;
    setProgress(5);

    const form = new FormData();
    files.forEach((f) => form.append('file', f));

    // Simulate progressive updates while backend processes
    const interval = setInterval(() => setProgress((p) => Math.min(95, p + 7)), 300);

    try {
      await onUpload(form, (p) => setProgress(p));
      setProgress(100);
    } catch (e) {
      console.error(e);
    } finally {
      clearInterval(interval);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <section id="upload" className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`rounded-2xl border-2 border-dashed ${dragOver ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 bg-white'} p-8 transition-colors`}
            >
              <div className="flex flex-col items-center justify-center text-center gap-3">
                <div className="p-3 rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                  <CloudUpload className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Drag & drop MRI files here</h3>
                <p className="text-sm text-slate-600">JPG, PNG, or DICOM (.dcm) up to 50MB each</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="inline-flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-200"><FileImage className="w-4 h-4"/> JPG/PNG</span>
                  <span className="inline-flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-200"><FileType className="w-4 h-4"/> DICOM</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
                    onClick={() => inputRef.current?.click()}
                  >
                    Browse Files
                  </button>
                  <button
                    className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-white shadow hover:bg-slate-800 disabled:opacity-60"
                    disabled={!files.length}
                    onClick={startUpload}
                  >
                    {progress > 0 && progress < 100 ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                      </>
                    ) : 'Start Analysis'}
                  </button>
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  accept={Object.values(ACCEPTED).flat().join(',')}
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
                {files.length > 0 && (
                  <div className="w-full mt-6 text-left">
                    <p className="text-sm font-medium text-slate-700">Selected files</p>
                    <ul className="mt-1 text-sm text-slate-600 list-disc pl-6">
                      {files.map((f) => (
                        <li key={f.name}>{f.name} <span className="text-slate-400">({(f.size/1024/1024).toFixed(2)} MB)</span></li>
                      ))}
                    </ul>
                  </div>
                )}
                {progress > 0 && (
                  <div className="w-full mt-6">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Uploading and processing... {progress}%</p>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-4 flex items-start gap-2 text-xs text-slate-500"><Info className="w-4 h-4 mt-0.5"/> We process images securely and do not store PHI. Results are for research assistance and not a substitute for professional diagnosis.</p>
          </div>

          <div className="lg:col-span-1">
            <ModelSelector />
          </div>
        </div>
      </div>
    </section>
  );
};

const MODEL_DESCRIPTIONS = {
  'lenet5': {
    title: 'LeNet-5 (Custom)',
    desc: 'Lightweight CNN baseline, fast inference, suitable for 2D slices.'
  },
  'resnet50': {
    title: 'ResNet-50',
    desc: 'Deep residual network, robust to complex features and variations.'
  },
  'vgg16': {
    title: 'VGG-16',
    desc: 'Classic architecture with strong feature hierarchies.'
  },
  'densenet121': {
    title: 'DenseNet-121',
    desc: 'Feature reuse via dense connections for efficient learning.'
  }
};

const ModelSelector = () => {
  const [selected, setSelected] = useState({ lenet5: true, resnet50: true, vgg16: true, densenet121: true });

  return (
    <div id="models" className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-900">Model Selection</h3>
      <p className="text-sm text-slate-600 mt-1">Choose which architectures to run. All are enabled by default.</p>
      <div className="mt-4 grid gap-3">
        {Object.entries(MODEL_DESCRIPTIONS).map(([key, info]) => (
          <label key={key} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={selected[key]}
              onChange={(e) => setSelected((s) => ({ ...s, [key]: e.target.checked }))}
              className="mt-1"
            />
            <span>
              <span className="block font-medium text-slate-900">{info.title}</span>
              <span className="block text-sm text-slate-600">{info.desc}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default UploadPanel;
