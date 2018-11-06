import {service as router} from './services/router';
import {LoadingIndicator} from './components/loading-indicator';
import {unMount, mount} from './components/framework';

export interface App {
    on(route: string, handler: () => void | Promise<any>);

    boot(): void;
}

const minTime = <T>(task: Promise<T>, time = 300): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(task);
        }, time);
    });
};

const once = (event: string, listener) => (el: Element): Promise<void> => {
    return new Promise<void>(resolve => {
        const actualListener = (ev) => {
            listener(ev);
            el.removeEventListener(event, actualListener);
            resolve();
        };
        el.addEventListener(event, actualListener);
    });
};

export const App = ($ = document): App => {

    const main = $.querySelector('main');
    const head = $.querySelector('head');
    const header = $.getElementById('main-header');

    let currentComponent;

    router.notFound(() => {
        router.navigate('/users'); // Default route
    });

    return {
        on(route, handler) {

            const load = async () => {
                // 1. Remove content
                if (currentComponent) {
                    unMount(currentComponent);
                }

                // 2. Set Loading indicator
                main.classList.add('page-centered');
                const loadingIndicator = LoadingIndicator();
                mount(loadingIndicator, {}, main);
                const vnode = await minTime<Node>(loadContent());

                // 3. Set content and remove loading indicator
                main.classList.remove('page-centered');
                unMount(loadingIndicator);
                mount(vnode, {}, main);

                return vnode;
            };

            const loadContent = async (): Promise<Node> => {
                const {dependencies, meta, component} = await handler();
                const {title = 'Citykleta | Admin Panel', css = []} = meta;
                //todo filter already loaded;
                const links = Promise.all(css.map(styleSheet => {
                    const link = document.createElement('link');
                    link.setAttribute('href', styleSheet);
                    link.setAttribute('rel', 'stylesheet');
                    link.setAttribute('type', 'text/css');
                    head.appendChild(link);
                    return once('load', () => {
                    })(link);
                }));
                head.querySelector('title').text = title;
                const services = await dependencies();
                await links;
                return component(services);
            };

            router.on(route, async () => {
                try {
                    currentComponent = await load();
                } catch (e) {
                    if (e.status === 401) {
                        router.navigate('/login'); // User is not logged in
                    }
                }
            });
        },
        boot() {
            router.updatePageLinks();
            router.resolve();
        }
    };
};
