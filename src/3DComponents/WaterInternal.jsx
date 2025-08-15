import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import WaterCanvas from "./WaterCanvas.jsx";

const WaterInternal = ({ onFinish }) => {
    const ref = useRef(null);
    const bg = useRef(null);
    const backdropRef = useRef(null);
    const canvasWrapRef = useRef(null);

    const [canvasReady, setCanvasReady] = useState(false);

    // Ripple ve Drop’u ayrı ayrı kontrol ediyoruz
    const [rippleActive, setRippleActive] = useState(true);
    const [dropActive, setDropActive] = useState(true);

    useEffect(() => {
        if (!bg.current || !ref.current || !canvasReady) return;

        // Yazı giriş animasyonu
        gsap.set(ref.current, { opacity: 0, yPercent: -10 });
        gsap.to(ref.current, { opacity: 1, yPercent: 0, duration: 1.2, ease: "power2.out", delay: 0.6 });

        const tl = gsap.timeline({
            onComplete: () => {
                onFinish?.();
            }
        });

        tl.set(bg.current, { opacity: 1 })
            .to(bg.current, {
                width: bg.current.offsetHeight,
                duration: 0.9,
                ease: "power4.in",
                delay: 0.4
            })
            .to(bg.current, {
                borderRadius: "2000px",
                duration: 0.8,
                ease: "power4.in"
            })
            .to(bg.current, {
                scale: 0.6,
                top: "0%",
                y: "-50%",
                duration: 1,
                ease: "power2.inOut",
            })
            .add("settled")

            // Ripple’ı hemen kapat
            .add(() => { setRippleActive(false); }, "settled")

            // Drop’u fade bitene kadar tut, sonra kapat
            .add(() => { setDropActive(false); }, "settled+=0.8")

            // Fade-out
            .to(backdropRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    gsap.set(backdropRef.current, { display: "none" });
                }
            }, "settled+=0.05")
            .to(canvasWrapRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    gsap.set(canvasWrapRef.current, { display: "none" });
                }
            }, "<")
            .set([backdropRef.current, canvasWrapRef.current], { pointerEvents: "none" });

        return () => tl.kill();
    }, [canvasReady, onFinish]);

    return (
        <div className="fixed inset-0 z-[60] pointer-events-auto">
            <div ref={backdropRef} className="absolute inset-0 bg-[#050B1A] z-0" />
            <div ref={canvasWrapRef} className="absolute inset-0 z-10 pointer-events-none">
                <WaterCanvas
                    rippleActive={rippleActive}
                    dropActive={dropActive}
                    onLoad={() => setCanvasReady(true)}
                />
            </div>
            <div
                ref={bg}
                className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   h-[80vmin] w-[80vmin] bg-white/2 backdrop-blur-md
                   border border-white/20 rounded-[48px] overflow-hidden
                   flex items-center justify-center shadow-lg shadow-black/40"
                style={{ transformOrigin: "center center" }}
            >
                <div ref={ref} className="text-center px-6">
                    <div className="text-4xl md:text-5xl font-extrabold
                          bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300
                          bg-clip-text text-transparent">
                        Hello,
                    </div>
                    <div className="mt-2 text-gray-100/90 text-xl md:text-2xl">
                        Thank you for visiting my website! <span className="align-middle">😊</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaterInternal;
