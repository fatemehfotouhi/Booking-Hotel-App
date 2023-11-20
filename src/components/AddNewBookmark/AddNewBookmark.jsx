import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";

function AddNewBookmark() {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const { allBookmarks, setAllBookmarks } = useBookmark();

    const navigate = useNavigate();
    const backHandler = () => navigate("/bookmarks");

    const addNewBookmarkHandler = (e) => {
        e.preventDefault();
        const newBookmark = {
            id: new Date().getTime(),
            city: city,
            country: country,
        }
        setAllBookmarks([...allBookmarks, newBookmark]);
        setCity("");
        setCountry("");
    }
    return (
        <div>
            <h2>Bookmark New Location</h2>
            <form className="form" action="" onSubmit={addNewBookmarkHandler}>
                <div className="formControl">
                    <label>CityName</label>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="formControl">
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className="formAction">
                    <button className="backBtn" onClick={backHandler}>Back</button>
                    <button
                        className="addBtn"
                        disabled={!city || !country ? true : false}>Add</button>
                </div>
            </form>

        </div>
    )
}

export default AddNewBookmark