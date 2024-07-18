// stageUtils.ts
import Konva from 'konva';

export const calculateCoordination = (e: any) => {
  const stage = e.target.getStage();
  const pointerPosition = stage.getPointerPosition();
  const offset = { x: stage.x(), y: stage.y() };

  const imageClickX = (pointerPosition.x - offset.x) * (1 / stage.scaleX());
  const imageClickY = (pointerPosition.y - offset.y) * (1 / stage.scaleX());

  return { x: imageClickX, y: imageClickY };
};

export const handleZoomStage =
  (stageRef: React.RefObject<Konva.Stage>, scaleBy: number = 1.02) =>
  (event: any) => {
    event.evt.preventDefault();
    if (stageRef.current) {
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

export const handleZoom = (
  stageRef: React.RefObject<Konva.Stage>,
  zoom: number
) => {
  if (stageRef.current) {
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const newScale = oldScale * zoom;

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

export const handleResetZoom = (stageRef: React.RefObject<Konva.Stage>) => {
  if (stageRef.current) {
    const stage = stageRef.current;
    stage.scale({ x: 1, y: 1 });
    stage.position({ x: 0, y: 0 });
    stage.batchDraw();
  }
};
