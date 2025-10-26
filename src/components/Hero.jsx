import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/DtQLjBkD1UpownGS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-neutral-950/60 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Advanced Women Safety, Reimagined
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-4 text-lg md:text-xl text-white/80"
          >
            One-tap SOS, real-time location sharing, safety timers, and discreet alerts — secured by modern technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <a href="#sos" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-emerald-500 text-neutral-900 font-semibold hover:bg-emerald-400 transition">
              Launch SOS Panel
            </a>
            <a href="#features" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 transition">
              Explore Features
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
