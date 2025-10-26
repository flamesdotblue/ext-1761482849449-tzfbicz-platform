import React from 'react';
import { AlertTriangle, MapPin, PhoneCall, Clock, Eye, Mic, Share2, Bell, Lock, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: AlertTriangle,
    title: 'One-Tap SOS',
    desc: 'Instantly alert trusted contacts with your live location and status.'
  },
  {
    icon: MapPin,
    title: 'Live Tracking',
    desc: 'Share real-time GPS updates with adjustable privacy controls.'
  },
  {
    icon: Clock,
    title: 'Safety Timer',
    desc: 'Set a timer for trips. If you don’t check in, alerts are sent.'
  },
  {
    icon: PhoneCall,
    title: 'Discreet Calls',
    desc: 'Trigger a silent or fake call to de-escalate risky situations.'
  },
  {
    icon: Eye,
    title: 'Guardian Mode',
    desc: 'Background monitoring for inactivity spikes or unusual stops.'
  },
  {
    icon: Mic,
    title: 'Voice Keyword',
    desc: 'Activate SOS using a chosen voice keyword when hands are busy.'
  },
  {
    icon: Share2,
    title: 'Secure Sharing',
    desc: 'Send a temporary, revocable tracking link with end-to-end awareness.'
  },
  {
    icon: Bell,
    title: 'Check-in Reminders',
    desc: 'Smart nudges to confirm safety at intervals you set.'
  },
  {
    icon: Lock,
    title: 'Privacy-First',
    desc: 'Your data stays on your device when possible; you control who sees it.'
  },
  {
    icon: MessageSquare,
    title: 'Incident Log',
    desc: 'Record notes and media to document and remember key details.'
  },
];

export default function FeatureGrid() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold">Powerful, privacy-first safety features</h2>
      <p className="text-white/70 mt-2 max-w-2xl">Designed to help you act fast, communicate clearly, and stay connected with the people who matter.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/8 transition">
            <div className="flex items-start gap-4">
              <f.icon className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-white/70 mt-1">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
