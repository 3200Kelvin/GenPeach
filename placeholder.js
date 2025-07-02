import { useMenu } from "./src/menu/script";
import { useHeroCursor } from "./src/cursor/script";
import { useSmoke } from "./src/smoke/script";
import { useUnblur } from "./src/unblur/script";
import { useVopyValue } from "./src/copyValue/script";
import { useForm } from "./src/form/script";
import { usePreloader } from "./src/preloader/script";

import './src/style.scss';

gsap.defaults({
    duration: 0,
    ease: 'power1.inOut',
});

useMenu();
useHeroCursor();
useUnblur();
useSmoke({ trigger: window, xProperty: 'clientX', yProperty: 'clientY', splatRadius: 0.5 });
useForm();
useVopyValue();
usePreloader(true);