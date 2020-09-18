import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Spinner, { FullSpinnerWrapper } from '@components/Spinner';

const PageLoader = ({ externalSpinner }) => {
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', e => {
      if (router.asPath !== e) {
        setSpinner(true);
      }
    });

    return () => {
      router.events.off('routeChangeStart', () => setSpinner(true));
    };
  }, []);

  return (
    <>
      {(externalSpinner || spinner) && (
        <FullSpinnerWrapper>
          <Spinner />
        </FullSpinnerWrapper>
      )}
    </>
  );
};

export default PageLoader;

PageLoader.propTypes = {
  externalSpinner: PropTypes.bool,
};
