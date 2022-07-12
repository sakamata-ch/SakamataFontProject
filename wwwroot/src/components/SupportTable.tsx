import AvailableChar from "./AvailableChar";
import React from 'react';

type Props = {
  table: string[][],
  chars: string[],
}

export default function Nav({ table, chars }: Props): JSX.Element {
  return (
    <table>
      <tbody>
        {table.map(i =>
          <tr key={i.toString()}>
            {i.map(j =>
              <AvailableChar highlight={j !== '' ? chars.includes(j) : null} string={j} key={i.toString() + '|' + j.toString()} />
            )}
          </tr>)
        }
      </tbody>
    </table>
  );
}
