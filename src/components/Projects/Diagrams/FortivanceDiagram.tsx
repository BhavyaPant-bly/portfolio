import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Bot, Network, ClipboardCheck, UserCheck, Megaphone, ScanSearch } from 'lucide-react';

type StepKind = 'code' | 'ai' | 'human';

interface PipelineStep {
  title: string;
  detail: string;
  kind: StepKind;
  engine: string;
  icon: React.ElementType;
}

const steps: PipelineStep[] = [
  { title: 'Read', detail: 'Notice text extracted server-side', kind: 'code', engine: 'Code', icon: FileText },
  { title: 'Extract', detail: 'Vendor, times, incident type & data exposure as structured fields', kind: 'ai', engine: 'Claude Haiku', icon: Bot },
  { title: 'Verify & Match', detail: 'Vendor matched to registry; sender domain checked', kind: 'code', engine: 'Code', icon: ScanSearch },
  { title: 'Trace Impact', detail: 'Vendor → subcontractor → app → customer service', kind: 'code', engine: 'Dependency Graph', icon: Network },
  { title: 'Draft Plan', detail: 'Actions, vendor questions & analyst decisions', kind: 'ai', engine: 'Claude Sonnet', icon: ClipboardCheck },
  { title: 'Approve', detail: 'Head of TPRM approves; actions created only on approval', kind: 'human', engine: 'Human', icon: UserCheck },
  { title: 'Escalate', detail: 'Leadership briefing drafted from the approved plan', kind: 'ai', engine: 'Claude Haiku', icon: Megaphone },
];

const kindStyles: Record<StepKind, { border: string; text: string; bg: string }> = {
  code: { border: 'border-cyan-500/20', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ai: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10' },
  human: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
};

export const FortivanceDiagram: React.FC = () => {
  return (
    <div className="w-full rounded-2xl bg-dark-950 p-4 sm:p-6 border border-white/10 overflow-hidden relative">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-white/10">
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-purple-400">
          <ShieldCheck className="w-3.5 h-3.5 animate-pulse shrink-0" />
          <span>FORTIVANCE: VENDOR INCIDENT → IMPACT → APPROVED RESPONSE</span>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
          RBI 6-HOUR REPORTING CLOCK
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4 text-[10px] font-mono">
        {(['ai', 'code', 'human'] as StepKind[]).map((k) => (
          <span key={k} className={`flex items-center gap-1.5 ${kindStyles[k].text}`}>
            <span className={`w-2 h-2 rounded-full ${kindStyles[k].bg} border ${kindStyles[k].border}`} />
            {k === 'ai' ? 'AI reads & drafts' : k === 'code' ? 'Deterministic code' : 'Human decides'}
          </span>
        ))}
      </div>

      {/* Pipeline Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const s = kindStyles[step.kind];
          return (
            <motion.div
              key={step.title}
              whileHover={{ y: -4 }}
              className={`p-3.5 sm:p-4 rounded-xl bg-white/5 border ${s.border} space-y-3 relative`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${s.text}`} />
                <span className={`text-[10px] font-mono ${s.text} ${s.bg} px-2 py-0.5 rounded`}>
                  {step.engine}
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  <span className="text-slate-500 font-mono mr-1.5">{String(idx + 1).padStart(2, '0')}</span>
                  {step.title}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1 leading-relaxed">{step.detail}</div>
              </div>
            </motion.div>
          );
        })}

        {/* Guardrails tile */}
        <motion.div
          whileHover={{ y: -4 }}
          className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-white/10 space-y-2"
        >
          <div className="text-xs font-bold text-white">Guardrails</div>
          <ul className="text-[10px] font-mono text-slate-400 space-y-1">
            <li>• Citations validated against clause IDs</li>
            <li>• Prompt-injection in notices flagged</li>
            <li>• Token logging + daily spend cap</li>
            <li>• Eval vs hand-labelled gold data</li>
          </ul>
        </motion.div>
      </div>

      {/* Status Bar */}
      <div className="mt-4 sm:mt-6 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="text-slate-300 text-[11px] sm:text-xs">Impact traced in:</span>
          <span className="text-emerald-400 font-bold text-[11px] sm:text-xs">seconds, not hours</span>
        </div>
        <div className="text-slate-400 text-[10px] sm:text-[11px]">AI drafts · people decide</div>
      </div>
    </div>
  );
};
