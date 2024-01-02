import update from "immutability-helper";
import type { CSSProperties, FC } from "react";
import { memo, useCallback, useState } from "react";
import { Box } from "./Box";
import { ListItem } from "./ListItem";

const gridContainerStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
  gap: "2px",
  flex: 1,
};

interface DustbinState {
  accepts: string;
  lastDroppedItem: any;
}

export interface BoxState {
  id?: number;
  label: string;
  source?: string;
  type: string;
}

export interface DustbinSpec {
  accepts: string[];
  lastDroppedItem: any;
}
export interface BoxSpec {
  label: string;
  type: string;
}
export interface ContainerState {
  droppedBoxNames: string[];
  dustbins: DustbinSpec[];
  boxes: BoxSpec[];
}

const initialDustbins = [
  { row: 0, column: 0, accepts: "all", lastDroppedItem: null },
  { row: 0, column: 1, accepts: "all", lastDroppedItem: null },
  { row: 0, column: 2, accepts: "all", lastDroppedItem: null },
  { row: 0, column: 3, accepts: "all", lastDroppedItem: null },
  { row: 1, column: 0, accepts: "all", lastDroppedItem: null },
  { row: 1, column: 1, accepts: "all", lastDroppedItem: null },
  { row: 1, column: 2, accepts: "all", lastDroppedItem: null },
  { row: 1, column: 3, accepts: "all", lastDroppedItem: null },
  { row: 2, column: 0, accepts: "all", lastDroppedItem: null },
  { row: 2, column: 1, accepts: "all", lastDroppedItem: null },
  { row: 2, column: 2, accepts: "all", lastDroppedItem: null },
  { row: 2, column: 3, accepts: "all", lastDroppedItem: null },
  { row: 3, column: 0, accepts: "all", lastDroppedItem: null },
  { row: 3, column: 1, accepts: "all", lastDroppedItem: null },
  { row: 3, column: 2, accepts: "all", lastDroppedItem: null },
  { row: 3, column: 3, accepts: "all", lastDroppedItem: null },
];

const streamList = [
  {
    id: 1,
    label: "TRT 1",
    source: "https://tv-trt1.medya.trt.com.tr/master_720.m3u8",
    type: "all",
  },
  {
    id: 2,
    label: "TRT 2",
    source: "https://tv-trt2.medya.trt.com.tr/master_720.m3u8",
    type: "all",
  },
  {
    id: 3,
    label: "TRT Müzik",
    source: "https://tv-trtmuzik.medya.trt.com.tr/master_720.m3u8",
    type: "all",
  },
  {
    id: 4,
    label: "TRT Çocuk",
    source: "https://tv-trtcocuk.medya.trt.com.tr/master_720.m3u8",
    type: "all",
  },
  {
    id: 5,
    label: "TRT Haber",
    source: "https://tv-trthaber.medya.trt.com.tr/master_720.m3u8",
    type: "all",
  },
  {
    id: 6,
    label: "TRT Türk",
    source: "https://tv-trtturk.medya.trt.com.tr/master_720.m3u8",
    type: "all",
  },
  {
    id: 7,
    label: "TRT World",
    source: "https://tv-trtworld.medya.trt.com.tr/master_1080.m3u8",
    type: "all",
  },
  {
    id: 8,
    label: "Behzat Ç.",
    source: "https://www.youtube.com/watch?v=SFN8ie4ZMQ0",
    type: "all",
  },
  {
    id: 9,
    label: "NTV",
    source: "https://www.youtube.com/watch?v=XEJM4Hcgd3M",
    type: "all",
  },
  {
    id: 10,
    label: "Slow Türk",
    source: "https://www.youtube.com/watch?v=4TK4LrYpJys",
    type: "all",
  },
  {
    id: 11,
    label: "HaberTürk",
    source: "https://www.youtube.com/watch?v=2i8lfP9oqvk",
    type: "all",
  },
  {
    id: 12,
    label: "Kral Fm",
    source: "https://www.youtube.com/watch?v=A49bKX8gb-8",
    type: "all",
  },
  {
    id: 13,
    label: "Tgrt Haber",
    source: "https://www.youtube.com/watch?v=WThG3vdJUSc",
    type: "all",
  },
  {
    id: 14,
    label: "Haber Global",
    source: "https://www.youtube.com/watch?v=6BX-NUzBSp8",
    type: "all",
  },
  {
    id: 15,
    label: "A Haber",
    source: "https://www.youtube.com/watch?v=acwBho1oqcg",
    type: "all",
  },
  {
    id: 16,
    label: "Tv 100",
    source: "https://www.youtube.com/watch?v=YKIeEy_71QI",
    type: "all",
  },
  {
    id: 17,
    label: "Halk Tv",
    source: "https://www.youtube.com/watch?v=_FUlFVJo77I",
    type: "all",
  },

  // Diğer yayınlar...
];

export const Container: FC = memo(function Container() {
  const [dustbins, setDustbins] = useState<DustbinState[]>(initialDustbins);
  const [search, setSearch] = useState<string>("");
  const [boxes, setBoxes] = useState<BoxState[]>(streamList);
  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([]);

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = useCallback(
    (index: number, items: any) => {
      const { item } = items;
      setDroppedBoxNames(
        update(
          droppedBoxNames,
          item.label ? { $push: [item.label] } : { $push: [] }
        )
      );

      dustbins[index].lastDroppedItem == null &&
        setDustbins(
          update(dustbins, {
            [index]: {
              lastDroppedItem: {
                $set: item,
              },
            },
          })
        );
    },
    [droppedBoxNames, dustbins]
  );

  const handleSearch = (value: string) => {
    if (value) {
      setBoxes(
        boxes.filter((box) =>
          box.label.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setBoxes(streamList);
    }
    setSearch(value);
  };

  return (
    <div className="flex items-start justify-start gap-4 p-2">
      <div className="w-[15rem]">
        <input
          type="text"
          placeholder="Yayın Ara..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="outline-none border-none bg-sky-700 px-2 py-2 rounded-md mb-2 placeholder:text-white caret-white w-full"
        />
        <ul>
          {boxes.map((box, index) => (
            <ListItem
              droppedBoxNames={droppedBoxNames}
              item={box}
              type={box.type}
              isDropped={isDropped(box.label)}
              key={index}
            />
          ))}
        </ul>
      </div>
      <div style={{ ...gridContainerStyle }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Box
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
});
