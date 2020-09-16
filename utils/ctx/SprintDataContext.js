import { createContext } from 'react';
import PropTypes from 'prop-types';

export const SprintDataContext = createContext(null);

export const SprintDataProvider = ({
  children,
  user,
  currentSprint,
  tasks,
}) => (
  <SprintDataContext.Provider
    value={{
      user,
      currentSprint,
      tasks,
    }}
  >
    {children}
  </SprintDataContext.Provider>
);

SprintDataProvider.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
  currentSprint: PropTypes.object,
  tasks: PropTypes.object,
};
