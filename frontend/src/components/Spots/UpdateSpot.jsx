import { useState, useEffect } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateSpot.css"

function UpdateSpot() {
    const dispatch = useDispatch();
    const getId = useParams()
    const spot = useSelector(state => state.spotsReducer.curr)
    let navigate = useNavigate()



    useEffect(() => {
        document.title="Update your Spot"
        dispatch(spotActions.getSingleSpot(getId.spotid))
            .then((res) => {
                setAddress(res.address)
                setCity(res.city)
                setState(res.state)
                setCountry(res.country)
                setLat(res.lat)
                setLng(res.lng)
                setName(res.name)
                setDescription(res.description)
                setPrice(res.price)
            })
    }, [dispatch]);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(spotId)
        return dispatch(
            spotActions.updateSpot({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            }, getId)
        ).then(()=>navigate(`/spots/${getId.spotid}`))
        // .then((res) =>

        //   {return allImg.forEach(url=>dispatch(
        //   spotActions.addSpotImage(res.id, {
        //   url,
        //   preview  
        //   })))})
    };

    return (
        <>
            <h1>Update your Spot</h1>
            {spot ? <form onSubmit={handleSubmit}>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.address && <p>{errors.address}</p>} */}
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.city && <p>{errors.city}</p>} */}
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.state && <p>{errors.state}</p>} */}
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.country && <p>{errors.country}</p>} */}
                <label>
                    Latitude
                    <input
                        type="number"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.lat && <p>{errors.lat}</p>} */}
                <label>
                    Longitude
                    <input
                        type="number"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.lng && <p>{errors.lng}</p>} */}
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.name && <p>{errors.name}</p>} */}
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.description && <p>{errors.description}</p>} */}
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.price && <p>{errors.price}</p>} */}
                <button type="submit">
                    Update Spot
                </button>
            </form> : <p>...loading</p>}
            
        </>
    )
}

export default UpdateSpot;
