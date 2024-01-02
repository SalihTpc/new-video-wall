import type { CSSProperties, FC } from "react";
import { memo } from "react";
import { useDrop } from "react-dnd";
import ReactPlayer from "react-player";

const style: CSSProperties = {
  width: "20vw",
  aspectRatio: "16/9",
};

export interface DustbinProps {
  accept: string;
  lastDroppedItem: any;
  onDrop: (item: any) => void;
}

export const Box: FC<DustbinProps> = memo(function Box({
  accept,
  lastDroppedItem,
  onDrop,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    canDrop: () => !lastDroppedItem,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "#0369a1";
  } else if (canDrop) {
    backgroundColor = "darkgreen";
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      {lastDroppedItem && (
        <ReactPlayer
          url={lastDroppedItem.source}
          controls
          width="100%"
          height="100%"
          playing={true}
          volume={0.0}
        />
      )}
    </div>
  );
});
