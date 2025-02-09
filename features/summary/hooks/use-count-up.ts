import { useState, useEffect } from 'react'

export function useCountUp(end: number, duration: number = 2000) {
	const [count, setCount] = useState(0)

	useEffect(() => {
		let startTime: number | null = null
		const animateCount = (timestamp: number) => {
			if (!startTime) startTime = timestamp
			const progress = Math.min((timestamp - startTime) / duration, 1)
			setCount(progress * end)
			if (progress < 1) {
				requestAnimationFrame(animateCount)
			}
		}
		requestAnimationFrame(animateCount)
	}, [end, duration])

	return count
}
