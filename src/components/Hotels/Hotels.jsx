import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useHotels } from '../context/HotelsProvider';

function Hotels() {
    const { isLoading, data, selectedHotel } = useHotels();
    if (isLoading) return <Loader />
    return (
        <div>
            <h1>Search Results ({data.length})</h1>
            <div className='searchList'>
                {data.map((item) => {
                    return (
                        <Link
                            key={item.name}
                            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
                        >
                            <div className={`searchItem ${selectedHotel?.id === item.id ? "current-hotel" : ""}`}>
                                <img src={item.picture_url.url} alt={item.name} />
                                <div className='searchItemDesc'>
                                    <p className="location">{item.smart_location}</p>
                                    <p className="name">{item.name}</p>
                                    <p className="price">€&nbsp;{item.price}&nbsp;
                                        <span>night</span> </p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Hotels