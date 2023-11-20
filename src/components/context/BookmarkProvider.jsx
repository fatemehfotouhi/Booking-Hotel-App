import { createContext, useContext, useState } from "react"
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkProvider({ children }) {
    const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [isLoadingSelectedBookmark, setIsLoadingSelectedBookmark] = useState(false);

    async function getSelectedBookmark(id) {
        try {
            setIsLoadingSelectedBookmark(true);
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
            setSelectedBookmark(data);
            setIsLoadingSelectedBookmark(false);
        } catch (err) {
            toast.error(err.message);
            setIsLoadingSelectedBookmark(false);
        }
    }

    return (
        <BookmarkContext.Provider value={{ bookmarks, isLoading, selectedBookmark, getSelectedBookmark, isLoadingSelectedBookmark }}>
            {children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkProvider;

export function useBookmark() {
    return useContext(BookmarkContext);
}