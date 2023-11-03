import React from 'react'
import { LineWave } from 'react-loader-spinner'
import './PageLoader.css'
import Loading from '../Loading/Loading'


const PageLoader = () => {
  return (
    <div id='react-loader'>
      <LineWave
        
        height="150"
        width="150"
        // color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor="gray"
        middleLineColor="pink"
        lastLineColor="gray"
      />
      {/* <Loading/> */}
      </div>
  )
}

export default PageLoader