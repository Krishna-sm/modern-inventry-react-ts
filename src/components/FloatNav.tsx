 
import { Link } from 'react-router-dom'
type link={
    image:string
    title:string
    link:string
    isMobile?:boolean
}
const FloatNav = () => {

   
        const links:link[] = [
            {
            image:'/home.png',
            title:'Home',
            link:'/',
            isMobile:true
        },
        {
            image:'/recycle.png',
            title:'Draft',
            link:'/draft'
        },
        {
            image:'/create.png',
            title:'Create',
            link:'/create',
            isMobile:true
        },
        {
            image:'/refresh.png',
            title:'Refresh',
            link:'/'
        },
        {
            image:'/history.png',
            title:'History',
            link:'/history',
            isMobile:true
        }
    ]


  return (
    <>
            <div className=" w-full lg:w-1/2 mx-auto fixed left-0 right-0 px-10 border-2 shadow-md py-4 rounded-md bottom-10 h-20 bg-teal-500 flex items-center gap-x-2 aspect-auto">
            
                    {
                        links.map((cur,i)=>{
                            return <FloatItem  {...cur} key={i} />
                        })
                    }
            </div>
    </>
  )
}

export default FloatNav



const FloatItem =({image,title,link,isMobile}:link)=>{
    return <>
    <Link to={link}    className={`relative ${!isMobile?'hidden lg:block':'block'} transition-all duration-300  lg:w-[80%] mx-auto mb-7 aspect-square`}>
        <img 
            src={image} 
            alt="" 
            className="object-cover w-full h-full drop-shadow-md transition-all duration-500  hover:scale-150 hover:-translate-y-10" 
            style={{ aspectRatio: '1 / 1' }} 
        />
        <p className='mx-auto text-center bg-green-600 px-3 text-nowrap rounded-md text-white '>{title}</p>
    </Link>
    <div className="w-1/4 h-20 rounded-lg"></div>
</>
}