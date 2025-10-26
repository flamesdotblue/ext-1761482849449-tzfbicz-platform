import React, { useEffect, useState } from 'react';
import { UserPlus, MapPin, Share2 } from 'lucide-react';

const STORAGE_KEY = 'aegis_trusted_contacts_v1';

export default function TrustedContacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setContacts(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch {}
  }, [contacts]);

  const addContact = () => {
    if (!name.trim() || !channel.trim()) return;
    setContacts((prev) => [...prev, { id: crypto.randomUUID(), name: name.trim(), channel: channel.trim() }]);
    setName('');
    setChannel('');
  };

  const removeContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const shareCheckIn = async () => {
    const text = message?.trim() || 'Checking in — I am safe.';
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Safety Check-in', text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        alert('Message copied to clipboard');
      }
    } catch {}
  };

  const shareLocation = async () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const url = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
        const text = `Here is my current location: ${url}`;
        try {
          if (navigator.share) {
            await navigator.share({ title: 'My Location', text, url });
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            alert('Location link copied');
          }
        } catch {}
      },
      () => alert('Unable to get location')
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-semibold">Trusted Contacts</h3>
        <p className="text-white/70 text-sm mt-1">Add people who should receive your SOS alerts and check-ins.</p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="flex-1 px-3 py-2 bg-neutral-900/60 border border-white/10 rounded-md outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
          <input
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            placeholder="Phone or Email"
            className="flex-1 px-3 py-2 bg-neutral-900/60 border border-white/10 rounded-md outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
          <button onClick={addContact} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 text-neutral-900 font-semibold">
            <UserPlus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.length === 0 && (
            <div className="text-white/60 text-sm">No contacts yet. Add trusted friends, family, or guardians.</div>
          )}
          {contacts.map((c) => (
            <div key={c.id} className="border border-white/10 rounded-lg p-4 bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-white/60">{c.channel}</div>
                </div>
                <button onClick={() => removeContact(c.id)} className="text-xs text-white/60 hover:text-white">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h4 className="font-semibold">Quick Check-in</h4>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Optional note (e.g., ‘Arrived home safely’, ‘Boarding cab ending in 1234’)"
          className="mt-3 w-full min-h-[120px] px-3 py-2 bg-neutral-900/60 border border-white/10 rounded-md outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
        <div className="mt-3 flex gap-2">
          <button onClick={shareCheckIn} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-500 text-neutral-900 font-semibold">
            <Share2 className="w-4 h-4" /> Share Check-in
          </button>
          <button onClick={shareLocation} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 border border-white/10 hover:bg-white/15">
            <MapPin className="w-4 h-4 text-emerald-400" /> Share Location
          </button>
        </div>
        <p className="text-xs text-white/60 mt-3">Shares via your device's native share sheet when available, or copies to clipboard.</p>
      </div>
    </div>
  );
}
