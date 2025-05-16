import { useMenu } from "./src/menu/script";
import { useHeroCursor } from "./src/cursor/script";
import { useSmoke } from "./src/smoke/script";
import { useUnblur } from "./src/unblur/script";
import { useExpandables } from "./src/expandables/script";
import { useSolutions } from "./src/solutions/script";
import { useAccordeon } from "./src/accordeon/script";
import { useVopyValue } from "./src/copyValue/script";

gsap.defaults({
    duration: 0,
    ease: 'power1.inOut',
});

useMenu();
useHeroCursor();
useUnblur();
useSmoke();
useExpandables();
useSolutions();
useAccordeon();
useVopyValue();