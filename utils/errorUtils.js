import ErrorHandler from '@components/ErrorHandler';

export function useErrorHandler(error) {
    if (error) {
        return <ErrorHandler error={error} />;
    }
    return null;
}