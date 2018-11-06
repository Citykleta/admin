import { service as me } from '../services/me';
import { service as users } from '../services/user-list';
import { h } from '../components/framework';
import { withTable, withListChange, withPagination, withIndicator, withSearch } from 'smart-table-flaco';
import { TableIndicator, TablePagination, TableSearchInput } from '../components/table';
import { Button } from '../components/button';
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
    const { user } = props;
    return h("tr", null,
        h("td", null,
            "#",
            user.id),
        h("td", null, user.email),
        h("td", null, user.role && user.role.title || 'NA'),
        h("td", null, user.businesses && user.businesses.length),
        h("td", null,
            h("div", { className: "action-bar" },
                h(Button, { class: "action" }, "Edit"),
                h(Button, { class: "danger" }, "Delete"))));
};
export const component = ({ me, users }) => {
    const withUserTable = withTable(users);
    const List = withUserTable(withListChange((props, stProps) => {
        const { state } = stProps;
        return h("tbody", null, state.length ? state.map(item => h(UserRow, { user: item.value })) :
            h("tr", null,
                h("td", { colspan: "7" }, "No matching item found")));
    }));
    const Search = withUserTable(withSearch(TableSearchInput));
    const Indicator = withUserTable(withIndicator(TableIndicator));
    const Pagination = withUserTable(withPagination(TablePagination));
    return h("div", null,
        h("h1", null, "Users"),
        h("div", { class: "table-container" },
            h(Indicator, null),
            h(Pagination, null),
            h(Search, { placeholder: "search on email or username", stScope: [] }),
            h("table", null,
                h("thead", null,
                    h("tr", null,
                        h("th", null, "ID"),
                        h("th", null, "Email"),
                        h("th", null, "Role"),
                        h("th", null, "Businesses"))),
                h(List, null)),
            h(Pagination, null)));
};
