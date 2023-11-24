// eslint-disable-next-line import/no-extraneous-dependencies
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';

import type { IResponse } from '@/models/data';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [hotCoffe, setHotCoffe] = useState<IResponse[]>([]);
  const [coldCoffe, setColdCoffe] = useState<IResponse[]>([]);

  const [selected, setSelected] = useState('hot');

  useEffect(() => {
    fetch('https://api.sampleapis.com/coffee/hot')
      .then((res) => res.json())
      .then((res) => {
        setHotCoffe(res);
      });

    fetch('https://api.sampleapis.com/coffee/iced')
      .then((res) => res.json())
      .then((res) => {
        setColdCoffe(res);
      });
  }, []);

  return (
    <div className="bg-gradient-to-tl from-teal-300 via-gray-500 to-pink-800">
      <div className="mx-auto flex max-w-7xl flex-col content-center items-center px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-2 gap-2 pt-12">
          <button
            className={`rounded-md ${
              selected === 'hot' ? 'bg-red-500' : 'bg-red-300'
            } px-12 py-2 font-semibold text-white transition-colors duration-300 hover:bg-red-400`}
            type="button"
            onClick={() => setSelected('hot')}
          >
            Hot
          </button>
          <button
            className={`rounded-md ${
              selected === 'cold' ? 'bg-blue-500' : 'bg-blue-300'
            } px-12 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-400`}
            type="button"
            onClick={() => setSelected('cold')}
          >
            Cold
          </button>
        </div>

        <div className="mb-16 mt-12 grid  grid-cols-2  items-center gap-8 pt-12">
          {map(selected === 'hot' ? hotCoffe : coldCoffe, (coffe) => (
            <div className="flex h-full flex-col rounded-md border transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <span className="mt-4 flex justify-center text-3xl">
                {coffe.title}
              </span>
              <span className="flex justify-center">
                <img
                  className="m-6 h-48 w-full rounded-md object-cover"
                  alt={coffe.title}
                  src={coffe.image}
                  onError={(e: any) => {
                    e.target.src = 'https://via.placeholder.com/250';
                  }}
                />
              </span>
              <div className="m-4 h-20 ">
                <p>{coffe.description}</p>
              </div>
              <hr className="mx-2 bg-teal-400" />
              <span className="m-4 flex flex-row  justify-center gap-3">
                {map(coffe.ingredients, (ingredient) => (
                  <span className=" inline-flex items-center rounded-full bg-transparent px-2 py-1 font-medium text-slate-700 ring-2 ring-inset ring-slate-600/20">
                    {ingredient}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Example;
