"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Mail, MapPin, CheckCircle2, Sparkles, Send } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shootType: "Maternity & New Life Monograph",
    location: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/10 rounded-[4px] p-6 sm:p-10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#d1a85b]/60 bg-black p-0.5">
            <Image
              src="/images/logo.png"
              alt="Galleries by Nik"
              width={44}
              height={44}
              className="object-cover w-full h-full scale-125"
            />
          </div>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f7f5f0] font-medium leading-tight">
              Inquire & Book a Sitting
            </h3>
            <p className="text-[11px] font-mono text-[#d1a85b] tracking-widest uppercase mt-0.5">
              Galleries by Nik Studio
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 size={48} className="text-[#d1a85b] mb-4" />
            <h4 className="font-serif text-2xl text-white mb-2">
              Inquiry Received
            </h4>
            <p className="text-sm text-neutral-300 max-w-sm mb-6 font-light">
              Thank you for reaching out. Nik will personally review your vision
              and get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#f7f5f0] text-black text-xs font-mono uppercase tracking-widest font-semibold rounded-[2px] hover:bg-[#d1a85b] transition-colors cursor-pointer"
            >
              Return to Portfolio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-[#141414] border border-white/10 rounded-[2px] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d1a85b] transition-colors placeholder:text-neutral-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@example.com"
                  className="w-full bg-[#141414] border border-white/10 rounded-[2px] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d1a85b] transition-colors placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Sitting / Series Category
                </label>
                <select
                  value={formData.shootType}
                  onChange={(e) =>
                    setFormData({ ...formData, shootType: e.target.value })
                  }
                  className="w-full bg-[#141414] border border-white/10 rounded-[2px] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d1a85b] transition-colors cursor-pointer"
                >
                  <option value="Maternity & New Life Monograph">
                    Maternity & New Life Monograph
                  </option>
                  <option value="Milestones & Celebrations (Gender Reveal / Birthdays)">
                    Milestones & Celebrations (Gender Reveal / Birthdays)
                  </option>
                  <option value="Editorial & Studio Portrait Sitting">
                    Editorial & Studio Portrait Sitting
                  </option>
                  <option value="Panoramic Story Carousel Campaign">
                    Panoramic Story Carousel Campaign
                  </option>
                  <option value="Commercial & Brand Editorial">
                    Commercial & Brand Editorial
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Preferred Location / Date
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. Lisbon, Toronto, or On-Location"
                  className="w-full bg-[#141414] border border-white/10 rounded-[2px] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d1a85b] transition-colors placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Vision & Project Details
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Share your ideas, intended mood, wardrobe, or any questions..."
                className="w-full bg-[#141414] border border-white/10 rounded-[2px] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d1a85b] transition-colors placeholder:text-neutral-600 resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#d1a85b]" />
                  Available Worldwide
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-[#d1a85b]" />
                  Direct Studio
                </span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#f7f5f0] hover:bg-[#d1a85b] text-black text-xs font-mono uppercase tracking-[0.16em] font-semibold rounded-[2px] transition-all duration-300 cursor-pointer shadow-lg"
              >
                <Send size={13} />
                <span>Submit Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
