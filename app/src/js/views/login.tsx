import {service as router} from '../services/router';
import {service as api} from '../services/api';
import {service as me} from '../services/me';
import {h} from '../components/framework';

export const dependencies = async () => {
    return {
        me,
        router,
        Tokens: api.Tokens
    };
};

export const meta = Object.freeze({
    title: 'Citykleta | Login',
    css: ['public/theme/login.css']
});

export const LoginForm = props => <div id="login-container" class="page-centered">
    <h1 class="visually-hidden">Login</h1>
    <form id="login-form" onsubmit={props.onsubmit}>
        <label>
            <span>Email:</span>
            <input type="email" id="username" name="username" autocomplete="email" required={true}/>
        </label>
        <label>
            <span>Password</span>
            <input type="password" id="password" name="password" autocomplete="password" required={true}/>
        </label>
        <button>Login</button>
    </form>
</div>;

export const component = ({router, Tokens}) => {
    const onsubmit = async (ev) => {
        ev.preventDefault();
        const {target: form} = ev;
        ev.preventDefault();
        const username = (form.elements[0] as HTMLInputElement).value;
        const password = (form.elements[1] as HTMLInputElement).value;
        try {
            const user = await Tokens().create({
                username,
                password
            });
            me.set(user);
            router.navigate('/users');
        } catch (e) {
            // todo display feedback
            console.log(e);
        }
    };

    return <LoginForm onsubmit={onsubmit}/>;
};
