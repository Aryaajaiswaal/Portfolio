import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ExternalLink, AlertCircle, Loader2, Mail } from 'lucide-react';
import ContactButton from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Agentic AI & Workflows',
    budget: 'Project Collaboration',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Configured webhook or access key from environment variables
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID || '';
  const customWebhookUrl = import.meta.env.VITE_WEBHOOK_URL || '';
  const fallbackEmail = import.meta.env.VITE_CONTACT_EMAIL || 'aryaa.jaiswal@example.com';

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      projectType: 'Agentic AI & Workflows',
      budget: 'Project Collaboration',
      message: '',
    });
    setStatus('idle');
    setErrorMessage('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const payload = {
      name: formData.name,
      email: formData.email,
      interest_area: formData.projectType,
      collaboration_type: formData.budget,
      message: formData.message,
      subject: `Portfolio Inquiry from ${formData.name} [${formData.projectType}]`,
      from_name: `${formData.name} (via Portfolio)`,
    };

    try {
      if (web3FormsKey) {
        // 1. Web3Forms integration
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            ...payload,
          }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to transmit message via Web3Forms.');
        }
      } else if (formspreeId) {
        // 2. Formspree integration
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to transmit message via Formspree.');
        }
      } else if (customWebhookUrl) {
        // 3. Custom Webhook URL (Discord / Slack / Zapier / n8n / custom backend)
        const response = await fetch(customWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Webhook responded with status ${response.status}`);
        }
      } else {
        // 4. Fallback simulation when no key is set yet (development mode)
        console.warn(
          '[ContactModal Webhook] No VITE_WEB3FORMS_ACCESS_KEY, VITE_FORMSPREE_ID, or VITE_WEBHOOK_URL found in .env. Simulating successful transmission.'
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setStatus('success');
    } catch (err: any) {
      console.error('[ContactModal Webhook Error]', err);
      setStatus('error');
      setErrorMessage(
        err?.message || 'Unable to deliver message through webhook. Please try again or reach out directly.'
      );
    }
  };

  const directMailtoHref = `mailto:${fallbackEmail}?subject=${encodeURIComponent(
    `Portfolio Inquiry: ${formData.projectType}`
  )}&body=${encodeURIComponent(
    `Hi Aryaa,\n\nName: ${formData.name}\nEmail: ${formData.email}\nInterest: ${formData.projectType}\nCollaboration: ${formData.budget}\n\nMessage:\n${formData.message}\n`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#141416] border border-[#2A2E35] rounded-3xl p-6 sm:p-8 md:p-10 text-[#D7E2EA] shadow-2xl z-10 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold">Initiate Collaboration</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mt-1">
                Let&apos;s Build Something Meaningful
              </h2>
              <p className="text-sm text-[#D7E2EA]/70 mt-2 font-light">
                Curious about AI, intelligent systems, and software that solves real problems? Explore my work or connect with me.
              </p>
            </div>

            {/* Verified Profiles Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href="https://www.linkedin.com/in/aaryaa-jaiswwall-7n/?isSelfProfile=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1A1D23] border border-[#2E333D] hover:border-white/30 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#252A34] flex items-center justify-center text-[#BBCCD7] group-hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#D7E2EA]/60 uppercase tracking-wider font-light">Professional Network</div>
                    <div className="text-sm font-medium text-white">LinkedIn Profile</div>
                  </div>
                </div>
                <span className="text-xs text-[#BBCCD7] group-hover:text-white">&rarr;</span>
              </a>

              <a
                href="https://github.com/Aryaajaiswaal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1A1D23] border border-[#2E333D] hover:border-white/30 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#252A34] flex items-center justify-center text-[#BBCCD7] group-hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#D7E2EA]/60 uppercase tracking-wider font-light">Code & Repositories</div>
                    <div className="text-sm font-medium text-white">GitHub Profile</div>
                  </div>
                </div>
                <span className="text-xs text-[#BBCCD7] group-hover:text-white">&rarr;</span>
              </a>
            </div>

            {/* Status Views */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10 px-4 bg-[#1A1D23]/60 rounded-2xl border border-emerald-500/30"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">Message Transmitted</h3>
                <p className="text-sm text-[#D7E2EA]/75 mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your inquiry has been dispatched to Aryaa&apos;s inbox. You will receive a response shortly.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider text-white transition-all cursor-pointer"
                  >
                    Send Another Note
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider text-white transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 px-5 bg-rose-950/20 rounded-2xl border border-rose-500/30 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">Transmission Notice</h3>
                <p className="text-xs text-[#D7E2EA]/75 mt-1.5 max-w-md mx-auto">
                  {errorMessage}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all cursor-pointer"
                  >
                    Back to Form
                  </button>
                  <a
                    href={directMailtoHref}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B600A8] bg-[#B600A8]/20 hover:bg-[#B600A8]/30 text-xs font-semibold uppercase tracking-wider text-white transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Default Email App</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#1A1D23] border border-[#2E333D] focus:border-[#BBCCD7] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1A1D23] border border-[#2E333D] focus:border-[#BBCCD7] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">Interest Area</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#1A1D23] border border-[#2E333D] focus:border-[#BBCCD7] rounded-xl px-4 py-2.5 text-sm text-white outline-none cursor-pointer"
                    >
                      <option value="Agentic AI & Workflows">Agentic AI & Workflows</option>
                      <option value="LLM Applications & RAG">LLM Applications & RAG</option>
                      <option value="AI Backend & API Engineering">AI Backend & API Engineering</option>
                      <option value="Data Intelligence & Text-to-SQL">Data Intelligence & Text-to-SQL</option>
                      <option value="Machine Learning & Vision">Machine Learning & Computer Vision</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">Collaboration Type</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#1A1D23] border border-[#2E333D] focus:border-[#BBCCD7] rounded-xl px-4 py-2.5 text-sm text-white outline-none cursor-pointer"
                    >
                      <option value="Project Collaboration">Project Collaboration</option>
                      <option value="Internship / Role">Internship / Role Opportunity</option>
                      <option value="Research & Experimentation">Research & Experimentation</option>
                      <option value="Technical Discussion">Technical Discussion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">Message</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell Aryaa about your ideas, questions, or opportunities..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#1A1D23] border border-[#2E333D] focus:border-[#BBCCD7] rounded-xl p-3 text-sm text-white placeholder-white/30 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-[#D7E2EA]/60 font-light">
                    <span>CSE (AI) Student</span>
                    <span>·</span>
                    <span>Open to Opportunities</span>
                  </div>
                  <ContactButton
                    type="submit"
                    disabled={status === 'submitting'}
                    label={status === 'submitting' ? 'Transmitting...' : 'Send Note'}
                    className="!px-6 !py-2.5 text-sm"
                  />
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

