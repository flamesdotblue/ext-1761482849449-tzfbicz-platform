import React from 'react';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import SOSPanel from './components/SOSPanel';
import TrustedContacts from './components/TrustedContacts';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="font-semibold tracking-tight">Aegis — Women Safety</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#sos" className="hover:text-white">SOS</a>
            <a href="#contacts" className="hover:text-white">Trusted Contacts</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <section id="features" className="max-w-7xl mx-auto px-4 py-16">
          <FeatureGrid />
        </section>
        <section id="sos" className="max-w-7xl mx-auto px-4 py-16">
          <SOSPanel />
        </section>
        <section id="contacts" className="max-w-7xl mx-auto px-4 py-16">
          <TrustedContacts />
        </section>
      </main>

      <footer className="border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-white/60">
          Built for safety, privacy, and peace of mind. Stay aware, stay connected.
        </div>
      </footer>
    </div>
  );
}
