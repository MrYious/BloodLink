import { useContext, useEffect, useState } from 'react';

import { MainContext } from '../App';

const ContextSample = () => {
  const contextDate = useContext(MainContext);

  return (
    <div className="">
      Main Link : {contextDate.link}
    </div>
  );
}

export default ContextSample;