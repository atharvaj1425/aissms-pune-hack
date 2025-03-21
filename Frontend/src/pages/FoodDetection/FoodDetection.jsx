import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBoxOpen, FaCalendarAlt, FaSortNumericUp, FaCalendarTimes, FaCheckCircle, FaArrowLeft, FaMicrophone } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const FoodInventory = ({ closeModal, updateFoodItems }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    manufacturingDate: '',
    quantity: '',
    expiryDate: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Voice Recognition for Food Name Input
  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setFormData((prevData) => ({ ...prevData, name: voiceText }));
      toast.success('Voice input recognized!');
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      toast.error('Could not recognize speech. Try again.');
    };
  };

  const handleAddFoodItem = async () => {
    const { name, manufacturingDate, quantity, expiryDate } = formData;

    if (!name || !manufacturingDate || !quantity || !expiryDate) {
      toast.error('Please fill in all fields!');
      return;
    }

    try {
      console.log("Sending data to backend:", formData);
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/restaurants/addFoodItem`, formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Food item added successfully!');
      }

      const newFoodItem = {
        id: response.data._id,
        name: response.data.name,
        manufacturingDate: response.data.manufacturingDate,
        quantity: response.data.quantity,
        expiryDate: response.data.expiryDate,
        status: response.data.status,
      };

      const storedFoodItems = JSON.parse(localStorage.getItem("foodItems")) || [];
      const updatedFoodItems = [...storedFoodItems, newFoodItem];

      localStorage.setItem("foodItems", JSON.stringify(updatedFoodItems));
      setFoodItems(updatedFoodItems);
      setFormData({ name: '', manufacturingDate: '', quantity: '', expiryDate: '' });
     
      updateFoodItems(newFoodItem);
      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (error) {
      console.error("Error adding food item:", error);
      toast.error('Failed to add food item. Please try again later.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl space-y-6">
      {/* Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={closeModal}
          className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          <FaArrowLeft className="text-xl" />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 flex justify-center items-center" data-aos="flip-left">
        <FaBoxOpen className="mr-3 text-green-600" />
        Food Items Inventory
      </h2>

      {/* Input Form */}
      <div className="space-y-5">
        <div data-aos="flip-left">
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaBoxOpen className="mr-2 text-green-500" /> Name of Food Item:
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg shadow-md p-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter food item name"
              className="w-full outline-none bg-transparent"
            />
            <button onClick={handleVoiceInput} className="ml-2 text-green-600 hover:text-green-700">
              <FaMicrophone className="text-xl" />
            </button>
          </div>
        </div>

        <div data-aos="flip-left" data-aos-delay="100">
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaCalendarAlt className="mr-2 text-green-500" /> Manufacturing Date:
          </label>
          <input
            type="date"
            name="manufacturingDate"
            value={formData.manufacturingDate}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div data-aos="flip-left" data-aos-delay="200">
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaSortNumericUp className="mr-2 text-green-500" /> Quantity:
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div data-aos="flip-left" data-aos-delay="300">
          <label className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaCalendarTimes className="mr-2 text-green-500" /> Expiry Date:
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={handleAddFoodItem}
          className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 flex justify-center items-center text-xl"
          data-aos="flip-left" data-aos-delay="400"
        >
          Add Food Item <FaCheckCircle className="ml-2 text-white" />
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default FoodInventory;
