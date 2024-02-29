import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// const anecdotesAtStart = [
// 	"If it hurts, do it more often",
// 	"Adding manpower to a late software project makes it later!",
// 	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
// 	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
// 	"Premature optimization is the root of all evil.",
// 	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		appendAnecdotes(state, action) {
			state.push(action.payload);
		},

		addVote(state, action) {
			console.log(state);
			return state.map((anecdote) => {
				return anecdote.id === action.payload
					? { ...anecdote, votes: anecdote.votes + 1 }
					: anecdote;
			});
		},

		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		anecdoteService
			.getAll()
			.then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
	};
};

export const createAnecdote = (anecdote) => {
	return async (dispatch) => {
		{
			anecdoteService
				.createAnecdote(anecdote)
				.then((anecdote) => dispatch(appendAnecdotes(anecdote)));
		}
	};
};

export default anecdoteSlice.reducer;
export const { appendAnecdotes, addVote, setAnecdotes } = anecdoteSlice.actions;

// const anecdoteReducer = (state = initialState, action) => {
// 	console.log("state now: ", state);
// 	console.log("action", action);
// 	switch (action.type) {
// 		case "VOTE_INCREMENT":
// 			return state.map((anecdote) =>
// 				anecdote.id === action.payload.id
// 					? { ...anecdote, votes: anecdote.votes + 1 }
// 					: anecdote
// 			);

// 		case "CREATE_ANECDOTE":
// 			return [...state, asObject(action.payload.anecdote)];

// 		default:
// 			return state;
// 	}
// };

// export const addVote = (id) => {
// 	return {
// 		type: "VOTE_INCREMENT",
// 		payload: { id },
// 	};
// };

// export const createAnecdote = (anecdote) => {
// 	return {
// 		type: "CREATE_ANECDOTE",
// 		payload: {
// 			anecdote,
// 		},
// 	};
// };
