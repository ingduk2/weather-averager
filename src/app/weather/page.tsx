'use client';

import React, { useState } from 'react';
import AccuWeatherCurrentComponent from '../components/AccuWeatherCurrentComponent';
import KmaWeatherCurrentComponent from '../components/KmaWeatherCurrentComponent';
import OpenWeatherCurrentComponent from '../components/OpenWeatherCurrentComponent';

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

      {address && (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', marginTop: '1rem' }}>
          <AccuWeatherCurrentComponent address={address} />
          <KmaWeatherCurrentComponent address={address} />
          <OpenWeatherCurrentComponent address={address} />
        </div>
      )}
    </div>
  );
}
