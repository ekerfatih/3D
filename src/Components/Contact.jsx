import React, {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
    const root = useRef(null);
    const formRef = useRef(null);
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null); // "ok" | "err" | null

    useEffect(() => {
        gsap.fromTo(root.current, {y: -500, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, ease: "power2.out"});
        gsap.fromTo(
            root.current.querySelectorAll("[data-stagger]"),
            {y: 10, opacity: 0},
            {y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.15}
        );
    }, []);

    const validate = (fd) => {
        const name = fd.get("name")?.toString().trim();         // {{name}}
        const email = fd.get("email")?.toString().trim();       // {{email}} (şablonda göstermek istersen)
        const title = fd.get("title")?.toString().trim();       // {{title}}
        const message = fd.get("message")?.toString().trim();   // {{message}}
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
        return !!(name && emailOk && title && message && message.length >= 10);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        // {{time}} için gizli inputu dinamik doldur
        const now = new Date().toLocaleString();
        const timeInput = formRef.current.elements.namedItem("time");
        if (timeInput) timeInput.value = now; // {{time}}

        const fd = new FormData(formRef.current);
        if (!validate(fd)) {
            setStatus("err");
            return;
        }

        setSending(true);
        try {
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {publicKey: PUBLIC_KEY});
            setStatus("ok");
            formRef.current.reset();
        } catch {
            setStatus("err");
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="w-full">
            <div
                ref={root}
                className="inter isolate relative text-gray-100 bg-white/5 backdrop-blur-md rounded-2xl border border-white/15
                   shadow-xl shadow-blue-900/20 w-full max-w-6xl mx-auto p-6 md:p-10 pointer-events-auto"
            >
                {/* Header */}
                <header className="mb-6 relative">
                    <h1
                        data-stagger
                        className="text-4xl md:text-5xl font-extrabold leading-tight
                       bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300
                       bg-clip-text text-transparent"
                    >
                        Contact
                    </h1>
                    <p data-stagger className="text-base md:text-lg text-blue-200/90 font-semibold">
                        Feel free to reach out — I’ll get back to you as soon as possible.
                    </p>
                </header>

                {/* Form (EmailJS şablon alanlarıyla uyumlu) */}
                <form
                    ref={formRef}
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full"
                    data-stagger
                >
                    {/* Name ({{name}}) */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm text-blue-200">Name</label>
                        <input
                            id="name"
                            name="name"            // <-- EmailJS {{name}}
                            type="text"
                            required
                            placeholder="Your name"
                            className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/15 text-gray-100 placeholder:text-gray-400
                         focus:outline-none focus:border-cyan-300/70"
                        />
                    </div>

                    {/* Email ({{email}} opsiyonel gösterim için) */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm text-blue-200">Email</label>
                        <input
                            id="email"
                            name="email"           // <-- EmailJS {{email}} (şablonda kullanmak istersen ekle)
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/15 text-gray-100 placeholder:text-gray-400
                         focus:outline-none focus:border-cyan-300/70"
                        />
                    </div>

                    {/* Subject ({{title}}) */}
                    <div className="space-y-2 md:col-span-2">
                        <label htmlFor="title" className="text-sm text-blue-200">Subject</label>
                        <input
                            id="title"
                            name="title"           // <-- EmailJS {{title}}
                            type="text"
                            required
                            placeholder="What’s this about?"
                            className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/15 text-gray-100 placeholder:text-gray-400
                         focus:outline-none focus:border-cyan-300/70"
                        />
                    </div>

                    {/* Message ({{message}}) */}
                    <div className="space-y-2 md:col-span-2">
                        <label htmlFor="message" className="text-sm text-blue-200">Message</label>
                        <textarea
                            id="message"
                            name="message"         // <-- EmailJS {{message}}
                            required
                            minLength={10}
                            rows={6}
                            placeholder="Type your message here..."
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-gray-100 placeholder:text-gray-400
                         focus:outline-none focus:border-cyan-300/70 resize-none"
                        />
                    </div>

                    {/* Hidden {{time}} */}
                    <input type="hidden" name="time" defaultValue=""/>

                    {/* Actions */}
                    <div className="md:col-span-2 flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={sending}
                            className={`h-11 px-6 rounded-lg font-semibold shadow-md transition
                          bg-gradient-to-r from-blue-900/90 via-blue-600/90 to-cyan-400/90
                          hover:from-blue-900 hover:via-blue-600 hover:to-cyan-400
                          ${sending ? "opacity-70 cursor-wait" : "cursor-pointer"}`}
                        >
                            {sending ? "Sending..." : "Send Message"}
                        </button>

                        {status === "ok" &&
                            <span className="text-sm text-emerald-300">Message sent successfully!</span>}
                        {status === "err" &&
                            <span className="text-sm text-rose-300">Please check the fields or try again.</span>}
                    </div>
                </form>

                {/* Direct email */}
                <div className="mt-8 text-sm text-gray-400" data-stagger>
                    You can also email me directly at{" "}
                    <a
                        href="mailto:fatiheker97@gmail.com"
                        className="pointer-events-auto underline underline-offset-4 decoration-white/30 hover:decoration-white hover:text-white"
                    >
                        fatiheker97@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
