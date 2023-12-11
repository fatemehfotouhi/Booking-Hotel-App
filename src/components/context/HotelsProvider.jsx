import { createContext, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";

const HotelsContext = createContext();
const BASE_URL = "http://localhost:5000";

function HotelsProvider({ children }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoadingSingleHotel, setIsLoadingSingleHotel] = useState(false);
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room;
    const { isLoading, data } = useFetch(`${BASE_URL}/hotels`,
        `q=${destination || ""}&accommodates_gtr=${room || 1}`);

    const [selectedHotel, setSelectedHotel] = useState(null);
    async function getSingleHotel(id) {
        try {
            setIsLoadingSingleHotel(true)
            const { data } = await axios.get(`${BASE_URL}/hotels/${id}`);
            setSelectedHotel(data)
            setIsLoadingSingleHotel(false);
        } catch (err) {
            toast.error(err.message)
            setIsLoadingSingleHotel(false);
        }
    }

    return (
        <HotelsContext.Provider value={{ isLoading, data, selectedHotel, getSingleHotel, isLoadingSingleHotel }}>
            {children}
        </HotelsContext.Provider >
    )
}
export default HotelsProvider

export function useHotels() {
    return useContext(HotelsContext);
}