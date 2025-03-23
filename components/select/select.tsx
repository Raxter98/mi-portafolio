const Select = () => {

    return(

        <select defaultValue="Pick a language" className="appearance-none bg-transparent border border-gray-400 rounded-md px-4  focus:outline-none ">
            
            <option>EN</option>
            <option disabled={true}>ES</option>
           
        </select>
    )

        

    
}

export default Select;