export const component = ({ el }) => {
    return {
        hide() {
            el.classList.add('hidden');
        },
        show() {
            el.classList.remove('hidden');
        }
    };
};
