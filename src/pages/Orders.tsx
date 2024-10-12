 
import { useState  } from 'react';
import DataApi from '../api/data.json'
import { FaCirclePlus } from "react-icons/fa6";
import  {Margin, usePDF } from 'react-to-pdf';

const Orders = () => { 
  type ItemDto={
    catId:number,
    itemId:number,
    title:string
    price:number
    variants:string
    qty:number
  }
  const [select,setSelect] = useState(0)
  const [items,setItems] = useState<ItemDto[]>([])
  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: "usepdf-example.pdf",
    page: { margin: Margin.MEDIUM ,format:'A4'},
    
  });
  const AddItems = (data: ItemDto) => {
    // Check if the item with the same variant already exists
    const existingItemIndex = items.findIndex(cur =>  cur.catId === data.catId && cur.variants === data.variants);
  
    if (existingItemIndex !== -1) {
      // If it exists, update the quantity
      const updatedItems = [...items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        qty: updatedItems[existingItemIndex].qty + 1
      };
      setItems(updatedItems);
    } else {
      // If it doesn't exist, add the new item
      setItems([...items, data]);
    }
  };
  


  return (
    <>

            <div className="w-full flex items-start gap-x-4  gap-y-4 py-24 flex-wrap lg:flex-nowrap px-10">
              <div className=" w-full  lg:w-1/2  bg-white/5 border-2 shadow-lg rounded-sm">
                  <ul className="gap-y-4 w-full px-3 aspect-square py-4">
                    {
                      DataApi.map((cur,i)=>{
                        return <li key={i} onClick={()=>setSelect(i)} className={`*:
                        w-full flex items-center rounded-xl gap-x-2 justify-between cursor-pointer ${select === i ?'border-2 border-orange-500':''} bg-white my-3 px-4 py-4
                        `}>
                          <img style={{
                            aspectRatio:'1:1'
                          }} src={cur.image} alt="" className='w-20' />
                          <div className="">
                          <h1 className='indie-flower-regular text-2xl'>{cur.name}</h1>
                          </div>
                          <div className="">
                            <button className='flex items-center '>
                              <FaCirclePlus  className='text-4xl text-teal-500' /> 
                            </button>
                          </div>
                        </li>
                      })
                    }
                  </ul>
              </div>
              <div id='no-scroll' className=" w-full  lg:w-full flex py-10 px-10 gap-x-2 flex-wrap bg-white  h-[60vh] gap-y-4 overflow-y-scroll shadow-xl rounded-md">

                            {
                              DataApi[select].items.map((data,i)=>{
                                return <div key={i} className='w-[40%]   mx-auto   h-24   flex flex-col rounded-lg px-3'> 
                                    <img src={data.image} alt="" />
                                    <p className=" text-nowrap text-center px-5 py-2 bg-teal-500 text-white rounded-md shadow-2xl poppins-semibold  capitalize text-sm">{data.name} ${data.price}/-</p>
                                      <ul className="flex gap-x-2 items-center py-3">
                                        {data.variants.map((cur,i)=>{
                                          return <li 
                                          key={i}
                                              onClick={()=>{
                                                AddItems({
                                                  catId:select,
                                                  itemId:data.id,
                                                  price:parseInt(cur.price),
                                                  title:data.name,
                                                  variants:cur.tag,
                                                  qty:1
                                                })
                                              }}
                                          className='w-1/2 border shadow-xl px-4 py-2 rounded-md  text-center border-black text-sm  transition-all duration-300 hover:bg-teal-500 hover:text-white hover:border-none cursor-pointer'>{cur.tag}</li>
                                        })  }
                                      </ul>

                                </div>
                              })
                            }

              </div>
              <div  className=" w-full  lg:w-1/2   bg-white border-2 shadow-lg rounded-md px-3 py-4 " >
                  <div ref={targetRef} style={{
                backgroundImage:'url(/pizza.png)',
                backgroundSize:'contain',
                backgroundRepeat:'no-repeat',
                backgroundPosition:'center',
                backgroundBlendMode:'soft-light'
              
              }} className="w-full">
                  <h1 className="text-center text-black indie-flower-regular text-3xl">Checkout</h1>
                    <hr className='w-[80%] mx-auto bg-black my-4' />

                    <div className="py-4">
                          <ul  id='no-scroll' className="flex flex-col gap-y-3  overflow-scroll">
                            {/* <li className="flex w-full justify-between px-2 gap-x-3">
                              <span className='text-wrap'>1. lorem7</span>
                              <span>x1</span>
                              <span>$20</span>
                            </li> */}
                        {
                          items && items.length>0 &&items.map((cur,i)=>{
                            return <li className='flex items-start gap-x-3 justify-between border-b py-3'> 
                                <p>{i+1}. {cur.title}
                                  <br /><span className='text-sm text-gray-500'>{cur.variants}</span>
                                  </p> <p className='text-lg'>${cur.price}X{cur.qty}</p>
             <p className='text-lg'>${cur.price*cur.qty}</p>
                                  
                             </li>
                          })
                        }
                          
                          </ul>
                    <hr className=' mx-auto bg-black my-3' />
                    <h1 className=" text-black indie-flower-regular flex w-full justify-between px-4 text-3xl">Total: <span>${ items.reduce((c, i) => c + (i.qty * i.price), 0)}/- </span></h1>





                    </div>
                  </div>
                    <button className='px-4 py-2 bg-green-400 rounded-md shadow-xl  border-black border-2' onClick={() =>toPDF()}>Download Bill</button>
              </div>
            </div>

        </>
  )
}

export default Orders