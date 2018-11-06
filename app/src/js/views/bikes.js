import { service as me } from '../services/me';
import { h } from '../components/framework';
import { service as bikes } from '../services/bike-list';
import { withListChange, withIndicator, withTable, withPagination, withSearch } from 'smart-table-flaco';
import { Button } from '../components/button';
import { TablePagination, TableSearchInput, TableIndicator } from '../components/table';
export const dependencies = async () => {
    return {
        me: await me.get(),
        bikes
    };
};
export const meta = {
    title: 'Citykleta | Bikes',
    css: []
};
const BikeRow = props => {
    const { bike } = props;
    return h("tr", null,
        h("td", null,
            "#",
            bike.id),
        h("td", null, bike.brand),
        h("td", null, bike.owner.name),
        h("td", null,
            bike.price,
            "$"),
        h("td", null, new Date(bike.fabrication_date).toLocaleDateString()),
        h("td", null, new Date(bike.acquisition_date).toLocaleDateString()),
        h("td", null,
            h("div", { class: "action-bar" },
                h(Button, { class: "action" }, "Edit"),
                h(Button, { class: "danger" }, "Delete"))));
};
export const component = ({ me, bikes }) => {
    const withBikeTable = withTable(bikes);
    const List = withBikeTable(withListChange((props, stProps) => {
        const { state } = stProps;
        return h("tbody", null, state.length ? state.map(item => h(BikeRow, { bike: item.value })) :
            h("tr", null,
                h("td", { colspan: "7" }, "No matching item found")));
    }));
    const Search = withBikeTable(withSearch(TableSearchInput));
    const Indicator = withBikeTable(withIndicator(TableIndicator));
    const Pagination = withBikeTable(withPagination(TablePagination));
    return h("div", null,
        h("h1", null, "Bikes"),
        h("div", { class: "table-container" },
            h(Indicator, null),
            h(Pagination, null),
            h(Search, { placeholder: "search on brand or owner", stScope: [] }),
            h("table", null,
                h("thead", null,
                    h("tr", null,
                        h("th", null, "ID"),
                        h("th", null, "Brand"),
                        h("th", null, "Owner"),
                        h("th", null, "Price"),
                        h("th", null, "Fabrication Date"),
                        h("th", null, "Acquisition Date"))),
                h(List, null)),
            h(Pagination, null)));
};
