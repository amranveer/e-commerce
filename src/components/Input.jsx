import React from 'react'

const Input = ({icon:Icon,...props}) => {
  return (
    <div className='relative mt-4' >
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-event-none' >
            <Icon
            className="size-5 text-white" 
            />
        </div>
        <input {...props} 
        className='w-full peer pl-10 pr-3 py-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 focus:border-gray-400 focus:ring-1 focus-ring-gray-400 text-white placeholder-gray-100 transition duration-200 '

        />
    </div>
  )
}

export default Input;