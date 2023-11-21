import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import useUrlLocation from "../../hooks/useUrlLocation";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const { createNewBookmark } = useBookmark();
    const [lat, lng] = useUrlLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        async function convertLtnLngToLocation() {
            try {
                setIsLoading(true)
                setError(null)
                const { data } = await axios.get(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
                if (!data.countryCode) throw new Error("this location is not a city! please click somewhere else.")
                setCity(data.city || data.locality || "");
                setCountry(data.countryName);
                setCountryCode(data.countryCode);
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setIsLoading(false)
            }
        }
        convertLtnLngToLocation()
    }, [lat, lng])

    const navigate = useNavigate();
    const backHandler = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    const addNewBookmarkHandler = async (e) => {
        e.preventDefault();
        const newBookmark = {
            cityName: city,
            country,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: city + country,
        }
        await createNewBookmark(newBookmark);
        setCity("");
        setCountry("");
        setCountryCode("");
        navigate("/bookmarks")
    }

    if (isLoading) return <Loader />
    if (error) return <strong>{error}</strong>;

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
                    <ReactCountryFlag className="flag" svg countryCode={countryCode} />
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