import React, { useEffect, useState } from 'react';
import CurvedText from './CurvedText';
import NewTag from './NewTag';
import { SplideSlide, Splide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import Receita from './Receita';

export default function Recipes() {
    const [item, setItem] = useState([])
    const [open, setOpen] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        const fetchRecipes = async () =>{
            const resolve = await fetch('https://docs.google.com/spreadsheets/d/1ST8iyo-AoLMQxL4dUTuW2cdw7ed-uhzo1GWqOKg2g60/gviz/tq?&range=A2:D200&sheet=Meals')
            const result = await resolve.text()
            const planilha = JSON.parse(result.substring(47).slice(0, -2));
            setItem(planilha.table.rows)
        }
        fetchRecipes()
    }, [])

    useEffect(() => {
        const storedOpenStates = JSON.parse(localStorage.getItem('openStates')) || Array(item.length).fill(false)
        setOpen(storedOpenStates)
      }, [item.length])
    
      const abrirReceita = (index) => {
        setSelected(index)
        const receitasAbertas = [...open]
        receitasAbertas[index] = true
        setOpen(receitasAbertas)
        localStorage.setItem('openStates', JSON.stringify(receitasAbertas))
      }
      
    return (
        <section>
            <Splide options={{ type:'loop', wheel:true, keyboard:true, rewind:true, perPage:5, perMove:1, pagination:false, focus:'center', breakpoints:{ 1600: { perPage:3 },1024:{ perPage:2, type:'slide', focus:0 }, 640:{ perPage:1, focus:0 } } }}>
    
                {item.map((recipe, index) => (
                    <SplideSlide key={index}> 
                        <div className='shadow-2xl flex flex-col justify-center items-center bg-[url("./bg.webp")] bg-center bg-cover bg-no-repeat w-[430px] h-[570px] relative mx-auto overflow-hidden' onClick={() =>abrirReceita(index)}>
                            {!open[index] && <NewTag />}
                            <CurvedText className='text-[#615727] font-extrabold -translate-y-8 ' text={recipe.c[1].v}/>
                            <img src={recipe.c[0].v} className='block w-auto mx-auto -translate-y-16 max-w-[180px]'/>
                            <span className='block text-center mx-auto text-xs max-w-[300px] -translate-y-8'>{recipe.c[3] && recipe.c[3].v}</span>
    
                            <br /><br /><br />
                            <ul className='ing px-12'>
                                {recipe.c[2] &&  recipe.c[2].v.split(',').map((iten,index) =>(
                                    <p key={index}>{iten}</p>
                                )) }
                            </ul>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>

            {selected !== null && (
                <Receita
                    params={{
                        item: [item[selected]],
                        open: [true],
                        setOpen,
                        setSelected
                    }}
                />
            )}
        </section>
    )
}