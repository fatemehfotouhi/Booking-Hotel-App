import { createContext, useContext } from "react"
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HotelsContext = createContext();

function HotelsProvider({ children }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room;
    const { isLoading, data } = useFetch("http://localhost:5000/hotels",
        `q=${destination || ""}&accommodates_gtr=${room || 1}`);

    return (
        <HotelsContext.Provider value={{ isLoading, data }}>
            {children}
        </HotelsContext.Provider>
    )
}
export default HotelsProvider

export function useHotels() {
    return useContext(HotelsContext);
}