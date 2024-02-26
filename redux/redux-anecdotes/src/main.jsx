import ReactDOM from "react-dom/client";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";

const store = createStore(anecdoteReducer);

store.subscribe(() => {
	console.log(store.getState());
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);
