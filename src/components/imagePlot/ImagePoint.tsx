import type React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Stage, Layer, Group, Label, Circle, Text } from 'react-konva';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Images from './Images';

interface Coord {
  x: number;
  y: number;
}

interface CirclePointListProps {
  label: number;
  toggleCheckboxHandler: (label: number) => () => void;
  deleteCircleList: number[];
}

const CirclePointList: React.FC<CirclePointListProps> = ({
  label,
  toggleCheckboxHandler,
  deleteCircleList,
}) => (
  <li style={{ listStyleType: 'none' }}>
    <input
      type="checkbox"
      style={{ marginRight: '15px' }}
      onChange={toggleCheckboxHandler(label)}
      checked={deleteCircleList.indexOf(label) > -1}
    />
    Circle Point {label}
  </li>
);

const ImagePoint: React.FC = () => {
  const [image] = useState<string>('/assets/images/mouth.png');
  const [circleList, setCircleList] = useState<React.ReactNode[]>([]);
  const stageRef = useRef<any>(null);
  const [stageWidth, setStageWidth] = useState<number>(0);
  const [stageHeight, setStageHeight] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteCircleList, setDeleteCircleList] = useState<number[]>([]);
  const [imageClickCoordList, setImageClickCoordList] = useState<Coord[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  // const maxZoom = 2.5;
  // const minZoom = 0.75;

  useEffect(() => {
    const jsonImageClickCoordList = JSON.parse(
      localStorage.getItem('imageClickCoordList') || '[]'
    );
    if (jsonImageClickCoordList.length) {
      circleListAfterDeleteReload(jsonImageClickCoordList);
    }
  }, []);

  const circleListAfterDeleteReload = useCallback(
    (imageClickCoordList: Coord[]) => {
      const circleListTemp = imageClickCoordList.map((cur, index) => (
        <Label
          key={index + 1}
          id={`${index + 1}`}
          x={cur.x}
          y={cur.y}
          draggable
          onClick={handleClickLabel}
          onDragEnd={handleDragLabelCoordination}
        >
          <Circle width={25} height={25} fill="red" shadowBlur={5} />
          <Text text={(index + 1).toString()} offsetX={3} offsetY={3} />
        </Label>
      ));
      setCircleList([...circleListTemp]);
      setImageClickCoordList([...imageClickCoordList]);
      localStorage.setItem(
        'imageClickCoordList',
        JSON.stringify([...imageClickCoordList])
      );
    },
    []
  );

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

    let id = 0;
    const nodes = e.target.findAncestors('Label', true);
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        id = nodes[i].getAttr('id');
      }
    } else {
      id = parseInt(e.target.id());
    }

    const updatedImageClickCoordList = [...imageClickCoordList];
    updatedImageClickCoordList[id - 1] = { x, y };
    setImageClickCoordList(updatedImageClickCoordList);
    localStorage.setItem(
      'imageClickCoordList',
      JSON.stringify(updatedImageClickCoordList)
    );
  };

  const handleClickImage = (e: any) => {
    const { x, y } = calculateCoordination(e);

    const newImageClickCoordList = [...imageClickCoordList, { x, y }];
    setImageClickCoordList(newImageClickCoordList);

    const newCircleList = [
      ...circleList,
      <Label
        key={newImageClickCoordList.length}
        id={`${newImageClickCoordList.length}`}
        x={x}
        y={y}
        draggable
        onClick={handleClickLabel}
        onDragEnd={handleDragLabelCoordination}
      >
        <Circle width={25} height={25} fill="red" shadowBlur={5} />
        <Text
          text={newImageClickCoordList.length.toString()}
          offsetX={3}
          offsetY={3}
        />
      </Label>,
    ];
    setCircleList(newCircleList);
    localStorage.setItem(
      'imageClickCoordList',
      JSON.stringify(newImageClickCoordList)
    );
  };

  const handleClickLabel = (e: any) => {
    console.log('click label haha');
    console.log(e);
  };

  const confirmDelete = () => {
    setDeleteCircleList([]);
    modalToggle();
  };

  const confirmModalCircleDelete = () => {
    const updatedImageClickCoordList = [...imageClickCoordList];
    deleteCircleList.forEach((deleteCircle) => {
      const deleteCircleIndex = deleteCircle - 1;
      updatedImageClickCoordList.splice(deleteCircleIndex, 1);
    });
    circleListAfterDeleteReload(updatedImageClickCoordList);
    modalToggle();
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

  const modalToggle = () => {
    setShowModal(!showModal);
  };

  const toggleCheckboxHandler = (delete_circle: number) => () => {
    const index = deleteCircleList.indexOf(delete_circle);
    if (index > -1) {
      setDeleteCircleList(deleteCircleList.filter((_, i) => i !== index));
    } else {
      setDeleteCircleList([...deleteCircleList, delete_circle]);
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
            {circleList.length > 0 && circleList.map((curCircle) => curCircle)}
          </Group>
        </Layer>
      </Stage>
      <button
        onClick={confirmDelete}
        style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 1 }}
      >
        Delete
      </button>

      <Modal isOpen={showModal} toggle={modalToggle}>
        <ModalHeader toggle={modalToggle}>Delete Circle Point</ModalHeader>
        <ModalBody>
          <ul>
            {circleList.map((cur, index) => (
              <CirclePointList
                key={index}
                label={index + 1}
                toggleCheckboxHandler={toggleCheckboxHandler}
                deleteCircleList={deleteCircleList}
              />
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmModalCircleDelete}>
            Delete
          </Button>{' '}
          <Button color="secondary" onClick={modalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ImagePoint;
