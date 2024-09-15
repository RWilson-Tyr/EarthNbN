import { useState } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch } from 'react-redux';
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
    <><div>
      <div className='partone'>
    <h1>Create a New Spot</h1>
    <h3>Where`&apos;`s your place located?</h3>
    <caption>Guests will only get your exact address once they booked a reservation.</caption>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="formsectionone">
    <label className='country'>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      {/* {errors.country && <p>{errors.country}</p>} */}
      <label className='address'>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      {/* {errors.address && <p>{errors.address}</p>} */}
      <label className='city'>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      {/* {errors.city && <p>{errors.city}</p>} */}
      <label className='state'>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label className='lat'>
        Latitude
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      {/* {errors.lat && <p>{errors.lat}</p>} */}
      <label className='lng'>
        Longitude
        <input
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </label>
      {/* {errors.lng && <p>{errors.lng}</p>} */}

      </div>
      <div className='formsectiontwo'>
        <h3>Describe your place to guests</h3>
        <caption>Mention the best features of you space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</caption>
        <label className='description'>
        <textarea
          className='decriptionInput'
          placeholder='Please write at least 30 characters'
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows
        />
      </label>
      {/* {errors.description && <p>{errors.description}</p>} */}
      </div>
      <div className='formsectionthree'>
        <h3>Create a title for your spot</h3>
        <caption>Catch guests`&apos;` attention with a spot title that highlights what makes your place special.</caption>
        <label className='name'>
        <input
          type="text"
          placeholder='Name of your spot'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      {/* {errors.name && <p>{errors.name}</p>} */}
      </div>
      <div className='formsectionfour'>
        <h3>Set a base price for your spot</h3>
        <caption>Competitive pricing can help your listing stand out and rank higher in search results.</caption>
        <label className='price'>
        <input
          placeholder='Price per night (USD)'
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        </label>
        {/* {errors.price && <p>{errors.price}</p>} */}
      </div>
      <div className='formsectionfive'>
        <h3>Liven up your spot with photos</h3>
        <label>
          <input
          className='img1'
            placeholder='Preview Image URL'
            type='text'
            required
          />
          <input
          className='img2'
            placeholder='Image URL'
            type='text'
          />
          <input
          className='img3'
            placeholder='Image URL'
            type='text'
          />
          <input
          className='img4'
            placeholder='Image URL'
            type='text'
          />
          <input
          className='img5'
            placeholder='Image URL'
            type='text'
          />
        </label>
      </div>
      <div className='submitButton'>
      <button type="submit">
      Create Spot
      </button>
      </div>
      </form>
    </div>
  </>
  )
}

export default CreateSpot;
