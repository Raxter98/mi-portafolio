import React, { useState, useEffect } from 'react'

const Switcher= () => {
  const [isChecked, setIsChecked] = useState(true)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    if (isChecked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isChecked]);

  useEffect(() => {
    // Cambiar el color de fondo y texto del body según el tema
    if (isChecked) {
      document.body.style.backgroundColor = 'var(--background-dark)';
      document.body.style.color = 'var(--foreground-dark)';
    } else {
      document.body.style.backgroundColor = 'var(--background-light)';
      document.body.style.color = 'var(--foreground-light)';
    }
  }, [isChecked]);


  return (
    <>
      <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <span className='label flex items-center text-sm font-medium text-black  dark:text-white'>
          Light
        </span>
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-[#212b36]' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-[28px]' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-black  dark:text-white'>
          Dark
        </span>
      </label>
    </>
  )
}

export default Switcher
