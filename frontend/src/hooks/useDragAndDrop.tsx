import { useState } from 'react';

/**
 *
 * @param columns
 * @returns
 */
export const useDragAndDrop = (columns: any) => {
  const DATATRANSFERID = 'colIdx';

  const [dragover, setDragOver] = useState('');

  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    const { id } = e.target as HTMLElement;
    const idx = columns?.findIndex((c: any) => c.Header === id);
    e.dataTransfer.setData(DATATRANSFERID, idx);
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };
  const onDragEnter = (e: React.DragEvent<HTMLElement>) => {
    const { id } = e.target as HTMLElement;
    setDragOver(id);
  };

  const onDrop = (e: React.DragEvent<HTMLElement>) => {
    const { id } = e.target as HTMLElement;
    const droppedColIdx: number = columns?.findIndex(
      (c: any) => c.Header === id,
    );
    const draggedColIdx: number = Number(
      e.dataTransfer.getData(DATATRANSFERID),
    );
    if (columns) {
      const tempCols = [...columns];
      [tempCols[draggedColIdx], tempCols[droppedColIdx]] = [
        columns[droppedColIdx],
        columns[draggedColIdx],
      ];

      setDragOver('');
      return tempCols;
    }
    return columns;
  };

  return {
    onDragEnter,
    onDragOver,
    onDragStart,
    onDrop,
    dragover,
  };
};
