import React from 'react';
const post = () => (
  <div
    className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800"
    style={{ cursor: 'auto' }}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-light text-gray-600 dark:text-gray-400">
        Jan 15, 2022
      </span>
      <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
        JavaScript
      </a>
    </div>
    <div className="mt-2">
      <a
        href="https://stackdiary.com/"
        className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
      >
        How to sanitiz array() in JS
      </a>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Dui urna vehicula tincidunt pretium consequat luctus mi, platea
        fermentum conubia tempus ac orci. Pellentesque dictum malesuada cubilia
        faucibus dignissim mi nascetur senectus, augue ad libero efficitur dolor
        duis lobortis, non etiam sociosqu.
      </p>
    </div>
    <div className="flex items-center justify-between mt-4">
      <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
        Read more ⟶
      </a>
      <div className="flex items-center">
        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
          John Doe
        </a>
      </div>
    </div>
  </div>
);

export default post;
