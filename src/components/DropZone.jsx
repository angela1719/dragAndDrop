import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, position, id }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'flower-part',
    drop: (item, monitor) => {
      const dropZoneRect = dropRef.current.getBoundingClientRect();
      const { x, y } = monitor.getClientOffset();

      if (x >= dropZoneRect.left && x <= dropZoneRect.right && y >= dropZoneRect.top && y <= dropZoneRect.bottom) {
        onDrop(item.name, id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dropRef = React.useRef(null);
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: '100px',
        height: '100px',
        border: '2px dashed gray',
        backgroundColor: isOver ? 'lightblue' : 'transparent',
      }}
    />
  );
};

export default DropZone;
