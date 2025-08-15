import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import WaterCanvas from "./WaterCanvas.jsx";

const WaterInternal = ({ onFinish }) => {
    const ref = useRef(null);
    const bg = useRef(null);
    const backdropRef = useRef(null);
    const canvasWrapRef = useRef(null);
    const [canvasReady, setCanvasReady] = useState(false);

    useEffect(() => {
        if (!bg.current || !ref.current || !canvasReady) return;

        // Yazı giriş animasyonu
        gsap.set(ref.current, { opacity: 0, yPercent: -10 });
        gsap.to(ref.current, { opacity: 1, yPercent: 0, duration: 1.2, ease: "power2.out", delay: 0.6 });

        // Blob animasyonu + arka planı yumuşakça söndürme
        const tl = gsap.timeline();

        tl.set(bg.current, { opacity: 1 })
            .to(bg.current, { // önce genişlet
                width: bg.current.offsetHeight,
                duration: 0.9,
                ease: "power4.in",
                delay: 0.4
            })
            .to(bg.current, { // sonra tam yuvarla
                borderRadius: "2000px",
                duration: 0.8,
                ease: "power4.in"
            })
            .to(bg.current, { // en sonda yukarı taşı ve %60’a küçült
                scale: 0.6,
                top: "0%",
                y: "-50%",
                duration: 1,
                ease: "power2.inOut",
            })
            .add("settled")
            // KOYU ARKA PLAN + OVERLAY SU KANVASI FADE OUT (yumuşak geçiş)
            .to(backdropRef.current, { opacity: 0, duration: 0.8, ease: "power2.out" }, "settled+=0.1")
            .to(canvasWrapRef.current, { opacity: 0, duration: 0.8, ease: "power2.out" }, "<")
            // arka plan fade tamamlandıktan sonra click-through olması için:
            .set([backdropRef.current, canvasWrapRef.current], { pointerEvents: "none" });

        return () => tl.kill();
    }, [canvasReady]);

    return (
        <div className="fixed inset-0 z-[60] pointer-events-auto">
            {/* koyu arka plan (yumuşakça sönecek) */}
            <div ref={backdropRef} className="absolute inset-0 bg-[#050B1A] z-0" />

            {/* su efekti / canvas — altta, o da fade out olacak */}
            <div ref={canvasWrapRef} className="absolute inset-0 z-10 pointer-events-none">
                <WaterCanvas onLoad={() => setCanvasReady(true)} />
            </div>

            {/* animasyonlu blob + içerik — kalıcı */}
            <div
                ref={bg}
                className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   h-[80vmin] w-[80vmin] bg-white/10 backdrop-blur-md
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
