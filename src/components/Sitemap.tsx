import React, { useState } from 'react';
import { 
  Compass, 
  MousePointer, 
  ArrowDownRight, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Zap, 
  Send, 
  CornerDownRight
} from 'lucide-react';

interface SitemapNode {
  id: string;
  section: string;
  anchor: string;
  title: string;
  description: string;
  category: 'page' | 'modal' | 'external';
  ctas: {
    label: string;
    type: 'primary' | 'secondary' | 'external' | 'modal';
    target: string;
    description: string;
    action?: () => void;
  }[];
  children?: string[];
}

interface SitemapProps {
  onOpenInviteModal: () => void;
}

export default function Sitemap({ onOpenInviteModal }: SitemapProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'primary' | 'secondary' | 'modals'>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('hero');

  const nodes: SitemapNode[] = [
    {
      id: 'global-nav',
      section: 'Global Header',
      anchor: '#top',
      title: 'Sticky Bubble Menu & Brand Header',
      description: 'Persistent top-level navigation with responsive floating bubble items.',
      category: 'page',
      ctas: [
        {
          label: 'Invite Me CTA',
          type: 'primary',
          target: 'Invite Modal',
          description: 'Triggers direct interview invite dialog.',
          action: onOpenInviteModal
        },
        {
          label: 'Section Jump Links',
          type: 'secondary',
          target: 'Anchor Sections',
          description: 'Smooth scroll to Proof, Projects, Skills, Education, Sitemap.'
        }
      ]
    },
    {
      id: 'hero',
      section: 'Hero Section',
      anchor: '#hero',
      title: 'Value Proposition & Positioning',
      description: 'First impression highlighting 10x prototyping speed, full-stack autonomy, and code auditing.',
      category: 'page',
      ctas: [
        {
          label: 'Invite Me to Interview',
          type: 'primary',
          target: 'Invite Modal',
          description: 'Specular glowing button driving top-of-funnel lead generation.',
          action: onOpenInviteModal
        },
        {
          label: 'Inspect Shipped Work',
          type: 'secondary',
          target: '#projects',
          description: 'Anchor link taking tech leads directly to published code.'
        }
      ]
    },
    {
      id: 'proof',
      section: 'Section 01',
      anchor: '#proof',
      title: 'The Proof: UI Refactor & Code Audit',
      description: 'Interactive side-by-side comparison of raw AI output vs Sakshi\'s audited production code.',
      category: 'page',
      ctas: [
        {
          label: 'Scenario Selector Tabs',
          type: 'secondary',
          target: 'Inline State',
          description: 'Toggles code diff scenarios (Auth Security, Memory Leaks, Rate Limiting).'
        },
        {
          label: 'Raw vs Audited Diff',
          type: 'secondary',
          target: 'Code Inspector',
          description: 'Visual code audit breakdown highlighting vulnerability fixes.'
        }
      ]
    },
    {
      id: 'projects',
      section: 'Section 02',
      anchor: '#projects',
      title: 'Proof of Shipment: Published Work',
      description: 'Grid of published web apps with velocity badges, tech stacks, and live links.',
      category: 'page',
      ctas: [
        {
          label: 'Event Planner Live Demo',
          type: 'external',
          target: 'External URL',
          description: 'Direct link to deployed event scheduling app.'
        },
        {
          label: 'Hyperlocal Marketplace Demo',
          type: 'external',
          target: 'External URL',
          description: 'Direct link to deployed UPI commerce platform.'
        }
      ]
    },
    {
      id: 'skills',
      section: 'Section 03',
      anchor: '#skills',
      title: 'Capabilities & Technical Mastery',
      description: 'Dual skill columns featuring soft skill wheel and full-stack technical stack.',
      category: 'page',
      ctas: [
        {
          label: 'Interactive Wheel & Drag',
          type: 'secondary',
          target: 'UI Interaction',
          description: 'Rotatable option wheel and horizontal scroll cards.'
        }
      ]
    },
    {
      id: 'education',
      section: 'Section 04',
      anchor: '#education',
      title: 'Certifications & Credentials',
      description: 'Verified professional certifications and technical degree achievements.',
      category: 'page',
      ctas: [
        {
          label: 'LinkedIn Credentials Verification',
          type: 'external',
          target: 'LinkedIn Profile',
          description: 'External verification link to official LinkedIn profile.'
        }
      ]
    },
    {
      id: 'sitemap-node',
      section: 'Section 05',
      anchor: '#sitemap',
      title: 'Interactive Sitemap & Architecture',
      description: 'Visual map of site structure, navigation hierarchy, and CTA placement strategy.',
      category: 'page',
      ctas: [
        {
          label: 'Filter Architecture View',
          type: 'secondary',
          target: 'Sitemap State',
          description: 'Filters view by Primary CTAs, Secondary Anchors, or Modals.'
        }
      ]
    },
    {
      id: 'contact',
      section: 'Section 06',
      anchor: '#contact',
      title: 'Footer & Conversion Gateway',
      description: 'Final call to action for hiring managers, tech leads, and direct email dispatch.',
      category: 'page',
      ctas: [
        {
          label: 'Send Interview Invite',
          type: 'primary',
          target: 'Invite Modal',
          description: 'Primary bottom conversion CTA launching interview dispatch modal.',
          action: onOpenInviteModal
        },
        {
          label: 'Copy Email / Launch Mail',
          type: 'secondary',
          target: 'Clipboard / mailto',
          description: 'Direct communication shortcut.'
        },
        {
          label: 'Back to Top Floating CTA',
          type: 'secondary',
          target: '#top',
          description: 'Floating button returning user to top.'
        }
      ]
    },
    {
      id: 'invite-modal',
      section: 'Modal Layer',
      anchor: '#',
      title: 'Interview Invite Modal Overlay',
      description: 'Direct form modal collecting recruiter contact details, interview date, and message.',
      category: 'modal',
      ctas: [
        {
          label: 'Submit Invitation',
          type: 'primary',
          target: 'Email Dispatch',
          description: 'Sends direct interview invite to Sakshi.'
        }
      ]
    }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[1];

  const filteredNodes = nodes.filter(node => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'primary') return node.ctas.some(c => c.type === 'primary');
    if (activeFilter === 'secondary') return node.ctas.some(c => c.type === 'secondary');
    if (activeFilter === 'modals') return node.category === 'modal';
    return true;
  });

  const getCtaBadgeColor = (type: string) => {
    switch (type) {
      case 'primary': return 'bg-[#6B1D2F] text-white border-[#8C2D40]';
      case 'secondary': return 'bg-stone-800 text-stone-200 border-stone-700';
      case 'external': return 'bg-[#E07A5F]/20 text-[#E07A5F] border-[#E07A5F]/40';
      case 'modal': return 'bg-rose-950 text-rose-200 border-rose-800';
      default: return 'bg-stone-200 text-stone-800 border-stone-300';
    }
  };

  return (
    <section id="sitemap" className="py-24 px-6 md:px-20 bg-[#FDFBF7] border-t border-stone-200/80 relative overflow-hidden">
      {/* Structural Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6B1D2F]/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-[1px] w-10 bg-[#6B1D2F]" />
              <span className="text-[#8C2D40] font-bold uppercase tracking-widest text-xs sm:text-sm flex items-center gap-1.5">
                <Compass size={16} /> Architectural Map
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1C1917]">
              Sitemap & CTA Architecture
            </h2>
            <p className="text-stone-600 text-base md:text-lg mt-2 max-w-xl">
              Visual breakdown of page layout hierarchy, user conversion flows, and strategic CTA placements.
            </p>
          </div>

          {/* View Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 bg-stone-200/60 p-1.5 rounded-2xl border border-stone-300/60">
            {[
              { id: 'all', label: 'All Architecture' },
              { id: 'primary', label: 'Primary CTAs' },
              { id: 'secondary', label: 'Nav & Anchors' },
              { id: 'modals', label: 'Modal Flows' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === filter.id 
                    ? 'bg-[#6B1D2F] text-white shadow-md' 
                    : 'text-stone-700 hover:bg-stone-300/50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sitemap Visual Map & Node Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Top: Interactive Visual Flow Tree (8 cols) */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-sm relative">
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
              <div className="flex items-center space-x-2">
                <Layers className="text-[#8C2D40]" size={18} />
                <span className="font-bold text-xs uppercase tracking-wider text-stone-500">
                  Interactive Node Flow Diagram
                </span>
              </div>
              <span className="text-[11px] font-semibold text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
                {filteredNodes.length} Nodes Mapped
              </span>
            </div>

            {/* Diagram Flow Container */}
            <div className="space-y-4 relative">
              {/* Vertical Linking Backbone Line */}
              <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-stone-200/80 -z-0" />

              {filteredNodes.map((node, index) => {
                const isSelected = selectedNodeId === node.id;
                const hasPrimary = node.ctas.some(c => c.type === 'primary');

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`relative z-10 flex items-start space-x-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-[#FDFBF7] border-[#6B1D2F] ring-2 ring-[#6B1D2F]/20 shadow-md translate-x-1' 
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/80'
                    }`}
                  >
                    {/* Node Number Circle */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      hasPrimary 
                        ? 'bg-[#6B1D2F] text-white shadow-sm' 
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Node Summary */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                          {node.section}
                        </span>
                        {node.category === 'modal' && (
                          <span className="text-[10px] font-extrabold uppercase bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                            Modal Layer
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm sm:text-base text-[#1C1917] truncate mt-0.5">
                        {node.title}
                      </h4>

                      <p className="text-xs text-stone-500 line-clamp-1 mt-1">
                        {node.description}
                      </p>

                      {/* CTA Badges Strip */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {node.ctas.map((cta, cIndex) => (
                          <span
                            key={cIndex}
                            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCtaBadgeColor(cta.type)}`}
                          >
                            <MousePointer size={10} />
                            {cta.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <CornerDownRight size={16} className={`shrink-0 mt-2 transition-transform ${isSelected ? 'text-[#8C2D40] rotate-45' : 'text-stone-300'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right / Bottom: Selected Node Details & CTA Direct Trigger (5 cols) */}
          <div className="lg:col-span-5 bg-[#1C1917] text-white p-6 md:p-8 rounded-3xl border border-stone-800 shadow-xl sticky top-28">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800">
              <div className="flex items-center space-x-2 text-[#E07A5F]">
                <Sparkles size={18} />
                <span className="font-bold text-xs uppercase tracking-widest">
                  Node & CTA Inspector
                </span>
              </div>
              <span className="text-[10px] font-extrabold uppercase bg-stone-800 text-stone-300 px-2.5 py-1 rounded-full">
                {selectedNode.section}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
              {selectedNode.title}
            </h3>

            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              {selectedNode.description}
            </p>

            {/* Conversion Role & CTAs Included */}
            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Mapped CTAs & Interaction Flow
              </h4>

              {selectedNode.ctas.map((cta, i) => (
                <div key={i} className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap size={14} className="text-[#E07A5F]" />
                      {cta.label}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getCtaBadgeColor(cta.type)}`}>
                      {cta.type}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed">
                    {cta.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-mono">Target: {cta.target}</span>
                    
                    {cta.action ? (
                      <button
                        onClick={cta.action}
                        className="text-[#E07A5F] hover:text-white font-bold inline-flex items-center gap-1 transition-colors"
                      >
                        Trigger CTA <ExternalLink size={12} />
                      </button>
                    ) : selectedNode.anchor.startsWith('#') ? (
                      <a
                        href={selectedNode.anchor}
                        className="text-[#E07A5F] hover:text-white font-bold inline-flex items-center gap-1 transition-colors"
                      >
                        Jump to Section <ArrowDownRight size={12} />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Button */}
            {selectedNode.anchor.startsWith('#') ? (
              <a
                href={selectedNode.anchor}
                className="w-full bg-[#6B1D2F] hover:bg-[#8C2D40] text-white py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                <span>Navigate to {selectedNode.section}</span>
                <ArrowDownRight size={16} />
              </a>
            ) : (
              <button
                onClick={onOpenInviteModal}
                className="w-full bg-[#6B1D2F] hover:bg-[#8C2D40] text-white py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                <span>Open Direct Interview Invite</span>
                <Send size={16} />
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
