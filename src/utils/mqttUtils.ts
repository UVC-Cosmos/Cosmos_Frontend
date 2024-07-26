import { WritableAtom } from 'jotai';

type AtomMap = { [key: string]: WritableAtom<string, [string], void> };

interface ParsedMessage {
  tagId: string;
  value: string;
}

type SetAtomFunctionMap = { [key: string]: (value: string) => void; };

export const updateAtoms = (
  parsedMessage: ParsedMessage[],
  previousData: { [key: string]: string },
  atomMap: AtomMap,
  setAtomMap: SetAtomFunctionMap
) => {
  parsedMessage.forEach((data) => {
    if (previousData[data.tagId] !== data.value && atomMap[data.tagId]) {
      console.log(data)
      setAtomMap[data.tagId](data.value);
    }
  });
};
