import React from 'react';
import { Button } from './buttons';
import { Typography } from './typography';

const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-red flex flex-col justify-center items-center px-4">
      <Typography as="h1">Hello</Typography>
      <h2>Adam Dąbrowski</h2>
      <p>Jest w pytkę</p>
      <Button variant="elevated-1">Sprawdź to</Button>
    </div>
  );
};

export default Hero;
