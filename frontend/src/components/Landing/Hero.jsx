
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";



const Hero =  () => {
    const navigate = useNavigate();
    //Route to login page when clicked
    function handleGetStart(){

        navigate("/login")
        
    }


    return (
        <div className="text-white">
            <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto flex text-center flex-col justify-center ">
                <p className = {'text-[#00df9a] font-bold p-2 text-2xl' }> AI with Google Calendar  </p>
                <h1 className = 'md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'> Chat Based Scheduling </h1>
                <div className = 'flex justify-center items-center'>
                    <p className=  "md:text-5xl sm:text-4xl text-xl font-bold py-4 ">Ask about your </p>
                    <ReactTyped className=  " text-[#00df9a] md:text-5xl sm:text-4xl text-xl font-bold pl-2 md:pl-4" strings = {[ 'meetings', 'deadlines', 'events']} typeSpeed={100} backSpeed={100} loop/>
                </div>
                
                <button className = "bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black" onClick={handleGetStart}> Get Started</button>
            </div>
        </div>
    )
}


export default Hero