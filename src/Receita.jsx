import React, { memo } from "react";
import CurvedText from "./CurvedText";

const Receita = ({ params: { item, open, setOpen, setSelected } }) => {
    return (
        <div className='bg-[#00000066] w-full h-dvh mx-auto fixed top-0 left-0 flex justify-center items-center backdrop-blur-md'>
            <div className='bg-[radial-gradient(#d4c68f,#ada072)] bg-center bg-cover bg-no-repeat w-auto h-auto relative p-5 rounded-2xl'>
                <button onClick={() =>setSelected(null)} className='absolute top-5 right-5 text-white text-2xl'>X</button>
                
                {item.map((recipe, index) => (
                    <div key={index} className="flex justify-center items-center h-full w-full">

                        <img src={recipe.c[0].v} className='block w-auto'/>

                        <div>
                            <strong className="text-2xl">{recipe.c[1].v}</strong>
                            {recipe.c[3] && <span className='block mx-auto max-w-[400px] text-xl'>{recipe.c[3].v}</span>}
                            <div className='ing'> {recipe.c[2] && recipe.c[2].v.split(',').map((ing, i) => ( <p key={i}>{ing}</p> ))}  </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(Receita);
