import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import WaterCanvas from "./WaterCanvas.jsx";

const WaterInternal = () => {
    const ref = useRef(null);
    const [canvasReady, setCanvasReady] = useState(false);
    const bg = useRef(null);
    useEffect(() => {
        if (!ref.current || !canvasReady) return;

        gsap.to(ref.current, {
            top: "50%", duration: 2, delay: 2, ease: "power1.inOut", position: "absolute", opacity: 1,
        });

        const tl = gsap.timeline();

        tl.to(bg.current, {
            width: bg.current.offsetHeight, duration: .9, ease: "power4.in", delay: 4
        })
            .to(bg.current, {
                borderRadius: "2000px", duration: .8, ease: "power4.in"
            })
            .to(bg.current, {
                scale: 0,
                duration: 1,
                ease: "power4.in",
            });
    }, [canvasReady]);
    return (
        <div ref={bg}
             className=" left-1/2 top-1/2 -translate-x-1/2 h-full w-full flex flex-col justify-center items-center overflow-hidden text*-center bg-[#050B1AFF] relative">
            <div ref={ref} className="ref text-5xl text-white absolute top-[60%]">
                Hello,<br/>
                Thank you for visiting
                <br/>my website!!. 😊😊
            </div>
            <WaterCanvas onLoad={() => setCanvasReady(true)}/>
        </div>
    )
}

export default WaterInternal;