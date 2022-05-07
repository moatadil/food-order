import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true)
        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: JSON.stringify(requestConfig.body) ? JSON.stringify(requestConfig.body) : null
            }
            )
            if (!response.ok) {
                throw new Error('Request failed')
            }
            const data = await response.json()
            applyData(data)
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }, [])

    return {
        isLoading,
        error,
        sendRequest
    }
}
export default useHttp