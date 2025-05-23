import { COLORS } from "../../common/constants";

export const useFormFill = (form) => {
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach((input) => {
        const wrapper = input.closest('.form__input-wrapper');
        if (!wrapper) {
            return;
        }

        input.addEventListener('change', (event) => {
            if (!!event.target.value) {
                gsap.to(wrapper, { color: COLORS.WHITE });
            } else {
                gsap.to(wrapper, { color: COLORS.WHITE_70 });
            }
        });
    });
};
