import { useSelectWidth } from "./select/script";
import { useIndustryField } from "./industry/script";
import { setFormApiSelector } from "./apiSelection/script";

export const useForm = () => {
    const form = document.querySelector('.form');

    if (!form) {
        return;
    }

    useSelectWidth(form);
    useIndustryField(form);
    setFormApiSelector(form);
};
