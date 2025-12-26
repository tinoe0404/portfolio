'use client';

import { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Send Me a Message</h2>

      {status === 'success' && (
        <div className="mb-4 text-green-400">Message sent successfully.</div>
      )}
      {status === 'error' && (
        <div className="mb-4 text-red-400">Failed to send message.</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" required value={formData.name} onChange={handleChange}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
          placeholder="Your name" />

        <input name="email" type="email" required value={formData.email} onChange={handleChange}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
          placeholder="Email" />

        <textarea name="message" required rows={5} value={formData.message} onChange={handleChange}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
          placeholder="Message" />

        <button disabled={status === 'loading'}
          className="w-full py-3 bg-blue-600 rounded text-white">
          {status === 'loading' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
