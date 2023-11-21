import { HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag"


function BookmarksList() {
    const { bookmarks, isLoading, selectedBookmark, deleteBookmark } = useBookmark();
    const handleDeleteBookmark = async (e, id) => {
        e.preventDefault();
        await deleteBookmark(id)
    }

    if (!bookmarks.length) return <strong>There is no bookmark!!</strong>
    if (isLoading) return <Loader />
    return (
        <div>
            <h2>BookmarkList</h2>
            <div className="bookmarksList">
                {bookmarks.map((b) => {
                    return (
                        <Link
                            to={`/bookmarks/${b.id}?lat=${b.latitude}&lng=${b.longitude}`}
                            key={b.id}
                        >
                            <div className={`bookmarkItem ${selectedBookmark?.id === b.id ? "selectedBookmark" : ""}`}>
                                <div>
                                    <ReactCountryFlag svg countryCode={b.countryCode} />
                                    <strong className="city">{b.cityName}</strong>
                                    <span className="country">{b.country}</span>
                                </div>
                                <button onClick={(e) => handleDeleteBookmark(e, b.id)}>
                                    <HiTrash className="deleteIcon" />
                                </button>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default BookmarksList