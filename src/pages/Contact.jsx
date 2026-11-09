import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  MapPin,
  Send,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { portfolioApi } from '../services/portfolioApi';
import {
  isValidUrl,
  isValidEmail,
  isValidPhone,
  isConfigured
} from '../data/portfolioData';

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

  const isRealEmail = isValidEmail(contact.email);
  const hasEmail = isConfigured(contact.email);

  const isRealPhone = isValidPhone(contact.phone);
  const hasPhone = isConfigured(contact.phone);

  const hasLocation = isConfigured(contact.location);

  const isRealGithub = isValidUrl(social.github);
  const hasGithub = isConfigured(social.github);

  const isRealLinkedin = isValidUrl(social.linkedin);
  const hasLinkedin = isConfigured(social.linkedin);

  const isRealInstagram = isValidUrl(social.instagram);
  const hasInstagram = isConfigured(social.instagram);

  const isRealTwitter = isValidUrl(social.twitter);
  const hasTwitter = isConfigured(social.twitter);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitState("validation_error");
      return;
    }

    // Try posting to Spring Boot backend message inbox first
    try {
      await portfolioApi.submitContactForm({
        name: formData.fullName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        phone: "",
        honeypot: ""
      });
      setSubmitState("sent");
      setFormData({ fullName: "", email: "", subject: "", message: "" });
      return;
    } catch {
      // Backend offline or not reachable; fallback to external endpoint if configured
      if (contact.endpointConfigured && isValidUrl(contact.formEndpoint)) {
        try {
          const response = await fetch(contact.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            setSubmitState("sent");
            setFormData({ fullName: "", email: "", subject: "", message: "" });
            return;
          }
        } catch {
          // fall through
        }
      }
      setSubmitState("validated_no_backend");
    }
  };

  const handleCopyPayload = () => {
    const text = `Name: ${formData.fullName}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\n${formData.message}`;
    try {
      navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedField("payload");
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleCopyText = (text, fieldKey) => {
    try {
      navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      {/* Heading */}
      <section className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <Mail className="w-3.5 h-3.5" />
          Contact Me
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {contact.heading || "Let's Connect & Build Something Great"}
        </h1>
        {contact.shortMessage && (
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {contact.shortMessage}
          </p>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact & Social Links */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-3xl p-6 border border-slate-800/90 space-y-5">
            <h2 className="text-lg font-bold text-white">
              Direct Contact Information
            </h2>
            <p className="text-xs text-slate-400">
              Configured dynamically in <code className="font-mono text-purple-300">src/data/contactData.js</code> and <code className="font-mono text-cyan-300">src/data/socialLinks.js</code>.
            </p>

            <div className="space-y-3">
              {/* EMAIL */}
              {hasEmail && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-2 text-slate-300 font-medium">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      Email Address
                    </span>
                    {isRealEmail && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(contact.email, "email")}
                        className="inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-white"
                      >
                        {copiedField === "email" ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  {isRealEmail ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors break-all"
                    >
                      {contact.email}
                    </a>
                  ) : (
                    <code className="text-xs font-mono text-cyan-300 break-all">
                      {contact.email}
                    </code>
                  )}
                </div>
              )}

              {/* PHONE (Automatically hidden if empty) */}
              {hasPhone && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-2 text-slate-300 font-medium">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      Phone Number
                    </span>
                    {isRealPhone && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(contact.phone, "phone")}
                        className="inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-white"
                      >
                        {copiedField === "phone" ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  {isRealPhone ? (
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  ) : (
                    <code className="text-xs font-mono text-cyan-300">
                      {contact.phone}
                    </code>
                  )}
                </div>
              )}

              {/* LOCATION */}
              {hasLocation && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-1.5">
                  <span className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    Location
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {contact.locationDisplay || contact.location}
                  </p>
                </div>
              )}

              {/* GITHUB */}
              {hasGithub && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <Github className="w-4 h-4 text-purple-400" />
                    GitHub Profile
                  </span>
                  {isRealGithub ? (
                    <a
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-cyan-300 hover:underline inline-flex items-center gap-1 break-all"
                    >
                      <span>{social.github}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <code className="text-xs font-mono text-cyan-300 break-all">
                      {social.github}
                    </code>
                  )}
                </div>
              )}

              {/* LINKEDIN */}
              {hasLinkedin && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    LinkedIn Profile
                  </span>
                  {isRealLinkedin ? (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-cyan-300 hover:underline inline-flex items-center gap-1 break-all"
                    >
                      <span>{social.linkedin}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <code className="text-xs font-mono text-cyan-300 break-all">
                      {social.linkedin}
                    </code>
                  )}
                </div>
              )}

              {/* INSTAGRAM (Optional - automatically hidden if empty) */}
              {hasInstagram && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    Instagram Profile
                  </span>
                  {isRealInstagram ? (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-cyan-300 hover:underline inline-flex items-center gap-1 break-all"
                    >
                      <span>{social.instagram}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <code className="text-xs font-mono text-cyan-300 break-all">
                      {social.instagram}
                    </code>
                  )}
                </div>
              )}

              {/* TWITTER / X (Optional - automatically hidden if empty) */}
              {hasTwitter && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <Twitter className="w-4 h-4 text-sky-400" />
                    Twitter / X Profile
                  </span>
                  {isRealTwitter ? (
                    <a
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-cyan-300 hover:underline inline-flex items-center gap-1 break-all"
                    >
                      <span>{social.twitter}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <code className="text-xs font-mono text-cyan-300 break-all">
                      {social.twitter}
                    </code>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/90 space-y-5"
            noValidate
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Send a Direct Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Fill out the form below. Client-side validation guarantees clean input formatting.
              </p>
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-slate-200">
                Your Full Name <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.fullName
                    ? "border-rose-500/80 focus:border-rose-400"
                    : "border-slate-800 focus:border-cyan-400"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-slate-200">
                Your Email Address <span className="text-purple-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.email
                    ? "border-rose-500/80 focus:border-rose-400"
                    : "border-slate-800 focus:border-cyan-400"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-slate-200">
                Subject <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Software Engineering Opportunity / Collaboration"
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.subject
                    ? "border-rose-500/80 focus:border-rose-400"
                    : "border-slate-800 focus:border-cyan-400"
                }`}
              />
              {errors.subject && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-slate-200">
                Message <span className="text-purple-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here (minimum 10 characters)..."
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-y ${
                  errors.message
                    ? "border-rose-500/80 focus:border-rose-400"
                    : "border-slate-800 focus:border-cyan-400"
                }`}
              />
              {errors.message && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/30 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Validate & Send Message</span>
            </button>

            {/* Validation Error Banner */}
            {submitState === "validation_error" && Object.keys(errors).length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Please fix the highlighted fields above before submitting.</span>
              </div>
            )}

            {/* Honest Validation Success Notice */}
            {submitState === "validated_no_backend" && (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p>Form Input Validated Successfully!</p>
                    <p className="text-xs font-normal text-slate-300 mt-1">
                      No external form submission endpoint is configured in{" "}
                      <code className="font-mono text-purple-300">src/data/contactData.js</code>. You can copy your formatted message below to send via email:
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyPayload}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700"
                  >
                    {copiedField === "payload" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Formatted Message!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Formatted Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {submitState === "sent" && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
