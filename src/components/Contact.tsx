'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const { theme } = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-transparent transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight drop-shadow-md ${theme.text}`}>Get In Touch</h2>
                    <p className={`text-lg font-light drop-shadow-sm ${theme.subtext}`}>
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </p>
                </div>

                <div className={`max-w-xl mx-auto backdrop-blur-xl border rounded-3xl p-8 shadow-xl transition-all duration-300 ${theme.isNight ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border ${theme.isNight ? 'bg-white/20 text-white border-white/30' : 'bg-white/50 text-midnight border-white/40'}`}>
                                <Send className="h-8 w-8" />
                            </div>
                            <h3 className={`text-2xl font-bold mb-2 ${theme.text}`}>Message Sent!</h3>
                            <p className={`${theme.subtext}`}>
                                Thanks for reaching out. I'll get back to you soon.
                            </p>
                            <button
                                onClick={() => setStatus('')}
                                className="mt-6 text-marigold hover:text-white font-medium transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${theme.subtext}`}>Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className={`mt-1 block w-full rounded-xl shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm ${theme.isNight ? 'bg-white/10 border-white/20 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-midnight placeholder-midnight/50'}`}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${theme.subtext}`}>Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className={`mt-1 block w-full rounded-xl shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm ${theme.isNight ? 'bg-white/10 border-white/20 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-midnight placeholder-midnight/50'}`}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${theme.subtext}`}>Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={4}
                                    className={`mt-1 block w-full rounded-xl shadow-sm focus:border-marigold focus:ring-marigold p-3 border transition-all duration-300 backdrop-blur-sm ${theme.isNight ? 'bg-white/10 border-white/20 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-midnight placeholder-midnight/50'}`}
                                    placeholder="Tell me about your project..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center items-center py-3 px-4 border-2 rounded-full shadow-lg text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5 backdrop-blur-sm ${theme.isNight ? 'border-lionsmane/20 text-lionsmane bg-midnight/30 hover:bg-lionsmane/10 focus:ring-lionsmane' : 'border-midnight/20 text-midnight bg-white/40 hover:bg-white/60 focus:ring-midnight'}`}
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        Send Message <Mail className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
