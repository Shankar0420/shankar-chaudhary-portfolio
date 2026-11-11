import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const { contact = {}, social = {} } = usePortfolio();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const emailAddress = contact.email || "choudharyshankar0420@gmail.com";
  const phoneNumber = contact.phone || "9905340058";
  const formattedPhone = contact.phoneFormatted || "+91 9905340058";

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name (at least 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = "Please enter a clear subject (at least 3 characters).";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please enter a message with at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitState("validation_error");
      return;
    }

    // Launch default email client with pre-filled content
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Hello Shankar,\n\n${formData.message}\n\nFrom: ${formData.fullName}\nEmail: ${formData.email}`
    );
    const mailtoUrl = `mailto:${emailAddress}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    // Open mail client
    window.location.href = mailtoUrl;
    setSubmitState("sent");
  };

  const handleCopy = (text, fieldName) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Page Header */}
      <section className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30">
          <Mail className="w-3.5 h-3.5 text-cyan-300" />
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {contact.heading || "Let's Connect & Build Something Great"}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {contact.shortMessage}
        </p>
      </section>

      {/* Main Grid: Contact Channels + Direct Email Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Communication Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Email Direct Card */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Mail className="w-6 h-6 text-cyan-300" />
              </div>
              <button
                type="button"
                onClick={() => handleCopy(emailAddress, "email")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                title="Copy email address"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Professional Email
              </span>
              <p className="text-base sm:text-lg font-bold text-white break-all">
                {emailAddress}
              </p>
            </div>

            <a
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-md shadow-purple-950/40 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email Directly</span>
            </a>
          </div>

          {/* Mobile Phone Direct Card */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <Phone className="w-6 h-6" />
              </div>
              <button
                type="button"
                onClick={() => handleCopy(phoneNumber, "phone")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                title="Copy phone number"
              >
                {copiedField === "phone" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Mobile Phone
              </span>
              <p className="text-base sm:text-lg font-bold text-white font-mono">
                {formattedPhone}
              </p>
            </div>

            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call via Phone</span>
            </a>
          </div>

          {/* Professional Profiles Card */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800/90 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Professional Profiles & Networks
            </span>

            <div className="space-y-3">
              {/* LinkedIn */}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-sm font-bold text-white block">LinkedIn</span>
                      <span className="text-xs text-slate-400 font-mono">Connect professionally</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                </a>
              )}

              {/* GitHub */}
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800/60 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-sm font-bold text-white block">GitHub</span>
                      <span className="text-xs text-slate-400 font-mono">Explore repositories & code</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-300 transition-colors" />
                </a>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Location: {contact.locationDisplay || "India"}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/90 space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Send a Direct Message
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Fill in the details below. Clicking Send will launch your email client with your message prepared.
              </p>
            </div>

            {submitState === "sent" && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-300 text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-white">
                    Email Client Launched
                  </p>
                  <p className="text-slate-300 text-xs">
                    Your message has been formatted and opened in your email application addressed to <span className="text-cyan-300 font-mono">{emailAddress}</span>.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-xs font-mono font-medium text-slate-300 block">
                  Your Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border ${
                    errors.fullName ? "border-rose-500 focus:border-rose-500" : "border-slate-800 focus:border-purple-500"
                  } focus:outline-none transition-colors`}
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-400">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-mono font-medium text-slate-300 block">
                  Your Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border ${
                    errors.email ? "border-rose-500 focus:border-rose-500" : "border-slate-800 focus:border-purple-500"
                  } focus:outline-none transition-colors`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-mono font-medium text-slate-300 block">
                  Subject <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer Opportunity / Project Inquiry"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border ${
                    errors.subject ? "border-rose-500 focus:border-rose-500" : "border-slate-800 focus:border-purple-500"
                  } focus:outline-none transition-colors`}
                />
                {errors.subject && (
                  <p className="text-xs text-rose-400">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono font-medium text-slate-300 block">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border ${
                    errors.message ? "border-rose-500 focus:border-rose-500" : "border-slate-800 focus:border-purple-500"
                  } focus:outline-none transition-colors resize-y`}
                />
                {errors.message && (
                  <p className="text-xs text-rose-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-950/40 hover:shadow-cyan-950/30 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Compose Message in Email Client</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
