import {useState } from 'react';
import './Pagination.css'
const Pagination = ({setPage,pageCount,page}) =>{
    const[active,setActive]=useState(3);
    
    let buttons=[];
    for(let i=0;i<pageCount;i++){
        buttons.push(i+1);
    }

    return(
        <div className="paginationMain">
            <button className='paginationButtonFirst' onClick={()=>
                {
                    setPage(1)
                    setActive(1)
                }
                }>First</button>

                {
                     (active===1 || active===2)?
                        buttons.slice(0,3).map((button,i)=>{
                            return <button key={i+1} className={active===button?"active":"paginationButtonsNumbered"} onClick={()=>
                                {
                                    setPage(button)
                                    setActive(button);
                                }
                            }>{button}</button>;
                            })
                     
                    :(active>2 && active<=pageCount-1)?
                        buttons.slice(active-2,active+1).map((button,i)=>{
                            return <button key={i+1} className={active===button?"active":"paginationButtonsNumbered"} onClick={()=>
                                {
                                    setPage(button)
                                    setActive(button);
                                }
                            }>{button}</button>;
                            })
                     :
                        (active===pageCount)?
                        buttons.slice(active-3,active).map((button,i)=>{
                            return <button key={i+1} className={active===button?"active":"paginationButtonsNumbered"} onClick={()=>
                                {
                                    setPage(button)
                                    setActive(button);
                                }
                            }>{button}</button>;
                            })
                    
                     :
                     ""
                
                }
                
            
            {/* {
                 buttons.map((button,i)=>{
                        return <button key={i+1} className={active===button?"active":"paginationButtonsNumbered"} onClick={()=>
                            {
                                setPage(button)
                                setActive(button);
                            }
                        }>{button}</button>;
                })
            } */}

            {/* <button className='paginationButtonsNumbered' onClick={()=>setPage(1)}>1</button>
            <button className='paginationButtonsNumbered' onClick={()=>setPage(2)}>2</button>
            <button className='paginationButtonsNumbered' onClick={()=>setPage(3)}>3</button> */}
           
           
            <button className='paginationButtonLast' onClick={()=>
            {
                setPage(pageCount)
                setActive(pageCount)
            }
                }>Last</button>
        </div>
    )
}

export default Pagination;