import './App.css';
import WaveDots from "./3DComponents/WaveDots.jsx";
import {Canvas} from "@react-three/fiber";
import DraggableCube from "./3DComponents/DraggableCube.jsx";
import Home from "./Components/Home.jsx";
import About from "./Components/About.jsx";
import Resume from "./Components/Resume.jsx";
import Projects from "./Components/Projects.jsx";
import Contact from "./Components/Contact.jsx"; // ← eklendi
import React, {useLayoutEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {CustomEase} from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

function App() {
    const [active, setActive] = useState("Home");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const rootRef = useRef(null);
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const tl = gsap.fromTo(
            el,
            {opacity: 0, y: 30},
            {
                opacity: 1, y: 0, duration: 1.2, ease: "power1.out",
                onComplete: () => {
                    if (rootRef.current) gsap.set(rootRef.current, {overflow: "auto"});
                }
            }
        );
        return () => tl.kill();
    }, [active]);

    const switchSection = (next) => {
        if (next === active || isTransitioning) return;
        const el = contentRef.current;

        setIsTransitioning(true);
        if (!el) {
            setActive(next);
            setIsTransitioning(false);
            return;
        }

        if (rootRef.current) gsap.set(rootRef.current, {overflow: "hidden"});

        gsap.to(el, {
            opacity: 0, y: 500, duration: 0.8,
            ease: CustomEase.create("custom", "M0,0 C0,0 0.133,0.129 0.215,0.448 0.27,0.579 0.277,1.161 0.29,1.162 0.297,1.162 0.44,1.008 0.601,0.989 0.809,0.976 1,1 1,1 "),
            onComplete: () => {
                setActive(next);
                setTimeout(() => setIsTransitioning(false), 50);
            },
        });
    };

    const renderActive = () => {
        switch (active) {
            case "Home":
                return <Home/>;
            case "About":
                return <About/>;
            case "Resume":
                return <Resume/>;
            case "Projects":
                return <Projects/>;
            case "Contact":
                return <Contact/>;
            default:
                return <About/>;
        }
    };

    return (
        <div ref={rootRef}
             className="relative min-h-screen w-full bg-gradient-to-b from-stone-900 to-black overflow-auto">
            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0 h-full pointer-events-auto">
                <Canvas
                    camera={{position: [0, 0.6, 10], fov: 50, near: 0.1, far: 550, rotation: [0.25, 0, 0]}}
                    style={{background: "transparent"}}
                >
                    <WaveDots/>
                    <DraggableCube height={3}/>
                </Canvas>
            </div>

            {/* NAV */}
            <div className="flex justify-between absolute right-[5%] top-[5%] z-50 pointer-events-auto">
                <div className="text-white text-2xl"></div>
                <nav className="flex items-center text-gray-400 text-2xl gap-8">
                    {["Home", "About", "Resume", "Projects", "Contact"].map(label => ( // ← Contact menüde
                        <button
                            key={label}
                            type="button"
                            onClick={() => switchSection(label)}
                            disabled={isTransitioning}
                            className={`group relative transition ${
                                active === label ? "text-white" : "hover:text-gray-200"
                            } ${isTransitioning ? "opacity-80 cursor-wait" : ""}`}
                        >
                            {label}
                            <span
                                className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] bg-white/70 transition-all duration-300 ${
                                    active === label ? "w-full" : "w-0 group-hover:w-full"
                                }`}
                            />
                        </button>
                    ))}
                </nav>
            </div>

            {/* CONTENT: dikey ortalı, sola yakın */}
            <div className="relative z-10 w-[70%]">
                <section
                    className="min-h-screen flex items-center justify-start pl-20 pr-8 pb-16 relative pointer-events-none overflow-hidden">
                    <div ref={contentRef} className={"w-full"}>
                        {renderActive()}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default App;
