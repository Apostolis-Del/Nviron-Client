import React, {PureComponent} from 'react';
import { ReactComponent as Nature } from '../../icons/plantree.svg';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const ICON2= `M537.804,174.688c0-44.772-33.976-81.597-77.552-86.12c-12.23-32.981-43.882-56.534-81.128-56.534
c-16.304,0-31.499,4.59-44.514,12.422C319.808,17.949,291.513,0,258.991,0c-43.117,0-78.776,31.556-85.393,72.809
c-3.519-0.43-7.076-0.727-10.71-0.727c-47.822,0-86.598,38.767-86.598,86.598c0,2.343,0.172,4.638,0.354,6.933
c-24.25,15.348-40.392,42.333-40.392,73.153c0,27.244,12.604,51.513,32.273,67.387c-0.086,1.559-0.239,3.107-0.239,4.686
c0,47.822,38.767,86.598,86.598,86.598c14.334,0,27.817-3.538,39.723-9.696c16.495,11.848,40.115,26.67,51.551,23.715
c0,0,4.255,65.905,3.337,82.64c-1.75,31.843-11.303,67.291-18.025,95.979h104.117c0,0-15.348-63.954-16.018-85.307
c-0.669-21.354,6.675-60.675,6.675-60.675l36.118-37.36c13.903,9.505,30.695,14.908,48.807,14.908
c44.771,0,81.597-34.062,86.12-77.639c32.98-12.23,56.533-43.968,56.533-81.214c0-21.994-8.262-41.999-21.765-57.279
C535.71,195.926,537.804,185.561,537.804,174.688z M214.611,373.444c6.942-6.627,12.766-14.372,17.212-22.969l17.002,35.62
C248.816,386.096,239.569,390.179,214.611,373.444z M278.183,395.438c-8.798,1.597-23.782-25.494-34.416-47.517
c11.791,6.015,25.102,9.477,39.254,9.477c3.634,0,7.201-0.296,10.72-0.736C291.006,374.286,286.187,393.975,278.183,395.438z
 M315.563,412.775c-20.35,5.651-8.167-36.501-2.334-60.904c4.218-1.568,8.301-3.413,12.183-5.604
c2.343,17.786,10.069,33.832,21.516,46.521C337.011,401.597,325.593,409.992,315.563,412.775z`;

const pinStyleNature = {
  cursor: 'pointer',
  fill: '#DCDCDC',
  stroke: 'none'
};

 export default class PastNaturePin extends PureComponent {

  render() {
    const {size = 20, onClick} = this.props;

    return (
      <svg 
        height={size}
        viewBox="0 0 24 24"
        style={{...pinStyleNature, transform: `translate(${-size / 2}px,${-size}px)`}}
        onClick={onClick}
      >
        <Nature />
        {/* <path d={ICON2}/> */}
      </svg>
    );
  }
}