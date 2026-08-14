"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck, User, MessageSquare, AlertCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    branch: "Anchampeedika Main Branch",
    service: "Savings Deposit / General Inquiry",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-fade-in", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-container",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to send your inquiry.");
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: "",
          phone: "",
          branch: "Anchampeedika Main Branch",
          service: "Savings Deposit / General Inquiry",
          message: "",
        });
      }, 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to send your inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            {/* <Mail className="w-3.5 h-3.5 text-emerald-600" /> */}
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch with MKSC Bank
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Have questions about account opening, loan interest rates, or deposit schemes? Reach out to our Secretary or Head Office administration.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="contact-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">

          {/* Col 1: Contact Info (Col 1-5) */}
          <div className="lg:col-span-5">

            {/* Info Cards */}
            <div className="contact-fade-in h-full bg-white p-8 md:p-9 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col justify-center">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-7">Head Office Contact</h3>

              <div className="divide-y divide-slate-100 text-sm text-slate-700">
                <div className="flex items-start gap-4 pb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="font-bold text-slate-900">Head Office Address</div>
                    <div className="text-slate-600 leading-relaxed">Morazha Kalliasseri Service Co-op Bank Ltd. No. 1452</div>
                    <div className="text-slate-500 text-xs">Anchampeedika P.O., Morazha, Kannur - 670301</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="font-bold text-slate-900">Secretary & Phone Direct</div>
                    <div className="text-slate-600 leading-relaxed">
                      <a href="tel:04972780062" className="hover:text-emerald-700 hover:underline transition-colors">0497 2780062</a>
                      {/* {" / "} */}
                      {/* <a href="tel:+914972780520" className="hover:text-emerald-700 hover:underline transition-colors">+91 497 2780520</a> */}
                    </div>
                    <div className="text-slate-500 text-xs">
                      Secretary Direct: <a href="tel:04972781269" className="hover:text-emerald-700 hover:underline transition-colors">0497 2781269</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="font-bold text-slate-900">Official Email</div>
                    <div className="leading-relaxed">
                      <a href="mailto:mkscbankltd@gmail.com" className="text-slate-600 font-medium hover:text-emerald-700 hover:underline transition-colors">mkscbankltd@gmail.com</a>
                    </div>
                    <div className="text-slate-500 text-xs">General correspondence & audit inquiries</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Col 2: Interactive Contact Form (Col 6-12) */}
          <div className="lg:col-span-7 contact-fade-in bg-white p-8 md:p-10 rounded-3xl border border-slate-200/90 shadow-soft">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Send an Official Inquiry</h3>
            <p className="text-sm text-slate-600 mb-8">
              Fill out the form below and our member relation desk will get back to you within 24 business hours.
            </p>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-xl font-extrabold text-slate-900">Inquiry Received Successfully!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.name || "Member"}</strong>. Our Secretary desk has logged your request regarding {formData.service}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all outline-none text-sm text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all outline-none text-sm text-slate-900 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Preferred Branch</label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all outline-none text-sm text-slate-900 font-medium"
                    >
                      <option>Anchampeedika Main Branch</option>
                      <option>Mangattuparamba Branch</option>
                      <option>Mangad Branch</option>
                      <option>Vellikkeel Branch</option>
                      <option>Kolathuvayal Branch</option>
                      <option>Parassinikkadavu Branch</option>
                      <option>Dharmasala Evening Branch</option>
                      <option>Paliyathvavalappu Branch</option>
                      <option>Ayyankol Branch</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Service Category</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all outline-none text-sm text-slate-900 font-medium"
                    >
                      <option>Savings Deposit / General Inquiry</option>
                      <option>Fixed / Recurring Deposit</option>
                      <option>Housing / Property Loan</option>
                      <option>Personal / Security Loan</option>
                      <option>Kudumbasree Micro Loan</option>
                      <option>RTGS / NEFT / Digital Banking</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Message / Requirements</label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                    <textarea
                      rows={4}
                      placeholder="Please describe your inquiry or required deposit/loan amount..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all outline-none text-sm text-slate-900 font-medium"
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="pt-2">
                  <MagneticButton
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full justify-center"
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5 text-white" />
                    <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                  </MagneticButton>
                </div>
              </form>
            )}

          </div>

        </div>

        {/* Google Map - full width of the container */}
        <div className="contact-fade-in mt-10 lg:mt-12 relative w-full h-80 md:h-[26rem] rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft bg-slate-100">
          <iframe
            title="MKSC Bank Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15610.123456789!2d75.367890123!3d11.987654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba43e1234567890%3A0x1234567890abcdef!2sAnchampeedika%2C%20Kerala!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            className="w-full h-full border-0 filter opacity-90 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
