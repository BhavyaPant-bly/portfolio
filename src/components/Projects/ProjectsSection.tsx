import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, ExternalLink, Cpu, Database, Activity, Bot } from 'lucide-react';
import { CaseStudyModal, ProjectData } from './CaseStudyModal';
import { AmcomDiagram } from './Diagrams/AmcomDiagram';
import { SolarDiagram } from './Diagrams/SolarDiagram';
import { FortivanceDiagram } from './Diagrams/FortivanceDiagram';

const projectsData: ProjectData[] = [
  {
    id: 'fortivance',
    title: 'Fortivance',
    subtitle: 'AI Third-Party Risk & Incident Response Platform for Indian Banks · GoDaddy Hackathon',
    category: 'Banking · Cybersecurity · Generative AI',
    tech: ['Claude Haiku', 'Claude Sonnet', 'Claude API', 'Java', 'Spring Boot', 'MySQL', 'Docker', 'Model Routing', 'AI Evaluation'],
    metrics: [
      { label: 'Extraction Accuracy', value: '94.7%' },
      { label: 'AI Pipeline', value: '4-stage · Haiku + Sonnet' },
      { label: 'Regulatory Clock', value: 'RBI 6-hour window' },
      { label: 'LLM Gateway', value: 'Cost-capped' },
    ],
    overview: 'Fortivance connects vendor incidents, contracts and audit reports to the banking services that depend on them. When a vendor such as a payment switch or cloud provider has an incident, it traces which customer services are exposed, runs a live countdown against the RBI six-hour reporting window, and checks whether the bank holds the contractual evidence regulators expect. Claude reads notices and drafts response plans; deterministic code handles everything that must be exact; people make every decision. Built for the GoDaddy Hackathon and inspired by the July 2024 C-Edge ransomware incident that cut ~300 small Indian banks off UPI.',
    challenges: [
      'Vendor notices arrive hours into the 6-hour RBI reporting window, and impact analysis still runs on calls and spreadsheets.',
      'Compliance evidence (audit rights, incident notification, subcontractor controls) is buried in long contracts and SOC 2 reports reviewed by hand.',
      'LLM output in a regulated domain must be verifiable: hallucinated citations or instructions injected into an uploaded notice are unacceptable.',
      'Small co-operative banks and NBFCs carry the same regulatory duty with one or two people.'
    ],
    solutions: [
      'Engineered a four-stage AI pipeline with model routing: Claude Haiku extracts vendor incident intelligence and drafts briefings, Claude Sonnet maps contract evidence to RBI requirements and generates response plans, and plain testable code handles matching, graph traversal and clocks.',
      'Built a dependency graph (vendor → fourth party → application → business service) that surfaces single points of failure and impact tolerances in seconds.',
      'Clause-level evidence mapping to RBI 2025 outsourcing Directions: the model may cite only clause IDs that exist in the document, and every citation is validated and shown with its source text.',
      'Prompt-injection defence: uploaded notices are treated as untrusted data, embedded instructions are flagged and ignored, and unrecognised sender domains get no automatic plan.',
      'Achieved 94.7% extraction accuracy against hand-labelled data with schema-enforced outputs; evaluation also tracks evidence agreement and citation rejection rate.',
      'Routed every model call through a cost-capped LLM gateway with result caching, per-call token logging and a daily spend cap.',
      'Human-in-the-loop by design: plans need an approver, findings need an analyst, and the system never makes a regulatory verdict.',
      'Built the backend on Java, Spring Boot and MySQL, shipped as a single-command Docker stack for a dedicated per-bank instance, with Excel register import validated line by line.'
    ],
    diagramComponent: <FortivanceDiagram />,
    liveUrl: 'https://fortivance.in/',
    featured: true,
  },
  {
    id: 'amcom',
    title: 'Amcom AI Enterprise Platform',
    subtitle: 'Generative AI WhatsApp Automation: Extraction, Intent Classification & Response Generation',
    category: 'Generative AI · Distributed Backend',
    tech: ['Java', 'Kafka', 'Django', 'Python', 'OpenAI API', 'AWS', 'Docker'],
    metrics: [
      { label: 'GenAI Tasks', value: 'Extract · Classify · Reply' },
      { label: 'AI Security', value: 'Structured outputs + HITL' },
      { label: 'Team', value: 'Led 5 engineers' },
      { label: 'Cloud Infrastructure', value: 'AWS + Docker' },
    ],
    overview: 'Amcom is an enterprise-grade AI messaging platform integrating WhatsApp Business with OpenAI function calling and Apache Kafka event streams. It automatically parses user requests, routes payload tasks to asynchronous worker clusters, and generates context-aware natural language responses.',
    challenges: [
      'Managing high-volume async inbound webhooks without blocking web servers.',
      'Ensuring atomic context isolation for concurrent conversational user sessions.',
      'Rate-limiting external OpenAI API calls while preserving responsiveness.'
    ],
    solutions: [
      'Architected an Apache Kafka event bus separating webhook ingestion from AI worker tasks.',
      'Utilized Redis state store for sub-millisecond conversation memory retrieval.',
      'Deployed resilient Spring Boot / Django worker microservices on AWS.',
      'Implemented AI security controls: structured outputs, input validation and human-in-the-loop approval before automated replies.'
    ],
    diagramComponent: <AmcomDiagram />,
  },
  {
    id: 'pyramid-solar',
    title: 'Solar & EV Charge IoT Platform',
    subtitle: 'High-Throughput Telemetry Pipeline & OCPI-Based EV Charging Platform',
    category: 'Distributed IoT & Telemetry',
    tech: ['Java', 'Spring Boot', 'Kafka', 'MQTT', 'Redis', 'OCPI', 'Docker', 'Kubernetes', 'AWS'],
    metrics: [
      { label: 'Connected Devices', value: '10,000+' },
      { label: 'Daily API Requests', value: '10M+' },
      { label: 'Platform Uptime', value: '99.9%' },
      { label: 'SQL Query Time', value: '−90%' },
    ],
    overview: 'A scalable IoT telemetry engine for 10,000+ solar inverters and EV chargers, handling 10M+ API requests per day at 99.9% uptime over Kafka, MQTT and Redis. It processes voltage, energy output and thermal diagnostics in real time, and includes an OCPI-based EV charging platform deployed on AWS with Docker and Kubernetes.',
    challenges: [
      'Intermittent connectivity across remote solar array hardware endpoints.',
      'High disk I/O load during peak solar generation hours.',
      'Real-time anomaly detection and alert triggering.'
    ],
    solutions: [
      'Implemented Kafka partitioning strategy grouped by region and device clusters.',
      'Built multi-layer Redis caching tier to buffer incoming sensor bursts.',
      'Configured automated Spring Boot fault recovery and zero-loss message offset tracking.',
      'Built an OCPI-based EV charging platform on AWS, Docker and Kubernetes.',
      'Reduced SQL query execution time by 90% through normalization and indexing.'
    ],
    diagramComponent: <SolarDiagram />,
  },
  {
    id: 'visa-rms',
    title: 'Resource Management System (Visa)',
    subtitle: 'Secure Bank Offer APIs with Role-Based Access Control',
    category: 'Banking · Secure APIs',
    tech: ['Java', 'Python', 'Spring Boot', 'Angular', 'Robot Framework', 'OpenAI API', 'AWS'],
    metrics: [
      { label: 'Domain', value: 'Banking & Financial Services' },
      { label: 'Access Control', value: 'RBAC + Org-level' },
      { label: 'Offer Lifecycle', value: 'Cron-based expiry' },
      { label: 'Testing', value: 'Robot Framework' },
    ],
    overview: 'An enterprise resource management system for Visa built at Codeinsight Technologies, centred on secure bank offer APIs. Offers are protected by role-based and organization-level access control, validated at the database layer, and expired automatically by scheduled jobs.',
    challenges: [
      'Bank offers must only be visible and editable by the right roles within the right organization.',
      'Invalid or stale offers reaching customers carries regulatory and reputational risk.',
      'Manual regression testing slowed releases in a security-sensitive codebase.'
    ],
    solutions: [
      'Implemented secure bank offer APIs with RBAC and organization-level access control.',
      'Added database-level validation so malformed offers are rejected before persistence.',
      'Built cron-based expiry handling to retire offers automatically.',
      'Automated regression suites with Robot Framework in the CI/CD workflow.'
    ],
  },
];

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <section id="projects-section" className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-dark-950 relative border-t border-white/5 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[600px] h-[280px] sm:h-[600px] bg-accent-blue/5 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-accent-cyan">
              <Layers className="w-3.5 h-3.5" />
              <span>FEATURED SYSTEM ARCHITECTURES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-indigo">Case Studies</span>
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-sm">
            Detailed breakdown of applied-AI products, guarded LLM pipelines, and high-throughput production backends.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-3xl p-5 sm:p-8 lg:p-10 glass-card glass-panel-hover cursor-pointer overflow-hidden flex flex-col justify-between ${
                project.featured ? 'lg:col-span-2 border-purple-500/30' : ''
              }`}
            >
              {/* Specular Highlight */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-cyan/10 rounded-full blur-2xl group-hover:bg-accent-cyan/25 transition-all" />

              <div className="space-y-4 sm:space-y-6">
                {/* Category & Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-accent-cyan">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] sm:text-[11px] font-mono text-purple-300">
                        <Bot className="w-3 h-3" /> Featured · Live
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors flex items-center gap-1">
                    Explore Case Study <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 pt-1 sm:pt-2">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="p-3 sm:p-3.5 rounded-xl bg-dark-900/80 border border-white/10 space-y-1">
                      <div className="text-[10px] font-mono text-slate-400">{m.label}</div>
                      <div className="text-sm sm:text-base font-bold font-mono text-white">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Trigger Bar */}
              <div className="mt-6 sm:mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[11px] sm:text-xs">{project.diagramComponent ? 'Click to view interactive diagram' : 'Click to view case study'}</span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-purple-300 hover:text-white hover:underline underline-offset-4"
                    >
                      {new URL(project.liveUrl).hostname} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-cyan group-hover:text-dark-950 transition-colors shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
