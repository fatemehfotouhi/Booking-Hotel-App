import { createContext, useContext, useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkProvider({ children }) {
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        async function getBookmarks() {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`${BASE_URL}/bookmarks`);
                setBookmarks(data);
            } catch (err) {
                toast.error(err.message);
            }
            finally {
                setIsLoading(false);
            }
        }
        getBookmarks();
    }, [])

    async function getSelectedBookmark(id) {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
            setSelectedBookmark(data);
        } catch (err) {
            toast.error(err.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    async function createNewBookmark(newBookmark) {
        try {
            setIsLoading(true);
            const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
            setSelectedBookmark(data);
            setBookmarks((prev) => [...prev, data]);
        } catch (err) {
            toast.error(err);
        } finally {
            setIsLoading(false);
        }
    }
    async function deleteBookmark(id) {
        try {
            setIsLoading(true);
            await axios.delete(`${BASE_URL}/bookmarks/${id}`);
            setBookmarks(prev => prev.filter((b) => b.id !== id));
        } catch (err) {
            toast.error(err)
        } finally {
            setIsLoading(false);
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