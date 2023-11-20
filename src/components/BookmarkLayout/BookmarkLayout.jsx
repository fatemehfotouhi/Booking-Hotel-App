import { Outlet } from 'react-router-dom'
import Map from '../Map/Map'
import { useBookmark } from '../context/BookmarkProvider'

function BookmarkLayout() {
    const { bookmarks } = useBookmark();
    return (
        <div className='bookmarkLayout'>
            <div className='sidebar'>
                <Outlet />
            </div>
            <Map markerLocation={bookmarks} />
        </div>
    )
}

export default BookmarkLayout