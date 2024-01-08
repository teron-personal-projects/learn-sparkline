import { cva, type VariantProps } from "class-variance-authority";

import './columns.scss';

type ColumnsProps = {
  children: React.ReactNode
  direction?: 'row' | 'column'
}

export const Columns = ({ children, direction } : ColumnsProps ) => {
  

  return (
    <div className='et-columns text-white flex flex-col justify-center '>
      {children}
      <div className='container sm mx-auto'>
        
      </div>
    </div>
  )
}

export const Column = ({context}: {context: React.ReactNode}) => {
  return(
    <>
    {context}
    </>
  )
}


