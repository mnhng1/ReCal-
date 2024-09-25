
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
                <p className = {'text-[#00df9a] font-bold p-2 ' }> FORGOT SOMETHING ABOUT YOUR COURSES? </p>
                <h1 className = 'md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'> AI with syllabus. </h1>
                <div className = 'flex justify-center items-center'>
                    <p className=  "md:text-5xl sm:text-4xl text-xl font-bold py-4 ">Ask about your </p>
                    <ReactTyped className=  " text-[#00df9a] md:text-5xl sm:text-4xl text-xl font-bold pl-2 md:pl-4" strings = {[ 'assignments', 'deadlines', 'events', 'courses']} typeSpeed={100} backSpeed={100} loop/>
                </div>
                <p className = "md:text-2xl text-xl font-bold text-gray-500" >Chat to your syllabus, ask about deadlines, courses structure, and more...</p>
                <button className = "bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black" onClick={handleGetStart}> Get Started</button>
            </div>
        </div>
    )
}


export default Hero