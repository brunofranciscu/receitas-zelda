import React, { memo } from "react";
import CurvedText from "./CurvedText";

const Receita = ({ params: { item, open, setOpen, setSelected } }) => {
    return (
        <div className='bg-[#00000066] w-full h-dvh mx-auto fixed top-0 left-0 flex justify-center items-center'>
            <div className='bg-[radial-gradient(#d4c68f,#ada072)] bg-center bg-cover bg-no-repeat w-[85%] h-[80%] relative p-5'>
                <button onClick={() =>setSelected(null)} className='absolute top-5 right-5 text-white text-2xl'>X</button>
                
                {item.map((recipe, index) => (
                    <div key={index}>
                        <CurvedText className='text-[#615727] font-extrabold -translate-y-12' text={recipe.c[1].v} />

                        <img src={`./src/img/recipes/${recipe.c[0].v.replace('jpg', 'webp')}`}
                             alt={`Recipe image for ${recipe.c[1].v}`}
                             className='block w-auto mx-auto -translate-y-12'/>

                        <span className='block text-center mx-auto text-xs max-w-[300px] -translate-y-8'>{recipe.c[3].v}</span>

                        <br /><br /><br />

                        <div className='ing text-center'> {recipe.c[2].v.split(',').map((ing, i) => ( <p key={i}>{ing}</p> ))}  </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(Receita);
