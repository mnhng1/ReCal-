

const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className = 'max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
      <div className='w-full border flex flex-col items-center gap-5'>
            <h1 className='font-bold text-2xl'>Smart Syllabus Analysis</h1>
            <p> Sync with your Google Calendar, simply chat for exam dates, schedule study time, aware of office hours, and get your latest assignments. </p>
        </div>
        <div className='w-full border flex flex-col items-center gap-5'>
            <h1 className='font-bold text-2xl'>Google Calendar Integration</h1>
            <p> Sync with your Google Calendar, simply chat for exam dates, schedule study time, aware of office hours, and get your latest assignments. </p>
        </div>
        <div className='w-full border flex flex-col items-center gap-5'>
            <h1 className='font-bold text-2xl'>Canvas Integration (Upcoming...) </h1>
            <p> Access informations that are not on your syllabus...(Upcoming...)</p>
        </div>

       </div>
    </div>
  );
};

export default Cards;