import {service as me} from '../services/me';
import {service as users} from '../services/user-list';
import {h} from '../components/framework';
import {withTable, withListChange, withPagination, withIndicator, withSearch} from 'smart-table-flaco';
import {TableIndicator, TablePagination, TableSearchInput} from '../components/table';
import {Button} from '../components/button';

export const dependencies = async () => {
    return {
        me: await me.get(),
        users
    };
};

export const meta = {
    title: 'Citykleta | Users',
    css: []
};

const UserRow = (props) => {
    const {user} = props;
    return <tr>
        <td>#{user.id}</td>
        <td>{user.email}</td>
        <td>{user.role && user.role.title || 'NA'}</td>
        <td>{user.businesses && user.businesses.length}</td>
        <td>
            <div className="action-bar">
                <Button class="action">Edit</Button>
                <Button class="danger">Delete</Button>
            </div>
        </td>
    </tr>;
};

export const component = ({me, users}) => {
    const withUserTable = withTable(users);

    const List = withUserTable(withListChange((props, stProps) => {
        const {state} = stProps;
        return <tbody>
        {
            state.length ? state.map(item => <UserRow user={item.value}/>) :
                <tr>
                    <td colspan="7">No matching item found</td>
                </tr>
        }
        </tbody>;
    }));

    const Search = withUserTable(withSearch(TableSearchInput));
    const Indicator = withUserTable(withIndicator(TableIndicator));
    const Pagination = withUserTable(withPagination(TablePagination));

    return <div>
        <h1>Users</h1>
        <div class="table-container">
            <Indicator/>
            <Pagination/>
            <Search placeholder="search on email or username" stScope={[]}/>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Businesses</th>
                </tr>
                </thead>
                <List/>
            </table>
            <Pagination/>
        </div>
    </div>;


};
