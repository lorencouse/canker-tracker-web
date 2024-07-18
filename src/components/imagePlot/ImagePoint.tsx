// ImagePoint.tsx
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

import { useStageSize } from '../../hooks/useStageSize';
import {
  calculateCoordination,
  handleZoomStage,
  handleZoom,
  handleResetZoom,
} from '../../utilities/StageUtils';
import SoreCircle from '../SoreComponents/SoreCircle';
import { Button } from '../ui/button';
import { useUIContext } from '@/Context/UiContext';
import { deleteSore, saveSore } from '@/services/firestoreService';
import type { CankerSore } from '@/types';
import { calcView } from '@/utilities/ClickHandlers';

import ImagePlotButton from './ImagePlotButton';
import Images from './Images';

const ImagePoint: React.FC = () => {
  const { sores, setSores, selectedSore, setSelectedSore } = useUIContext();
  const [isGums, setIsGums] = useState<boolean>(false);
  const [image, setImage] = useState<string>('/assets/images/mouth.png');
  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width: stageWidth, height: stageHeight } = useStageSize(containerRef);
  const [originalSores, setOriginalSores] = useState<CankerSore[]>([]);
  const [mode, setMode] = useState<'add' | 'edit' | 'view'>('view');

  useEffect(() => {
    const jsonSores = JSON.parse(localStorage.getItem('sores') || '[]');
    if (jsonSores.length) {
      setSores(jsonSores);
    }
  }, []);

  const handleDragLabelCoordination = (e: any) => {
    if (mode === 'add' || mode === 'edit') {
      const { x, y } = calculateCoordination(e);
      const id = e.target.id() || e.target.findAncestor('Label')?.attrs.id;
      const updatedSores = sores.map((sore) =>
        sore.id === id ? { ...sore, x, y } : sore
      );

      setSores(updatedSores);
      setSelectedSore(updatedSores.find((sore) => sore.id === id));
    }
  };

  const handleClickLabel = (e: any) => {
    const id = e.target.id() || e.target.findAncestor('Label')?.attrs.id;
    setSelectedSore(sores.find((sore) => sore.id === id));
  };

  const handleClickImage = (e: any) => {
    if (mode === 'add') {
      const { x, y } = calculateCoordination(e);
      const newSore: CankerSore = {
        id: uuidv4(),
        updated: [new Date()],
        zone: calcView(x, y),
        gums: isGums,
        size: [3],
        pain: [3],
        x,
        y,
      };

      const newSores = [...sores, newSore];
      setSores(newSores);
      setSelectedSore(newSore);
      localStorage.setItem('sores', JSON.stringify(newSores));
      saveSore('sores', newSore);
    }
  };

  const handleCancel = () => {
    setMode('view');
    setSores(originalSores);
    setSelectedSore(null);
  };

  const handleUpdate = async () => {
    setMode('view');
    await Promise.all(
      sores.map((sore) => saveData('activesores', sore.id, sore))
    );
    setOriginalSores(sores);
  };

  const handleFinishAdd = async () => {
    const newSores = sores.filter(
      (sore) => !originalSores.some((origSore) => origSore.id === sore.id)
    );
    await Promise.all(newSores.map((sore) => saveSore('activesores', sore)));
    setMode('view');
    setOriginalSores(sores);
  };

  const handleDeleteButton = () => {
    const updatedSores = sores.filter((s) => s.id !== selectedSore.id);
    setSores(updatedSores);
    setSelectedSore(null);
    localStorage.setItem('sores', JSON.stringify(updatedSores));
    deleteSore(selectedSore.id);
  };

  const handleToggleGums = () => {
    const newIsGums = !isGums;
    setIsGums(newIsGums);
    setImage(
      newIsGums ? '/assets/images/gums.png' : '/assets/images/mouth.png'
    );
  };

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <Stage
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        width={stageWidth}
        height={stageHeight}
        draggable
        onWheel={handleZoomStage(stageRef)}
        ref={stageRef}
      >
        <Layer>
          <Group>
            <Images
              img={image}
              handleClickImage={handleClickImage}
              stageWidth={stageWidth}
              stageHeight={stageHeight}
            />
            {sores.map((sore) => (
              <SoreCircle
                key={sore.id}
                sore={sore}
                handleClickLabel={handleClickLabel}
                handleDragLabelCoordination={handleDragLabelCoordination}
              />
            ))}
          </Group>
        </Layer>
      </Stage>
      <div className="absolute right-0 top-0 flex flex-col gap-2">
        <ImagePlotButton onClick={() => handleZoom(stageRef, 1.25)} label="+" />
        <ImagePlotButton onClick={() => handleZoom(stageRef, 0.75)} label="-" />
      </div>
      <div className="absolute bottom-0 left-0 z-10 flex w-full flex-row justify-between">
        {selectedSore && (
          <ImagePlotButton onClick={handleDeleteButton} label="Delete" />
        )}
      </div>
      <div className="zoom-buttons absolute bottom-0 right-0 z-10 flex flex-row">
        <ImagePlotButton
          onClick={() => handleResetZoom(stageRef)}
          label="Reset"
        />
      </div>
      <div className="zoom-buttons absolute left-0 top-0 z-10 flex flex-row">
        <ImagePlotButton
          onClick={handleToggleGums}
          label={isGums ? 'Mouth' : 'Gums'}
        />
      </div>
      <div className="absolute bottom-0 left-1/2 z-20 my-2 flex -translate-x-1/2 transform flex-row justify-center gap-4">
        {' '}
        {/* Ensure buttons are centered and visible */}
        {mode === 'view' && (
          <>
            <Button
              onClick={() => {
                setMode('add');
                setOriginalSores(sores);
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => {
                setMode('edit');
                setOriginalSores(sores);
              }}
            >
              Edit
            </Button>
          </>
        )}
        {mode !== 'view' && <Button onClick={handleCancel}>Cancel</Button>}
        {mode === 'edit' && <Button onClick={handleUpdate}>Update</Button>}
        {mode === 'add' && <Button onClick={handleFinishAdd}>Finish</Button>}
      </div>
    </div>
  );
};

export default ImagePoint;
