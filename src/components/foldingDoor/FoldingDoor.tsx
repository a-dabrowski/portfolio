import React from 'react';
import './FoldingDoor.css';

interface FoldingDoorProps {
  title: string;
  description: string;
  image: string;
}

const FoldingDoor = ({ title, description, image }: FoldingDoorProps) => {
  return (
    <div
      className="folding-door"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h2 className="folding-door__title">{title}</h2>
      <p className="folding-door__desc">{description}</p>
    </div>
  );
};

export default FoldingDoor;
