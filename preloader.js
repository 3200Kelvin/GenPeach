import { usePreloader } from "./src/preloader/script";

gsap.defaults({
    duration: 0,
    ease: 'power1.inOut',
});

usePreloader();