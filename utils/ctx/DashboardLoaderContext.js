import { createContext } from 'react';
import PropTypes from 'prop-types';

export const DashboardLoaderContext = createContext(null);

export const DashboardLoaderProvider = ({ children, setSpinner }) => (
  <DashboardLoaderContext.Provider
    value={{
      setSpinner,
    }}
  >
    {children}
  </DashboardLoaderContext.Provider>
);

DashboardLoaderProvider.propTypes = {
  children: PropTypes.node,
  setSpinner: PropTypes.func,
};
