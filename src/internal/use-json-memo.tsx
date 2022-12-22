import { useMemo } from 'react';

const useJsonMemo = <TValue,>(value: TValue): TValue => {
  const json = value == null ? (value as null | undefined) : JSON.stringify(value);
  return useMemo(() => (json == null ? json : JSON.parse(json)) as TValue, [json]);
};

export { useJsonMemo };
