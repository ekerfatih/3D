import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {CustomEase} from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

// 👉 Profiller
const GITHUB_URL   = "https://github.com/ekerfatih";
const LINKEDIN_URL = "https://www.linkedin.com/in/fatih-eker"; // gerekiyorsa güncelle

const Resume = () => {
    const root = useRef(null);

    useEffect(() => {
        gsap.fromTo(root.current, {y: -500, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, ease: "power2.out"});
        gsap.fromTo(
            root.current.querySelectorAll("[data-stagger]"),
            {y: 10, opacity: 0},
            {y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.15}
        );
    }, []);

    return (
        <section className="w-fit">
            <div
                ref={root}
                className="inter isolate relative text-gray-100 bg-white/5 backdrop-blur-md rounded-2xl
                   border border-white/15 shadow-xl shadow-blue-900/20 w-full max-w-6xl p-6 md:p-10"
            >
                {/* Header */}
                <header className="mb-6">
                    <h1
                        data-stagger
                        className="text-4xl md:text-5xl font-extrabold leading-tight
                       bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300
                       bg-clip-text text-transparent"
                    >
                        Fatih Eker
                    </h1>
                    <p data-stagger className="text-base md:text-lg text-cyan-300/90 font-semibold">
                        Full Stack Developer
                    </p>
                </header>

                {/* GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 1x1 — Personal Info */}
                    <section data-stagger className="space-y-3">
                        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-300/80
                            bg-white/5 border border-white/10 rounded-full px-3 py-1">
                            <span>Personal Info</span>
                        </div>
                        <ul className="text-sm md:text-[15px] space-y-2">
                            <li>
                                <span className="text-gray-400">Address</span> · Üsküdar, İstanbul
                            </li>
                            <li>
                                <span className="text-gray-400">Email</span> ·{" "}
                                <a
                                    href="mailto:fatiheker97@gmail.com"
                                    className="relative z-10 pointer-events-auto cursor-pointer underline underline-offset-4
                             decoration-white/30 hover:decoration-white hover:text-white transition"
                                >
                                    fatiheker97@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <a
                                    href={GITHUB_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="relative z-10 pointer-events-auto cursor-pointer text-blue-300 hover:text-white
                             underline underline-offset-4 decoration-blue-400/40 hover:decoration-blue-300 transition"
                                >
                                    GitHub
                                </a>
                                <span className="text-gray-500">|</span>
                                <a
                                    href={LINKEDIN_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="relative z-10 pointer-events-auto cursor-pointer text-cyan-300 hover:text-white
                             underline underline-offset-4 decoration-cyan-400/40 hover:decoration-cyan-300 transition"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </section>

                    {/* 2x1 — Summary */}
                    <section data-stagger className="space-y-3">
                        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-300/80
                            bg-white/5 border border-white/10 rounded-full px-3 py-1">
                            <span>Summary</span>
                        </div>
                        <p className="text-sm md:text-[15px] leading-relaxed text-gray-200/90">
                            Backend-oriented Full Stack Developer with a mechanical engineering background. Strong in{" "}
                            <span className="text-teal-300">Java</span>,{" "}
                            <span className="text-teal-300">Spring Boot</span>,{" "}
                            <span className="text-cyan-300">REST API</span>,{" "}
                            <span className="text-cyan-300">Spring Security</span>,{" "}
                            <span className="text-cyan-300">JWT</span>, and{" "}
                            <span className="text-sky-300">JPA/Hibernate</span> with relational databases
                            (<span className="text-sky-300">PostgreSQL</span>, <span className="text-sky-300">MSSQL</span>).
                            Builds clean, secure, and scalable services; delivers modern UIs with{" "}
                            <span className="text-blue-300">React</span> &{" "}
                            <span className="text-blue-300">TailwindCSS</span>; automation and efficiency focused.
                        </p>
                    </section>

                    {/* Left bottom: Education + Languages + Certificates */}
                    <div className="space-y-8">
                        {/* Education */}
                        <section data-stagger>
                            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-300/80
                              bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-3">
                                <span>Education</span>
                            </div>
                            <div className="space-y-4 text-sm md:text-[15px]">
                                <div>
                                    <div className="font-medium text-gray-100">Workintech — Full Stack Development Program</div>
                                    <div className="text-gray-300/90">6 months · 960 hours · 78 projects</div>
                                    <div className="text-gray-400/90">2023 – 2024</div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-100">Sakarya University — Mechanical Engineering</div>
                                    <div className="text-gray-400/90">2017 – 2021</div>
                                </div>
                            </div>
                        </section>

                        {/* Languages */}
                        <section data-stagger>
                            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-300/80
                              bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-3">
                                <span>Languages</span>
                            </div>
                            <p className="text-sm md:text-[15px]">
                                <span className="text-cyan-300">English</span> — Advanced
                            </p>
                        </section>

                        {/* Certificates */}
                        <section data-stagger>
                            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-300/80
                              bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-3">
                                <span>Certificates</span>
                            </div>
                            <ul className="text-sm md:text-[15px] space-y-2">
                                <li><span className="text-teal-300">Back End Development</span> — Workintech — 10.2025</li>
                                <li><span className="text-blue-300">Front End Development</span> — Workintech — 06.2025</li>
                                <li><span className="text-sky-300">Game Development</span> — Uskudar University — 06.2022</li>
                            </ul>
                        </section>
                    </div>

                    {/* Right bottom — Experience */}
                    <section data-stagger className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-300/80
                            bg-white/5 border border-white/10 rounded-full px-3 py-1">
                            <span>Experience</span>
                        </div>

                        <div className="space-y-5 text-sm md:text-[15px]">
                            <div>
                                <div className="font-medium text-gray-100">Freelance — Full Stack Developer</div>
                                <div className="text-gray-400/90">2025 – Present · Remote</div>
                                <ul className="list-disc list-inside text-gray-200/90 mt-1 space-y-1">
                                    <li>Secure API design and backend-integrated modern web apps.</li>
                                    <li>Automation & efficiency-focused solutions for real-world problems.</li>
                                </ul>
                            </div>

                            <div>
                                <div className="font-medium text-gray-100">Aksoy Makine — Sales Engineer</div>
                                <div className="text-gray-400/90">2024 · İstanbul</div>
                                <ul className="list-disc list-inside text-gray-200/90 mt-1 space-y-1">
                                    <li>Process automation with Excel VBA & Google Apps Script.</li>
                                </ul>
                            </div>

                            <div>
                                <div className="font-medium text-gray-100">Solmaz Metal — Mechanical Engineer</div>
                                <div className="text-gray-400/90">2023 · İstanbul</div>
                                <ul className="list-disc list-inside text-gray-200/90 mt-1 space-y-1">
                                    <li>Excel-based inventory and packing-list workflows.</li>
                                </ul>
                            </div>

                            <div>
                                <div className="font-medium text-gray-100">Arctec Games — Game Developer</div>
                                <div className="text-gray-400/90">2022 – 2023 · İstanbul</div>
                                <ul className="list-disc list-inside text-gray-200/90 mt-1 space-y-1">
                                    <li>Hyper-casual mobile games with C# & Unity.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default Resume;
