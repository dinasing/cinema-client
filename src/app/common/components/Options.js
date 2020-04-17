import React from 'react';

export const Options = props => {
  const options = [];
  if (props.items)
    for (const item of props.items) {
      options.push(
        <option value={item.id} key={item.id}>
          {item.title}
        </option>
      );
    }
  return <>{options}</>;
};
