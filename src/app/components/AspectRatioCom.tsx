import { AspectRatio } from '@/components/ui/aspect-ratio'
import React from 'react'

const AspectRatioCom = () => {
  return (
	<div className="w-[100px]">
    <AspectRatio ratio={16 / 16}>
	<img
		src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
		alt="A house in a forest"
		style={{
			objectFit: "cover",
			width: "100%",
			height: "100%",
			borderRadius: "50%",
		}}
	/>
</AspectRatio>
</div>
  )
}

export default AspectRatioCom