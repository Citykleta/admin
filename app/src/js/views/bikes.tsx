import {service as me} from '../services/me';
import {h} from '../components/framework';
import {service as bikes} from '../services/bike-list';
import {withListChange, withIndicator, withTable, withPagination, withSearch} from 'smart-table-flaco';
import {Button} from '../components/button';
import {TablePagination, TableSearchInput, TableIndicator} from '../components/table';

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
    const {bike} = props;
    return <tr>
        <td>#{bike.id}</td>
        <td>{bike.brand}</td>
        <td>{bike.owner.name}</td>
        <td>{bike.price}$</td>
        <td>{new Date(bike.fabrication_date).toLocaleDateString()}</td>
        <td>{new Date(bike.acquisition_date).toLocaleDateString()}</td>
        <td>
            <div class="action-bar">
                <Button class="action">Edit</Button>
                <Button class="danger">Delete</Button>
            </div>
        </td>
    </tr>;
};

export const component = ({me, bikes}) => {

    const withBikeTable = withTable(bikes);

    const List = withBikeTable(withListChange((props, stProps) => {
        const {state} = stProps;
        return <tbody>
        {
            state.length ? state.map(item => <BikeRow bike={item.value}/>) :
                <tr>
                    <td colspan="7">No matching item found</td>
                </tr>
        }
        </tbody>;
    }));

    const Search = withBikeTable(withSearch(TableSearchInput));

    const Indicator = withBikeTable(withIndicator(TableIndicator));

    const Pagination = withBikeTable(withPagination(TablePagination));

    return <div>
        <h1>Bikes</h1>
        <div class="table-container">
            <Indicator/>
            <Pagination/>
            <Search placeholder="search on brand or owner" stScope={[]}/>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Brand</th>
                    <th>Owner</th>
                    <th>Price</th>
                    <th>Fabrication Date</th>
                    <th>Acquisition Date</th>
                </tr>
                </thead>
                <List/>
            </table>
            <Pagination/>
        </div>
    </div>;
};
