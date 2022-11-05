import { useContext, useEffect, useState } from 'react';

import { MainContext } from '../App';

const Template = () => {
  const contextDate = useContext(MainContext);

  return (
    <div className="">
      Main Link : {contextDate.link}
    </div>
  );
}

export default Template;