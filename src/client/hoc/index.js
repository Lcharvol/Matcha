import React from 'react';
import { identity, omit } from 'ramda';

export const propTransformer = (src, target, fn = identity) => Component => {
  const Transformer = props => {
    const newProps = { ...omit([src], props), [target]: fn(props[src]) };
    return <Component {...newProps} />;
  };

  return Transformer;
};