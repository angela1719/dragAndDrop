// src/components/Slide.jsx
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
      }}
    >
      {name}
    </div>
  );
};

const DropZone = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        minHeight: '50px',
        padding: '8px',
        border: '2px dashed gray',
        backgroundColor: isOver ? 'lightblue' : 'white',
      }}
    >
      {children}
    </div>
  );
};

const Slide = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div>
      <h1>Curso Virtual: Actividad de Arrastrar y Soltar</h1>
      <p>Arrastra los elementos a la zona de destino.</p>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div>
            <DraggableItem name="Elemento 1" type="ITEM" />
            <DraggableItem name="Elemento 2" type="ITEM" />
            <DraggableItem name="Elemento 3" type="ITEM" />
          </div>
          <DropZone onDrop={handleDrop}>
            {droppedItems.map((item, index) => (
              <div key={index}>{item.name}</div>
            ))}
          </DropZone>
        </div>
      </DndProvider>
    </div>
  );
};

export default Slide;
