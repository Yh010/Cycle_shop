import { useState } from 'react';
import { Button, Input } from "@material-tailwind/react";
import axios from 'axios';

const Sell = () => {
  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState([]);
  const [phone, setPhone] = useState('');
  const [sellerName, setSellerName] = useState('');

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  const handleSubmit = async () => {
    const cycleData = {
      brand,
      name: title,
      description,
      price: parseFloat(price),
      pics: photos.map(photo => URL.createObjectURL(photo))
    };

    const data = {
      name: sellerName,  // Replace with actual seller name if available
      phone,
      cycles: [cycleData]
    };

    try {
      const response = await axios.post('https://backend-phi-gray.vercel.app/Sell', data);
      console.log(response.data);
      alert('Cycle posted successfully!');
    } catch (error) {
      console.error('Error posting cycle:', error);
      alert('Failed to post cycle.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Post Your Cycle</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Include Some Details</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Brand *</label>
          <div className="flex space-x-4">
            {['Hercules', 'Hero', 'Other Brands'].map((b) => (
              <button
                key={b}
                className={`px-4 py-2 border rounded ${brand === b ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={() => setBrand(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Seller Name *</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            placeholder="Mention the key features of your item (e.g. brand, model, age, type)"
            maxLength={70}
          />
          <span className="text-gray-500">{title.length} / 70</span>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Cycle Name *</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Mention the key features of your item (e.g. brand, model, age, type)"
            maxLength={70}
          />
          <span className="text-gray-500">{title.length} / 70</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description *</label>
          <textarea
            className="w-full px-4 py-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Include condition, features, and reason for selling"
            maxLength={4096}
          />
          <span className="text-gray-500">{description.length} / 4096</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Set a Price</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price *</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Upload up to 12 Photos</h2>
        <div className="grid grid-cols-3 gap-4">
          <label className="w-full h-32 border rounded flex items-center justify-center cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <span className="text-gray-500">Add Photo</span>
          </label>
          {photos.map((photo, index) => (
            <div key={index} className="w-full h-32 border rounded flex items-center justify-center overflow-hidden">
              <img src={URL.createObjectURL(photo)} alt="uploaded" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <Input
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <Button color="blue" onClick={handleSubmit}>POST</Button>
    </div>
  );
};

export default Sell;
