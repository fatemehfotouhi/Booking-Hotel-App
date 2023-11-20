import { useParams } from 'react-router-dom';
import { useHotels } from '../context/HotelsProvider';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';

function SingleHotel() {
    const { id } = useParams();
    const { isLoadingSingleHotel, getSingleHotel, selectedHotel } = useHotels();
    useEffect(() => {
        getSingleHotel(id)
    }, [id])

    if (isLoadingSingleHotel || !selectedHotel) return <Loader />
    return (
        <div>
            <h4>{selectedHotel.name}</h4>
            <span>{selectedHotel.number_of_reviews} reviews &#128900; {selectedHotel.city}, {selectedHotel.country}</span>
            <img src={selectedHotel.picture_url.url} alt={selectedHotel.name} />

        </div>
    )
}

export default SingleHotel