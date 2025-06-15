'use client';

import React, { useState } from 'react';
import AccuWeatherCurrentComponent from '../components/AccuWeatherCurrentComponent';

export default function Page() {
  const [address, setAddress] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddress(inputValue);
  };

  return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="주소를 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          검색
        </button>
      </form>

      {address && <AccuWeatherCurrentComponent address={address} />}
    </div>
  );
}
