import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, MapPin, Share2, Clock, PhoneCall } from 'lucide-react';

function formatTime(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function SOSPanel() {
  const [active, setActive] = useState(false);
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState('Idle');
  const [error, setError] = useState('');
  const [timerMs, setTimerMs] = useState(0);
  const [targetMs, setTargetMs] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [fakeCallAt, setFakeCallAt] = useState(0);
  const watchIdRef = useRef(null);

  const shareUrl = useMemo(() => {
    if (!coords) return '';
    const { latitude, longitude } = coords;
    return `https://maps.google.com/?q=${latitude},${longitude}`;
  }, [coords]);

  useEffect(() => {
    return () => {
      if (watchIdRef.current && navigator.geolocation?.clearWatch) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const requestLocation = () => {
    setError('');
    if (!('geolocation' in navigator)) {
      setError('Geolocation not supported by this browser.');
      return;
    }
    try {
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy });
        },
        (err) => {
          setError(err.message || 'Unable to retrieve location.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
      );
      watchIdRef.current = id;
    } catch (e) {
      setError('Location permission denied or unavailable.');
    }
  };

  const handleShare = async () => {
    if (!shareUrl) return;
    const text = `I need help. Track my live location here: ${shareUrl}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'SOS — Live Location', text, url: shareUrl });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setStatus('Location link copied to clipboard');
      } else {
        setStatus('Share not supported. Copy this: ' + shareUrl);
      }
    } catch (e) {
      setStatus('Share canceled or failed');
    }
  };

  const toggleSOS = () => {
    const next = !active;
    setActive(next);
    setStatus(next ? 'SOS Active' : 'Idle');
    if (next) {
      requestLocation();
      if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
    } else {
      if (watchIdRef.current && navigator.geolocation?.clearWatch) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    }
  };

  const startTimer = (minutes) => {
    const durationMs = minutes * 60 * 1000;
    const target = Date.now() + durationMs;
    setTargetMs(target);
    setTimerMs(durationMs);
    if (intervalId) clearInterval(intervalId);
    const id = setInterval(() => {
      const remaining = target - Date.now();
      setTimerMs(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        setStatus('Safety timer ended — sending alerts');
        if (navigator.vibrate) navigator.vibrate([120, 80, 120]);
      }
    }, 250);
    setIntervalId(id);
  };

  const scheduleFakeCall = (seconds) => {
    const when = Date.now() + seconds * 1000;
    setFakeCallAt(when);
    setStatus(`Fake call in ${seconds}s scheduled`);
    setTimeout(() => {
      alert('Incoming call: “Mom”\nSwipe to answer');
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
    }, seconds * 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className={`w-6 h-6 ${active ? 'text-red-400' : 'text-emerald-400'}`} />
          <h3 className="text-xl font-semibold">SOS Control Center</h3>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-6 items-stretch">
          <button
            onClick={toggleSOS}
            className={`flex-1 rounded-xl px-6 py-10 text-2xl font-bold transition transform active:scale-95 border ${
              active
                ? 'bg-red-500/90 hover:bg-red-500 text-white border-red-400/40'
                : 'bg-emerald-500/90 hover:bg-emerald-500 text-neutral-900 border-emerald-400/40'
            }`}
          >
            {active ? 'End SOS' : 'Activate SOS'}
          </button>

          <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Live Location</span>
            </div>
            <div className="mt-3 text-sm">
              {coords ? (
                <div>
                  <div>Lat: {coords.latitude.toFixed(5)} | Lng: {coords.longitude.toFixed(5)}</div>
                  <div className="text-white/60">Accuracy ~ {Math.round(coords.accuracy)}m</div>
                </div>
              ) : (
                <div className="text-white/60">Location not yet available. Activate SOS to start tracking.</div>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={requestLocation} className="px-3 py-2 text-sm rounded-md bg-white/10 border border-white/10 hover:bg-white/15">Refresh</button>
              <button onClick={handleShare} disabled={!coords} className="px-3 py-2 text-sm rounded-md bg-emerald-500 text-neutral-900 font-medium disabled:opacity-50 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share Link
              </button>
            </div>
            {shareUrl && (
              <div className="mt-2 text-xs text-white/60 break-all">{shareUrl}</div>
            )}
          </div>
        </div>

        <div className="mt-4 text-sm text-white/70">
          Status: <span className="text-white">{status}</span>
        </div>
        {error && <div className="mt-2 text-sm text-red-400">{error}</div>}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-5">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h4 className="font-semibold">Safety Timer</h4>
          </div>
          <div className="mt-3 flex gap-2">
            {[5, 10, 20, 30].map((m) => (
              <button key={m} onClick={() => startTimer(m)} className="px-3 py-2 text-sm rounded-md bg-white/10 border border-white/10 hover:bg-white/15">{m}m</button>
            ))}
          </div>
          <div className="mt-3 text-3xl font-mono tracking-widest">{formatTime(timerMs)}</div>
          {targetMs > 0 && (
            <div className="text-xs text-white/60 mt-1">Ends at {new Date(targetMs).toLocaleTimeString()}</div>
          )}
        </div>
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            <h4 className="font-semibold">Discreet Fake Call</h4>
          </div>
          <div className="mt-3 flex gap-2">
            {[10, 30, 60].map((s) => (
              <button key={s} onClick={() => scheduleFakeCall(s)} className="px-3 py-2 text-sm rounded-md bg-white/10 border border-white/10 hover:bg-white/15">In {s}s</button>
            ))}
          </div>
          {fakeCallAt > 0 && (
            <div className="text-xs text-white/60 mt-2">Scheduled at {new Date(fakeCallAt).toLocaleTimeString()}</div>
          )}
        </div>
      </div>
    </div>
  );
}
