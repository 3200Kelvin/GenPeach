import { PRELOADER_PROGRESS_AMOUNT } from "./src/preloader/script";
import { useMenu } from "./src/menu/script";
import { useHeroCursor } from "./src/cursor/script";
import { useSmoke } from "./src/smoke/script";
import { useUnblur } from "./src/unblur/script";
import { useExpandables } from "./src/expandables/script";
import { useSolutions } from "./src/solutions/script";
import { useAccordeon } from "./src/accordeon/script";
import { useVopyValue } from "./src/copyValue/script";
import { useForm } from "./src/form/script";

import './src/style.scss';

useMenu();
useHeroCursor();
useUnblur();
useSmoke();
useExpandables();
useSolutions();
useAccordeon();
useForm();
useVopyValue();

window.setPreloaderState(PRELOADER_PROGRESS_AMOUNT.SCRIPTS);
