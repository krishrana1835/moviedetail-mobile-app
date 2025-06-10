import { useEffect, useState } from "react"
import { fetchPopularMovies } from "./api"

const useFetch = <T>(FetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try{
            setLoading(true)
            setError(null)

            const results = await FetchFunction()
            setData(results)
        }catch(error){
            setError("Error in fetching data")
        }finally{
            setLoading(false)
        }
    }

    const reset = () => {
        setData(null)
        setError(null)
        setLoading(false)
    }

    useEffect(() => {
        if(autoFetch){
            fetchData()
        }
    }, [])

    return {data, loading, error, refetch: fetchData, reset}
}

export default useFetch;