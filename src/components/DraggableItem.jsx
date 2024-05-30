import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        border: '1px solid gray',
        margin: '4px',
        cursor: 'move',
        backgroundColor: 'lightgrey',
      }}
    >
      {name}
    </div>
  );
};

export default DraggableItem;
