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
  handlePinchZoom,
} from '../../utilities/StageUtils';
import SoreCircle from '../SoreComponents/SoreCircle';
import { useUIContext } from '@/Context/UiContext';
import { deleteSore, loadSores, saveSores } from '@/services/firestoreService';
import type { CankerSore } from '@/types';
import { calcView } from '@/utilities/ClickHandlers';

import ImagePlotButton from './ImagePlotButton';
import Images from './Images';

const ImagePoint: React.FC = ({
  mode,
  setMode,
}: {
  mode: 'add' | 'edit' | 'view';
  setMode: React.Dispatch<React.SetStateAction<'add' | 'edit' | 'view'>>;
}) => {
  const { sores, setSores, selectedSore, setSelectedSore } = useUIContext();
  const [isGums, setIsGums] = useState<boolean>(false);
  const [image, setImage] = useState<string>('/assets/images/mouth.png');
  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width: stageWidth, height: stageHeight } = useStageSize(containerRef);
  const [originalSores, setOriginalSores] = useState<CankerSore[]>([]);

  useEffect(() => {
    const fetchSores = async () => {
      const activeSores = await loadSores('activesores');
      setSores(activeSores);
    };

    fetchSores();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (stageRef.current) {
        stageRef.current.width(containerRef.current?.clientWidth || 0);
        stageRef.current.height(containerRef.current?.clientHeight || 0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const stage = stageRef.current;
    if (stage) {
      stage.on('touchmove', handleTouchMove);
    }

    return () => {
      if (stage) {
        stage.off('touchmove', handleTouchMove);
      }
    };
  }, []);

  const handleDragLabelCoordination = (
    e: React.MouseEvent<HTMLGroupElement>
  ) => {
    if (mode === 'add' || mode === 'edit') {
      const { x, y } = calculateCoordination(e);
      const id = e.target.id() || e.target.findAncestor('Group')?.attrs.id;
      const updatedSores = sores.map((sore) =>
        sore.id === id ? { ...sore, x, y } : sore
      );

      setSores(updatedSores);
      setSelectedSore(updatedSores.find((sore) => sore.id === id));
    }
  };

  const handleClickLabel = (e: React.MouseEvent<HTMLGroupElement>) => {
    const id = e.target.id() || e.target.findAncestor('Group')?.attrs.id;
    setSelectedSore(sores.find((sore) => sore.id === id));
  };

  const handleClickImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const { x, y } = calculateCoordination(e);

    if (mode === 'add') {
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
    } else if (mode === 'edit' || mode === 'view') {
      // Find the nearest sore
      const nearestSore = sores.reduce((nearest, current) => {
        const distanceToCurrent = Math.sqrt(
          (current.x - x) ** 2 + (current.y - y) ** 2
        );
        const distanceToNearest = Math.sqrt(
          (nearest.x - x) ** 2 + (nearest.y - y) ** 2
        );
        return distanceToCurrent < distanceToNearest ? current : nearest;
      }, sores[0]);

      setSelectedSore(nearestSore);
    }
  };

  const handleCancel = () => {
    handleResetZoom(stageRef);
    setMode('view');
    setSores(originalSores);
    setSelectedSore(null);
  };

  const handleFinishAdd = async () => {
    localStorage.setItem('activesores', JSON.stringify(sores));
    setMode('view');
    saveSores(sores);
    setSelectedSore(null);
  };

  const handleDeleteButton = () => {
    const updatedSores = sores.filter((s) => s.id !== selectedSore.id);
    setSores(updatedSores);
    setSelectedSore(null);
    localStorage.setItem('activesores', JSON.stringify(updatedSores));
    deleteSore('activesores', selectedSore.id);
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
      className="border-1 border-grey relative h-full w-full rounded-2xl"
      style={{ height: '0', paddingBottom: '100%', position: 'relative' }}
    >
      <Stage
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        width={stageWidth}
        height={stageHeight}
        draggable
        onWheel={(e) => {
          if (window.innerWidth > 768) {
            // Disable on small screens
            handleZoomStage(stageRef)(e);
          }
        }}
        ref={stageRef}
        onTouchMove={(e) => {
          if (window.innerWidth <= 768 && e.evt.touches.length === 2) {
            handlePinchZoom(stageRef)(e);
          }
        }}
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
                mode={mode}
                handleClickLabel={handleClickLabel}
                handleDragLabelCoordination={handleDragLabelCoordination}
                stageWidth={stageWidth}
                stageHeight={stageHeight}
              />
            ))}
          </Group>
        </Layer>
      </Stage>
      <div className="absolute right-0 top-0 flex flex-col">
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
      <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 transform flex-row justify-center gap-2">
        {mode === 'view' && (
          <>
            <ImagePlotButton
              onClick={() => {
                setMode('add');
                setSelectedSore(null);
                setOriginalSores(sores);
              }}
              label="Add"
            />
            {sores.length > 0 && selectedSore && (
              <ImagePlotButton
                onClick={() => {
                  setMode('edit');
                  setOriginalSores(sores);
                }}
                label="Edit"
              />
            )}
          </>
        )}
        {mode !== 'view' && (
          <>
            <ImagePlotButton onClick={handleCancel} label="Cancel" />

            <ImagePlotButton onClick={handleFinishAdd} label="Finish" />
          </>
        )}
      </div>
    </div>
  );
};

export default ImagePoint;
