import { useState } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./CreateSpot.css"

function CreateSpot() {
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    // const [img1, setImg1] = useState("")
    // const [img2, setImg2] = useState("")
    // const [img3, setImg3] = useState("")
    // const [img4, setImg4] = useState("")
    // const [img5, setImg5] = useState("")

    // const navigate = useNavigate()
    // const allImg = [img1, img2, img3, img4, img5]

    const handleSubmit =  async (e) => {
      e.preventDefault();
        return dispatch(
          spotActions.createSpot({ 
            address, 
            city, 
            state, 
            country, 
            lat, 
            lng, 
            name, 
            description, 
            price })
        )
        // .then((res) =>
          
        //   {return allImg.forEach(url=>dispatch(
        //   spotActions.addSpotImage(res.id, {
        //   url,
        //   preview  
        //   })))})
    };

  return (
    <>
    <h1>Create a New Spot</h1>
    <form onSubmit={handleSubmit}>
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
      Create Spot
      </button>
    </form>
  </>
  )
}

export default CreateSpot;
