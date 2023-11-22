import { createContext, useContext, useEffect, useReducer, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";


const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const initialState = {
    isLoading: false,
    bookmarks: [],
    selectedBookmark: null,
    error: null,
}

function bookReducer(state, action) {
    switch (action.type) {
        case "loading": return {
            ...state,
            isLoading: true,
        }
        case "bookmarks/loaded": return {
            ...state,
            isLoading: false,
            bookmarks: action.payload,
        }
        case "bookmark/loaded": return {
            ...state,
            isLoading: false,
            selectedBookmark: action.payload,
        }
        case "bookmark/created": return {
            ...state,
            isLoading: false,
            selectedBookmark: action.payload,
            bookmarks: [...state.bookmarks, action.payload],
        }
        case "bookmark/deleted": return {
            ...state,
            isLoading: false,
            bookmarks: state.bookmarks.filter((b) => b.id !== action.payload),
            selectedBookmark: null,
        }
        case "rejected": return {
            ...state,
            isLoading: false,
            error: action.payload,
        }
        default: throw new Error("Unknown action")

    }

}

function BookmarkProvider({ children }) {

    const [{ isLoading, bookmarks, selectedBookmark, error }, dispatch] = useReducer(bookReducer, initialState);

    useEffect(() => {
        async function getBookmarks() {
            try {
                dispatch({ type: "loading" })
                const { data } = await axios.get(`${BASE_URL}/bookmarks`);
                dispatch({ type: "bookmarks/loaded", payload: data })
            } catch (err) {
                toast.error(err.message);
                dispatch({ type: "rejected", payload: err.message })
            }
        }
        getBookmarks();
    }, [])

    async function getSelectedBookmark(id) {
        try {
            dispatch({ type: "loading" })
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
            dispatch({ type: "bookmark/loaded", payload: data })
        } catch (err) {
            toast.error(err.message);
            dispatch({ type: "rejected", payload: err.message })
        }
    }

    async function createNewBookmark(newBookmark) {
        try {
            dispatch({ type: "loading" })
            const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
            dispatch({ type: "bookmark/created", payload: data })
        } catch (err) {
            toast.error(err);
            dispatch({ type: "rejected", payload: err.message })
        }
    }
    async function deleteBookmark(id) {
        try {
            dispatch({ type: "loading" })
            await axios.delete(`${BASE_URL}/bookmarks/${id}`);
            dispatch({ type: "bookmark/deleted", payload: id })
        } catch (err) {
            toast.error(err);
            dispatch({ type: "rejected", payload: err.message });
        }
    }

    return (
        <BookmarkContext.Provider
            value={{
                bookmarks,
                isLoading,
                selectedBookmark,
                getSelectedBookmark,
                deleteBookmark,
                createNewBookmark
            }}>
            {children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkProvider;

export function useBookmark() {
    return useContext(BookmarkContext);
}