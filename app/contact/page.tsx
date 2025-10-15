"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    // basic email check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    // simple mailto fallback so no backend required
    const subject = encodeURIComponent(`AgriAid Feedback from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:fervixacom@gmail.com?subject=${subject}&body=${body}`;

    // open user's mail client
    window.location.href = mailto;

    // optimistic UI
    setTimeout(() => {
      setSubmitting(false);
      setSuccess("Your message is ready to send via your mail client. Thank you!");
      setName("");
      setEmail("");
      setMessage("");
    }, 600);
  };

  return (
    <section className="w-full  py-12 bg-gradient-to-b from-green-50 to-green-100">
      <div className="mt-36 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-10"
        >
          <header className="mb-6 text-center">
            <h2 className="text-3xl font-extrabold text-green-800">Contact Us</h2>
            <p className="mt-2 text-sm text-gray-600">
              Have feedback or a suggestion? Send us a message and we'll get back to you.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-700 mb-1">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg border border-green-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="Your name"
                  aria-label="Name"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-gray-700 mb-1">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border border-green-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="you@example.com"
                  aria-label="Email"
                  required
                />
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-sm text-gray-700 mb-1">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="rounded-lg border border-green-200 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Share your feedback or idea..."
                aria-label="Message"
                required
              />
            </label>

            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-green-700">{success}</div>}

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-60"
              >
                {submitting ? "Preparing..." : "Send Message"}
              </button>

              <a
                href="mailto:fervixacom@gmail.com"
                className="text-sm text-green-700 underline"
                aria-label="Email us directly"
              >
                Or email us directly
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              We respect your privacy — your info is used only to respond to your message.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};


export default Contact