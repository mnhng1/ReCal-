

const Newsletter = () => {
  return (
    <div className='w-full py-16 text-white'>
        <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
            <div className='lg:col-span-2'>
                <h1 className='md:text-4xl sm:text-2xl text-xl font-bold md:pl-4 pl-2 '>Need supports, tricks to optimize your flow?</h1>
                <p className='md:text-3xl sm:text-xl text-l font-bold md:pl-4 pl-2 text-gray-500 my-4'>Sign up to our newsletter for latest tips </p>
            </div>
            <div className='my-4 '>
                   <div className='flex sm:flex-row flex-col items-center justify-between w-full ' >
                     <input className='p-3 flex w-full rounded-md text-black ' type="email" name="" id="" placeholder='Enter Email' />
                    <button className='" text-black bg-[#00df9a] w-[200px] rounded-md font-medium my-6  py-3 px-6 ml-4 '>Notify me</button>
                </div>
             </div>
        </div>
      
    </div>
  );
};

export default Newsletter;
