import { Router } from 'react-router';
import { useRecoilValue } from 'recoil';
import { errorState } from '../../utils/recoil/error';
import ErrorPage from './Empty';

interface ErrorCheckerProps {
  children: React.ReactNode;
}

export default function ErrorChecker({ children }: ErrorCheckerProps) {
  const error = useRecoilValue(errorState);

  return error === '' ? (
    <>{children}</>
  ) : (
    <div>
      <div>
        <ErrorPage />
      </div>
    </div>
  );
}
