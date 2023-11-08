import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useFetch(url, query = "") {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const res = await axios.get(`${url}?${query}`);
                setData(res.data);
            } catch (err) {
                setData([]);
                toast.error(err?.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData();
    }, [url, query]);

    return { isLoading, data }

}