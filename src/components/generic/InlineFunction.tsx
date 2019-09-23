import React from "react";

export const InlineFunction = (props: { callback: () => JSX.Element }) => {
  return props.callback();
};
