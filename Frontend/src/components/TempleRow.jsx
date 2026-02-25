import React from "react";
import TempleCard from "./TempleCard";

const TempleRow = () => {

const temples = [

{
name:"Kedarnath",
image:"https://traveltonirvana.com/wp-content/uploads/2023/10/Untitled-design-2048x1152-1.png"
},

{
name:"Badrinath",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpGyTUgmSwZx2hebynjKq8Dd5q4ctGH2_mGw&s"
},

{
name:"Trambakeshwar",
image:"https://trambakeshwar.com/images/trambakeshwar.jpg"
},

{
name:"Ram Mandir",
image:"https://www.kailash-yatra.org/images/place/ram-mandir/shree-ram-janmaboomi-temple-ayodhya.jpg"
},

{
name:"Vrindavan",
image:"https://d34vm3j4h7f97z.cloudfront.net/original/4X/c/f/2/cf293bd7dfd3abfbc657907fe0ebf8aca779dbfa.jpeg"
},

{
name:"KhatuShyam",
image:"https://tripxl.com/blog/wp-content/uploads/2024/09/Location-489.jpg"
},

{
name:"Tuljabhawani",
image:"https://www.trawell.in/admin/images/upload/499589499tuljapur-temple.jpg"
},

{
name:"Mahalakshmi",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKZaV-ZLczKJ6z7IPbvWIs4SLdkgRi8uUCLg&s"
}

];

return (

<div className="bg-white p-5 mt-0">

<h2 className="text-2xl font-semibold mb-3">

Select Temple

</h2>

<div className="flex gap-4 overflow-x-auto">

{
temples.map((temple,index)=>(

<TempleCard
key={index}
name={temple.name}
image={temple.image}
/>

))
}

</div>

</div>

);

};

export default TempleRow;