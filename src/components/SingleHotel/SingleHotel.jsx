import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useHotels } from '../context/HotelsProvider';

function SingleHotel() {
    const { id } = useParams();
    const { isLoading, data } = useHotels();
    const selectedHotel = data.find((h) => h.id === id);
    if (isLoading) return <Loader />
    return (
        <div>
            <p>{selectedHotel?.name}</p>
            <span>{selectedHotel?.number_of_reviews} reviews &#128900; {selectedHotel?.city}, {selectedHotel?.country}</span>
            <img src={selectedHotel?.picture_url.url} alt={selectedHotel?.name} />

        </div>
    )
}

export default SingleHotel