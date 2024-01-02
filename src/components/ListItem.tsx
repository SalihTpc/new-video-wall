import type { CSSProperties, FC } from "react";
import { memo } from "react";
import { useDrag } from "react-dnd";
import { BoxState } from "./Container";

const style: CSSProperties = {
  backgroundColor: "#cbd5e1",
  padding: "0.5rem 1rem",
  listStyle: "none",
  marginBottom: "4px",
  borderRadius: "0.375rem",
};

export interface BoxProps {
  item: BoxState;
  type: string;
  isDropped: boolean;
  droppedBoxNames: string[];
}

export const ListItem: FC<BoxProps> = memo(function ListItem({
  item,
  type,
  isDropped,
  droppedBoxNames,
}) {
  const cursor = isDropped ? "not-allowed" : "move";

  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { item },
      canDrag: !isDropped && !droppedBoxNames.includes(item.label),
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [item.label, type, isDropped, droppedBoxNames]
  );

  return (
    <li ref={drag} style={{ ...style, opacity, cursor }} data-testid="box">
      {isDropped ? <s className="opacity-40">{item.label}</s> : item.label}
    </li>
  );
});
