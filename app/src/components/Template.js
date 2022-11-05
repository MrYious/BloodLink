import {useEffect, useState} from 'react';

const Template = () => {

    const [val, setVal] = useState('Val')
    console.log('Template 1', val)

    useEffect(() => {
      console.log('Template 2', val)

      return () => {
        console.log('Template 3', val)
      }
    }, [])

    return (
        <div className="">
          Sample Component
        </div>
      );
}

export default Template;