import React, { ReactNode } from "react";

interface SwitchCaseProps {
  case: string;
  children: ReactNode;
}

interface SwitchCaseItemProps {
  value: string;
  children: ReactNode;
}

export const SwitchCase: React.FC<SwitchCaseProps> = ({ case: currentCase, children }) => {
  const matchingCase = React.Children.toArray(children).find((child) => {
    if (React.isValidElement(child)) {
      return (child.props as SwitchCaseItemProps).value === currentCase;
    }
    return false;
  });

  return matchingCase && React.isValidElement(matchingCase) ? (matchingCase.props as SwitchCaseItemProps).children : null;
};

export const SwitchCaseItem: React.FC<SwitchCaseItemProps> = ({ children }) => {
  return <>{children}</>;
};
