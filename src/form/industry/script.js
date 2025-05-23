export const useIndustryField = (formBlock) => {
    const forms = formBlock.querySelectorAll('.form__content');

    forms.forEach(initIndustryField);

    function initIndustryField(form) {
        const select = form.querySelector('select[name="Industry"]');
        const input = form.querySelector('input[name="Other-industry"]');

        if (!input) {
            return;
        }

        const inputWrapper = input.closest('.form__toggled');

        gsap.to(inputWrapper, { display: 'none' });

        if (!select) {
            return;
        }

        select.addEventListener('change', () => {
            if (select.value === 'other') {
                input.setAttribute('required', '');
                gsap.to(inputWrapper, { display: 'block' });
            } else {
                input.removeAttribute('required');
                gsap.to(inputWrapper, { display: 'none' });
            }
        });
    }
};
