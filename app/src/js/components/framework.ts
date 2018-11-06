import {render} from 'flaco';

export * from 'flaco';

export const unMount = vnode => {
    const batch = render(vnode, null, vnode.dom.parentNode);

    setTimeout(() => {
        for (const op of batch) {
            op();
        }
    });
};

