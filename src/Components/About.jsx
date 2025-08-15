import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {CustomEase} from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const About = () => {
    const about = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            about.current,
            { y: -500, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );
        gsap.fromTo(
            about.current.querySelectorAll("[data-stagger]"),
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.15 }
        );
    }, []);

    return (
        <section className="h-fit w-fit">
            <div
                ref={about}
                className="inter text-gray-200 bg-white/5 backdrop-blur-md rounded-2xl border border-white/15
                   shadow-xl shadow-blue-900/20 w-full max-w-6xl overflow-auto px-20 py-10"
            >
                <div className="grid md:grid-cols-2 gap-6 p-8 md:p-10">
                    {/* Sol sütun */}
                    <div className="space-y-3">
                        <h3 data-stagger className="text-sm text-gray-400">About Me</h3>

                        <h1
                            data-stagger
                            className="font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300
                         bg-clip-text text-transparent text-4xl leading-tight"
                        >
                            I’m Fatih Eker
                        </h1>

                        <h2 data-stagger className="text-lg font-semibold text-cyan-300">
                            Full Stack Developer (Java & Spring Boot)
                        </h2>

                        <p data-stagger className="text-sm leading-snug text-gray-300">
                            I am a backend-focused Full Stack Developer with strong expertise in{" "}
                            <span className="text-teal-300">Java</span> and{" "}
                            <span className="text-teal-300">Spring Boot</span>. My primary focus is building secure, scalable{" "}
                            <span className="text-cyan-300">REST APIs</span> with{" "}
                            <span className="text-cyan-300">Spring Security</span> and{" "}
                            <span className="text-cyan-300">JWT authentication</span>.
                            I have solid experience with{" "}
                            <span className="text-sky-300">JPA/Hibernate</span>, relational databases like{" "}
                            <span className="text-sky-300">PostgreSQL</span> and{" "}
                            <span className="text-sky-300">MSSQL</span>, and applying clean architecture principles.
                        </p>

                        <p data-stagger className="text-sm leading-snug text-gray-300">
                            On the frontend, I work with{" "}
                            <span className="text-blue-300">React</span> and{" "}
                            <span className="text-blue-300">TailwindCSS</span> to create responsive and modern UIs. I enjoy
                            integrating the backend with efficient frontend architectures, ensuring smooth data flow through state
                            management tools like{" "}
                            <span className="text-sky-300">Redux</span> and{" "}
                            <span className="text-sky-300">React Query</span>.
                        </p>

                        <p data-stagger className="text-sm leading-snug text-gray-300">
                            While my main focus is backend development, I occasionally explore{" "}
                            <span className="text-cyan-300">Three.js</span> and{" "}
                            <span className="text-cyan-300">shader programming</span> as creative experiments. This helps me blend
                            logic and visuals when needed.
                        </p>

                        <p data-stagger className="text-sm leading-snug text-gray-300">
                            🚀 My approach: write clean, maintainable, and secure code; optimize performance; and continuously learn
                            to keep up with evolving technologies.
                        </p>
                    </div>

                    {/* Sağ sütun: Skills */}
                    <div className="space-y-3">
                        <h3 data-stagger className="text-base font-semibold text-cyan-300">Skills</h3>

                        <ul data-stagger className="flex flex-wrap gap-x-3 gap-y-2">
                            {[
                                // Backend core
                                "Java", "Spring Boot", "REST API", "Spring Security", "JWT",
                                "JPA", "Hibernate", "SQL", "PostgreSQL", "MSSQL",
                                "Docker (temel)", "JUnit",
                                // .NET background
                                "C#", ".NET Core", "Entity Framework", "LINQ", "Dapper",
                                // Frontend
                                "JavaScript (ES6+)", "TypeScript", "React", "Redux", "Hooks", "React Query",
                                "Axios", "Vite", "TailwindCSS", "Responsive Web Design",
                                // Tools
                                "Postman", "Git/GitHub", "Figma",
                                // Creative extras
                                "Three.js (basic)", "GLSL/Shaders (intro)",
                            ].map((s) => (
                                <li
                                    key={s}
                                    className="h-9 px-4 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm
                             flex items-center text-xs text-gray-200"
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
