import { act } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { renderWithRouter } from './__test.js';
import { Route, Routes, useRouteMatch } from './index.js';

const Pattern = () => {
  const match = useRouteMatch();
  return <>{`(${match?.pattern ?? ''})`}</>;
};

const Param = (props: { name: string }) => {
  const match = useRouteMatch();
  return <>{`[${match?.params[props.name]}]`}</>;
};

const Test = () => {
  return (
    <div data-testid={'test'}>
      <Route>
        <Pattern />
      </Route>
      <Route path={'a'}>
        <Pattern />
      </Route>
      <Route path={'/a/*'}>
        <Pattern />
        <Param name={'*'} />
        <Route path={'b'}>
          <Pattern />
        </Route>
      </Route>
      <Route path={'/a/:1/:2'}>
        <Pattern />
        <Param name={'1'} />
        <Param name={'2'} />
      </Route>
      <Routes>
        Routes
        <Route path={'/a/b'}>
          <Pattern />
        </Route>
        <Route path={'/a/*'}>
          <Pattern />
        </Route>
        <Route>
          <Pattern />
        </Route>
      </Routes>
    </div>
  );
};

describe('Route', () => {
  const cases: [string, string][] = [
    // URL, Expected
    ['/a', '(/*)(/a)Routes(/*)'],
    ['/a/b', '(/*)(/a/*)[b](/a/b)Routes(/a/b)'],
    ['/a/b/c', '(/*)(/a/*)[b/c](/a/:1/:2)[b][c]Routes(/a/*)'],
  ];

  cases.forEach(([url, expected]) => {
    test(url, async () => {
      const { container, router } = renderWithRouter(<Test />);
      await act(() => router.go(url));
      expect(container.querySelector('[data-testid="test"]')?.textContent).toBe(expected);
    });
  });
});
