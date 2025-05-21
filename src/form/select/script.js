import './style.scss';

export const useSelectWidth = () => {
    const selects = document.querySelectorAll('form select');
    if (!selects.length) {
        return;
    }

    const helperElement = getHelper();

    selects.forEach((select) => {
        select.classList.add('select-field');
        select.addEventListener("change", initResize);
    });

    window.addEventListener('resize', resizeAll);

    resizeAll();

    function resizeAll() {
        selects.forEach((select) => {
            initResize({ target: select });
        });
    }

    function initResize(event) {
        helperElement.innerHTML = event.target.querySelector("option:checked").innerText;
        resize(event.target, helperElement.offsetWidth);
    }

    function resize(element, width) {
        element.style.setProperty('--width', `${width}px`);
    }

    function getHelper() {
        const existingHelper = document.querySelector('.select-field__helper');
        if (existingHelper) {
            existingHelper.remove();
        }
        const helperInput = document.createElement('div');
        helperInput.classList.add('form__input');

        const helperElement = document.createElement('div');
        helperElement.classList.add('form__line', 'select-field__helper');
        helperElement.setAttribute('aria-hidden', 'true');
        helperElement.appendChild(helperInput);
        document.body.appendChild(helperElement);

        return helperInput;
    }
};
