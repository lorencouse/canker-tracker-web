import Konva from 'konva';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

import SoreCircle from '../SoreComponents/SoreCircle';
import { useUIContext } from '@/Context/UiContext';
import type { CankerSore } from '@/types';
import { calcView } from '@/utilities/ClickHandlers';

import ImagePlotButton from './ImagePlotButton';
import Images from './Images';

const ImagePoint: React.FC = () => {
  const { sores, setSores, selectedSore, setSelectedSore } = useUIContext();
  const [isGums, setIsGums] = useState<boolean>(false);
  const [image, setImage] = useState<string>('/assets/images/mouth.png');
  const stageRef = useRef<any>(null);
  const [stageWidth, setStageWidth] = useState<number>(0);
  const [stageHeight, setStageHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const jsonSores = JSON.parse(localStorage.getItem('sores') || '[]');
    if (jsonSores.length) {
      setSores(jsonSores);
    }
  }, []);

  const calculateCoordination = (e: any) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const offset = { x: stage.x(), y: stage.y() };

    const imageClickX = (pointerPosition.x - offset.x) * (1 / stage.scaleX());
    const imageClickY = (pointerPosition.y - offset.y) * (1 / stage.scaleX());

    return { x: imageClickX, y: imageClickY };
  };

  const handleDragLabelCoordination = (e: any) => {
    const { x, y } = calculateCoordination(e);

    let id = '';
    const nodes = e.target.findAncestors('Label', true);
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        id = nodes[i].getAttr('id');
      }
    } else {
      id = e.target.id();
    }
    const updatedSores = sores.map((sore) =>
      sore.id === id ? { ...sore, x, y } : sore
    );

    setSores(updatedSores);
    setSelectedSore(updatedSores.find((sore) => sore.id === id));
  };

  const handleClickLabel = (e: any) => {
    let id = '';
    const nodes = e.target.findAncestors('Label', true);
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        id = nodes[i].getAttr('id');
      }
    } else {
      id = e.target.id();
    }

    setSelectedSore(sores.find((sore) => sore.id === id));
  };

  const handleClickImage = (e: any) => {
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
  };

  const handleDeleteButton = () => {
    const updatedSores = sores.filter((s) => s.id !== selectedSore.id);
    setSores(updatedSores);
    setSelectedSore(null);
  };

  const handleToggleGums = () => {
    const newIsGums = !isGums;
    setIsGums(newIsGums);
    setImage(
      newIsGums ? '/assets/images/gums.png' : '/assets/images/mouth.png'
    );
  };

  const handleZoomStage = (event: any) => {
    const scaleBy = 1.02;
    event.evt.preventDefault();
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale =
        event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    }
  };

  const handleZoom = (zoom: number) => {
    const scaleBy = zoom;
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      const oldScale = stage.scaleX();
      const newScale = oldScale * scaleBy;

      const center = {
        x: stage.width() / 2,
        y: stage.height() / 2,
      };

      const newPos = {
        x: center.x - (center.x - stage.x()) * (newScale / oldScale),
        y: center.y - (center.y - stage.y()) * (newScale / oldScale),
      };

      new Konva.Tween({
        node: stage,
        duration: 0.3,
        scaleX: newScale,
        scaleY: newScale,
        x: newPos.x,
        y: newPos.y,
        easing: Konva.Easings.EaseInOut,
      }).play();
    }
  };

  const handleResetZoom = () => {
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      stage.scale({ x: 1, y: 1 });
      stage.position({ x: 0, y: 0 });
      stage.batchDraw();
    }
  };

  useEffect(() => {
    const updateStageSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        setStageWidth(containerWidth);
        setStageHeight(containerHeight);
      }
    };

    updateStageSize(); // Set initial size
    window.addEventListener('resize', updateStageSize);

    return () => {
      window.removeEventListener('resize', updateStageSize);
    };
  }, []);

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
        onWheel={handleZoomStage}
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
            {sores.length > 0 &&
              sores.map((sore) => (
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
        <ImagePlotButton onClick={() => handleZoom(1.25)} label="+" />
        <ImagePlotButton onClick={() => handleZoom(0.75)} label="-" />
      </div>
      <div className="absolute bottom-0 left-0 z-10 flex w-full flex-row justify-between">
        {selectedSore && (
          <ImagePlotButton onClick={handleDeleteButton} label="Delete" />
        )}
      </div>
      <div className="zoom-buttons absolute bottom-0 right-0 z-10 flex flex-row">
        <ImagePlotButton onClick={handleResetZoom} label="Reset" />
      </div>
      <div className="zoom-buttons absolute left-0 top-0 z-10 flex flex-row">
        <ImagePlotButton
          onClick={handleToggleGums}
          label={isGums ? 'Mouth' : 'Gums'}
        />
      </div>
    </div>
  );
};

export default ImagePoint;
