import React from 'react';

export const Options = props => {
  const options = [];
  if (props.items) {
    options = items.map(item => (
      <option value={item.id} key={item.id}>
        {item.title}
      </option>
    ));
  }
  return <>{options}</>;
};
