import React from "react";

const TempleCard = ({name,image}) => {

const bookTemple = () => {

alert("Redirecting to booking page for "+name);

};

return (

<div className="card bg-white shadow-xl min-w-[140px] hover:scale-105 duration-200">

<figure>

<img src={image} className="h-24 w-full"/>

</figure>

<div className="card-body p-2 text-center">

<h2 className="font-semibold">

{name}

</h2>

<button
className="btn btn-success btn-sm max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row hover:bg-pink-500 hover:text-white"
onClick={bookTemple}
>

Book Now

</button>

</div>

</div>

);

};

export default TempleCard;