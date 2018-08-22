import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

const history = (typeof window !== 'undefined') ? createHistory() : createMemoryHistory();
export default history;
