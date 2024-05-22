import React from 'react'
import Image from 'next/image';

export default function Ad() {
  return (
    <div className="flex justify-center pt-5">
        <div className="relative w-[650px] h-[100px]">
            <Image 
                src="/images/b1.png" 
                alt="Person" 
                layout="fill" 
                objectFit="cover" 
            />
        </div>
    </div>
  )
}
