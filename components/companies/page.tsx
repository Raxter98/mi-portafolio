"use client";

interface atributos {
    position: String,
    enterprise: String,
    date: String,
    description: String
} 



const Companies = ({position, enterprise, date, description}: atributos) => {

    return(

        <div>
            <div className="flex gap-2 flex-wrap">
            <h1 className="text-black dark:text-white  text-3xl lg:text-4xl mb-5"> <span className="border-b-2 border-red-500 ">{position}</span>  </h1>
             <p className="text-black dark:text-white  text-3xl lg:text-4xl mb-10"><span className="bg-red-500 p-1">Developer</span></p>
            </div>
            <h2 className="text-black dark:text-white text-2xl lg:text-3xl"><span className="border-b-2 border-red-500 ">{enterprise}</span>  / {date}</h2>
            <h3 className="text-black dark:text-white sm:text-base md:text-lg lg:text-xl">{description}</h3>
        </div>
    )

}

export default Companies;