import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Projects = () => {
    const root = useRef(null);

    useEffect(() => {
        gsap.fromTo(root.current, { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
        gsap.fromTo(
            root.current.querySelectorAll("[data-stagger]"),
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.15 }
        );
    }, []);

    return (
        <section className="w-fit">
            <div
                ref={root}
                className="inter isolate relative text-gray-100 bg-white/5 backdrop-blur-md rounded-2xl border border-white/15 shadow-xl shadow-blue-900/20
                   w-full max-w-6xl p-6 md:p-10"
            >
                {/* Header */}
                <header className="mb-6 relative">
                    <h1
                        data-stagger
                        className="text-4xl md:text-5xl font-extrabold leading-tight
                       bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent"
                    >
                        Projects
                    </h1>
                    <p data-stagger className="text-base md:text-lg text-cyan-300/90 font-semibold">
                        Selected works highlighting secure backends and clean, responsive UIs.
                    </p>
                </header>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* Left column */}
                    <div className="space-y-8 relative">
                        {/* Project 1 */}
                        <section data-stagger className="relative">
                            <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Pizza Ordering App</h3>
                            <p className="text-sm text-gray-300">
                                <span className="text-blue-300">React</span> tabanlı sipariş uygulaması. Kütüphane kullanmadan
                                geliştirilen <span className="text-cyan-300">özel router</span>, <span className="text-cyan-300">form doğrulama</span>,
                                sahte <span className="text-cyan-300">API</span> akışı ve <span className="text-cyan-300">Cypress E2E</span> testleriyle uçtan uca akış kuruldu.
                                Durum yönetimi minimal tutuldu; bileşen kompozisyonu okunabilirlik odaklı tasarlandı.
                            </p>
                            <div className="flex gap-3 mt-2">
                                <a
                                    href="https://github.com/ekerfatih/Sprint-8-Pizza-Projesi"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="relative z-10 pointer-events-auto cursor-pointer text-blue-300 hover:text-white underline underline-offset-4 decoration-blue-400/40 hover:decoration-blue-300 transition"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="https://sprint-8-pizza-projesi.vercel.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="relative z-10 pointer-events-auto cursor-pointer text-blue-300 hover:text-white underline underline-offset-4 decoration-blue-400/40 hover:decoration-blue-300 transition"
                                >
                                    Live Demo
                                </a>
                            </div>
                        </section>

                        {/* Project 2 */}
                        <section data-stagger className="relative">
                            <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Real Estate Management</h3>
                            <p className="text-sm text-gray-300">
                                <span className="text-teal-300">ASP.NET Core 8 Web API</span> ve <span className="text-teal-300">MVC</span> katmanlı mimari.
                                <span className="text-teal-300"> Dapper</span> ile hızlı veri erişimi, <span className="text-cyan-300">JWT</span> ve
                                <span className="text-cyan-300"> role-based authorization</span> ile güvenli kimlik doğrulama.
                                Gerçek zamanlı bildirimler için <span className="text-blue-300">SignalR</span> entegrasyonu.
                            </p>
                            <div className="flex gap-3 mt-2">
                                <a
                                    href="https://github.com/ekerfatih/Real_Estate_Dapper_Api"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="relative z-10 pointer-events-auto cursor-pointer text-blue-300 hover:text-white underline underline-offset-4 decoration-blue-400/40 hover:decoration-blue-300 transition"
                                >
                                    GitHub
                                </a>
                            </div>
                        </section>
                    </div>

                    {/* Right column */}
                    <div className="space-y-8 relative">
                        {/* Project 3 */}
                        <section data-stagger className="relative">
                            <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Mini CRM</h3>
                            <p className="text-sm text-gray-300">
                                <span className="text-teal-300">ASP.NET Core 8 MVC</span>, <span className="text-teal-300">Entity Framework</span> ve
                                <span className="text-cyan-300"> Identity</span> ile stok ve müşteri yönetimi.
                                <span className="text-cyan-300"> CRUD</span> akışları, doğrulama ve yetkilendirme süreçleri; sade ve hızlı bir yönetim paneli.
                            </p>
                            <div className="flex gap-3 mt-2">
                                <a
                                    href="https://github.com/ekerfatih/PortfolioProjects"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="relative z-10 pointer-events-auto cursor-pointer text-blue-300 hover:text-white underline underline-offset-4 decoration-blue-400/40 hover:decoration-blue-300 transition"
                                >
                                    GitHub
                                </a>
                            </div>
                        </section>

                        {/* Project 4 */}
                        <section data-stagger className="relative">
                            <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Portfolio Website</h3>
                            <p className="text-sm text-gray-300">
                                <span className="text-blue-300">React</span> ve <span className="text-blue-300">TailwindCSS</span> ile modüler bileşen yapısı.
                                Animasyonlar <span className="text-cyan-300">GSAP</span> ile; duyarlı grid ve hafif yükleme stratejileriyle hızlı ilk boyama ve akıcı gezinme.
                            </p>
                            <div className="flex gap-3 mt-2">
                                <a
                                    href="https://github.com/ekerfatih/FSWeb-Frontend-Challenge"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="relative z-10 pointer-events-auto cursor-pointer text-blue-300 hover:text-white underline underline-offset-4 decoration-blue-400/40 hover:decoration-blue-300 transition"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="https://personal-website-nu-sandy.vercel.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="relative z-10 pointer-events-auto cursor-pointer text-blue-300 hover:text-white underline underline-offset-4 decoration-blue-400/40 hover:decoration-blue-300 transition"
                                >
                                    Live Demo
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
