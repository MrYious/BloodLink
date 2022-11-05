import { useContext, useEffect, useState } from 'react';

import { MainContext } from '../App';

const ContextSample = () => {
  const contextData = useContext(MainContext);

  return (
    <div className="">
      Main Link : {contextData.link}
    </div>
  );
}

export default ContextSample;