import { useHeroCursor } from "./src/cursor/script";
import { useSmoke } from "./src/smoke/script";
import { useUnblur } from "./src/unblur/script";
import { useExpandables } from "./src/expandables/script";
import { useSolutionsSlider } from "./src/solutions/script";

gsap.defaults({
    duration: 0,
    ease: 'power1.inOut',
});

useHeroCursor();
useUnblur();
useSmoke();
useExpandables();
useSolutionsSlider();