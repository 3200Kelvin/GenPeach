import { useSelectWidth } from "./select/script";
// import { useFormFill } from "./fill/script";
import { useIndustryField } from "./industry/script";

export const useForm = () => {
    const form = document.querySelector('.form');

    if (!form) {
        return;
    }

    useSelectWidth(form);
    // useFormFill(form);
    useIndustryField(form);
};
