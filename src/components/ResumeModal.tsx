import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle2, Server, Cpu, Database, Cloud } from 'lucide-react';

const RESUME_URL = '/Resume_Bhavya_Pant.pdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_URL;
    link.download = 'Bhavya_Pant_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/80 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-dark-900 border border-white/15 rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Bhavya Pant</h2>
                <p className="text-[11px] sm:text-xs font-mono text-slate-400">Full-Stack & AI Software Engineer — Resume Overview</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors shrink-0 ml-2"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Quick Metrics & Achievements */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {[
              { label: 'Experience', value: '2.7+ Years', color: 'text-white' },
              { label: 'API Requests / Day', value: '10M+', color: 'text-accent-cyan' },
              { label: 'IoT Devices', value: '10,000+', color: 'text-accent-indigo' },
              { label: 'AI Extraction Acc.', value: '94.7%', color: 'text-purple-300' },
            ].map((m) => (
              <div key={m.label} className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400">{m.label}</div>
                <div className={`text-base sm:text-lg font-bold font-mono ${m.color}`}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Summary Checklist */}
          <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
            <div className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">Key Engineering Stack</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {[
                'Generative AI Pipelines (Claude, OpenAI)',
                'Java, Spring Boot, Python & Django',
                'Kafka, MQTT & Redis Telemetry',
                'Banking APIs, RBAC & AI Security',
                'Docker, Kubernetes & AWS',
                'Led a team of 5 engineers',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Action Button */}
          <button
            onClick={handleDownload}
            className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-indigo text-dark-950 font-bold text-xs sm:text-sm font-mono flex items-center justify-center gap-2.5 hover:scale-[1.01] transition-transform shadow-lg shadow-accent-cyan/20"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Download Resume (PDF)</span>
          </button>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4 text-accent-cyan" />
            <span>View in Browser</span>
          </a>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
