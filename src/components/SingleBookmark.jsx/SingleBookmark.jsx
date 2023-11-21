import React, { useEffect } from 'react'
import { useBookmark } from '../context/BookmarkProvider'
import Loader from '../Loader/Loader';
import ReactCountryFlag from 'react-country-flag';
import { useParams } from 'react-router-dom';

function SingleBookmark() {
    const { id } = useParams();
    const { selectedBookmark, isLoading, getSelectedBookmark } = useBookmark();
    useEffect(() => {
        getSelectedBookmark(id)
    }, [id])
    if (isLoading || !selectedBookmark) return <Loader />
    return (
        <div>
            <h2>{selectedBookmark.cityName}</h2>
            <div className='singleBookmark'>
                <ReactCountryFlag svg countryCode={selectedBookmark.countryCode} />
                <strong>{selectedBookmark.cityName}</strong>
                <span>{selectedBookmark.country}</span>
            </div>
        </div>
    )
}

export default SingleBookmark