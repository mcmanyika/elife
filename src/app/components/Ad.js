import React from 'react'
import Image from 'next/image';

export default function Ad() {
  return (
    <div className="flex justify-center p-5">
        <div className="relative w-[360px] h-[60px] md:w-[650px] md:h-[100px]">
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
