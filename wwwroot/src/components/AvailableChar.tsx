import React from 'react';

export default function AvailableChar({ highlight, string }: { highlight: Boolean | null, string: string }): JSX.Element {
    return (
        <td style={{ backgroundColor: highlight !== null ? (highlight ? 'lightgreen' : 'lightpink') : '' }}>
            {string}
        </td>
    );
}
