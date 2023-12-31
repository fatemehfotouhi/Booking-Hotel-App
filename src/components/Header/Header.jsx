import { HiSearch } from "react-icons/hi";
import { IoIosPin } from "react-icons/io";
import { BiSolidCalendarAlt } from "react-icons/bi";
import { FiLogIn, FiMinus, FiPlus } from "react-icons/fi";
import { useRef, useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useOutsideClick from "../../hooks/useOutsideClick";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Profile from "../Profile/Profile";


function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [destination, setDestination] = useState(searchParams.get("destination") || "");
    const [isOpenOption, setIsOpenOption] = useState(false);
    const [options, setOptions] = useState({
        adult: (JSON.parse(searchParams.get("options"))?.adult) || 1,
        children: (JSON.parse(searchParams.get("options"))?.children) || 0,
        room: (JSON.parse(searchParams.get("options"))?.room) || 1,
    });
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [selectionDate, setSelectionDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }]);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleOptions = (type, operation) => {
        setOptions({
            ...options,
            [type]: operation === "inc" ? options[type] + 1 : options[type] - 1,
        })
    }

    const encodedParams = createSearchParams({
        destination,
        selectionDate: JSON.stringify(selectionDate),
        options: JSON.stringify(options),
    })

    const handleSearch = () => {
        navigate({
            pathname: '/hotels',
            search: encodedParams.toString(),
        })
    }
    const handleBookmarks = () => {
        navigate('/bookmarks');
    }
    const handleLoginForm = () => {
        navigate("/login");
    }

    return (
        <div className='header'>
            {isAuthenticated ?
                <Profile />
                :
                (<button
                    className="primaryBtn loginBtn"
                    onClick={handleLoginForm}
                >
                    <FiLogIn style={{ width: '1.25rem', height: '1.25rem' }} />
                    &nbsp;Login
                </button>)
            }
            <div className='headerSearch'>
                <div className="headerSearchItem">
                    <IoIosPin className="headerIcon locationIcon" />
                    <input
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        type="text"
                        placeholder="where to go?"
                        className="headerSearchInput"
                    />
                    <span className="separator"></span>
                </div>
                <div className="headerSearchItem" o>
                    <BiSolidCalendarAlt className="headerIcon calendarIcon" />
                    <div
                        onClick={() => setIsOpenDate(!isOpenDate)}
                    >
                        {`${format(new Date(selectionDate[0].startDate), "MM-dd-yyyy")} to 
                        ${format(new Date(selectionDate[0].endDate), "MM-dd-yyyy")}`}
                    </div>
                    {isOpenDate && <DateRange
                        className="calendar"
                        ranges={selectionDate}
                        onChange={(item) => { setSelectionDate([item.selection]) }}
                        moveRangeOnFirstSelection={true}
                        minDate={new Date()}
                    />}
                    <span className="separator"></span>
                </div>
                <div className="headerSearchItem">
                    <div id="optionDropDown" onClick={() => setIsOpenOption(!isOpenOption)}>{options.adult} adult &bull; {options.children} children  &bull; {options.room} room</div>
                    {isOpenOption && <GuestOptionList handleOptions={handleOptions} options={options} setIsOpenOption={setIsOpenOption} />}
                    <span className="separator"></span>
                </div>
                <div className="headerSearchItem">
                    <button className="headerSearchBtn" onClick={handleSearch}>
                        <HiSearch className="headerIcon" />
                    </button>
                </div>
                <div className="headerSearchItem">
                    <button
                        className="bookmarkBtn"
                        onClick={handleBookmarks}
                    >
                        Bookmarks
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;

function GuestOptionList({ options, setIsOpenOption, handleOptions }) {
    const optionRef = useRef();
    useOutsideClick(optionRef, () => setIsOpenOption(false), "optionDropDown")
    return (
        <div className="guestOptions" ref={optionRef}>
            <OptionItem
                type="adult"
                options={options}
                minLimit={1}
                handleOptions={handleOptions}
            />
            <OptionItem
                type="children"
                options={options}
                minLimit={0}
                handleOptions={handleOptions}
            />
            <OptionItem
                type="room"
                options={options}
                minLimit={1}
                handleOptions={handleOptions}
            />
        </div>
    )
}

function OptionItem({ type, options, minLimit, handleOptions }) {
    return (
        <div className="guestOptionItem">
            <span className="optionText">{type}</span>
            <div className="operation">
                <button
                    className="optionCounterBtn"
                    disabled={options[type] <= minLimit}
                    onClick={() => handleOptions(type, "dec")}
                >
                    <FiMinus />
                </button>
                <span className="optionCounterNumber">{options[type]}</span>
                <button
                    className="optionCounterBtn"
                    onClick={() => handleOptions(type, "inc")}
                >
                    <FiPlus />
                </button>
            </div>
        </div>
    )
}