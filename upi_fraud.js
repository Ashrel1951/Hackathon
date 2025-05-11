import React, { useState } from "react";

const TestingPage = () => {
  const [formData, setFormData] = useState({
    upiNumber: "",
    holderName: "",
    dob: "",
    pinCode: "",
    state: "",
    transactionAmount: "",
    sellerName: "",
    merchantCategory: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setPrediction(result.prediction);
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">UPI Fraud Detection</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        {Object.keys(formData).map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-sm font-semibold">{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        ))}

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          Click to Detect
        </button>
      </form>

      {prediction && (
        <div className="mt-4 p-4 bg-green-200 text-green-700 rounded-lg shadow-lg">
          <strong>Prediction:</strong> {prediction}
        </div>
      )}
    </div>
  );
};

export default TestingPage;