import React, {useEffect, useRef} from 'react';
import {gsap} from "gsap";
import {CustomEase} from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const Home = () => {
    const home = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            home.current,
            { y: -500, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );
        gsap.fromTo(
            home.current.querySelectorAll("h3, h2, p"),
            { y: 20, opacity: 0 },
            {
                delay: 0.5,
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
            }
        );
    }, []);

    return (
        <div
            ref={home}
            className="inter text-gray-200 bg-white/5 max-w-6xl mt-20 backdrop-blur-md py-20 px-10 rounded-lg
                 border border-white/20 shadow-lg shadow-blue-900/30"
        >
            <h3 className="text-base text-gray-400">Hello there,</h3>

            <h2 className="pointer text-5xl font-bold mt-2
                     bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300
                     bg-clip-text text-transparent">
                I'm Fatih Eker
            </h2>

            <h3 className="text-2xl font-semibold mt-1 text-cyan-300">
                FullStack Developer
            </h3>

            <p className="text-md mt-4 leading-relaxed text-gray-300">
                Backend-focused developer building{" "}
                <span className="text-cyan-300">secure, scalable REST APIs</span> with
                <span className="text-teal-300"> Java</span> &amp;{" "}
                <span className="text-teal-300">Spring Boot</span>. I work with{" "}
                <span className="text-cyan-300">Spring Security</span>,{" "}
                <span className="text-cyan-300">JWT</span>,{" "}
                <span className="text-sky-300">JPA/Hibernate</span>, and SQL to design
                clean and reliable backend systems. On the frontend, I use{" "}
                <span className="text-blue-300">React</span> +{" "}
                <span className="text-blue-300">TailwindCSS</span> for modern UIs.
                Occasionally, I explore <span className="text-cyan-300">Three.js</span>{" "}
                and shaders as a creative extra.
            </p>
        </div>
    );
};

export default Home;
