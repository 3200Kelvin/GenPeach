export const isTouchscreen = window.matchMedia("(pointer: coarse)").matches;

export function getSetVariable(obj, value) {
    return gsap.quickTo(obj, value, { duration: 0.8, ease: "power2.out" });
}

export const getRaf = () => {
    let raf = null;

    return function moveRaf(cb) {
        if (raf) {
            cancelAnimationFrame(raf);
            raf = null;
        }

        raf = requestAnimationFrame(cb);
    }
};

export const getOnEnterPress = (callback) => {
    return (event) => {
        event.stopPropagation();
        if (event.key === 'Enter') {
            callback();
        }
    }
}
