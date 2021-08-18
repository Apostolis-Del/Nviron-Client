import React, { useEffect,useState,useContext,useRef } from 'react';
import '../App.css';
import { Room, Star, StarBorder } from "@material-ui/icons";
import {useQuery,useMutation,useLazyQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AuthContext} from '../context/auth';
import { useForm } from '../util/hooks';
import {Icon,Image} from 'semantic-ui-react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import {FETCH_ACTIONS_QUERY} from '../util/graphql';
import {MAP_BOX} from '../mapconfig';
import Energy from '../icons/energy.svg';
import 'mapbox-gl/dist/mapbox-gl.css';
import NaturePin from './pins/NaturePin';
import EnergyPin from './pins/EnergyPin';
import AgriculturePin from './pins/AgriculturePin';
import AnimalPin from './pins/AnimalPin';
import MarinePin from './pins/MarinePin';

function SingleOrgMap({org:{orgLocationLat,orgLocationLong,orgType}}) {
   // console.log(orgLocationLat,orgLocationLong,orgType)
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState("Marine Conservation");

  const [viewport, setViewport] = useState({
    latitude: 37.983810,
    longitude: 23.727539,
    zoom: 4,
  });


  //----------------------------------------------------------------------

  const {user} = useContext(AuthContext);
 
 
  
   return(

      <div style={{ height: "50vh", width: "100%" }}>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1IjoiZGVsNDQiLCJhIjoiY2tvdjc2eXloMDAyYTJvdXRyMHg1dWh6dSJ9.26H3W4EzkfNfqHwanTdsUg"
        {...viewport}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(viewport) => setViewport(viewport)}
        //onDblClick={currentUsername && handleAddClick}
        //onDblClick={handleAddClick}
      >
          <>
            <Marker
              latitude={orgLocationLat}
              longitude={orgLocationLong}
              //offsetLeft={-3.5 * viewport.zoom}
              //offsetTop={-7 * viewport.zoom}
              
            >
                
               {(orgType === "Energy Conservation")&&(
                
                <EnergyPin size={20}  
                />
               
              )}
               
               {(orgType === "Nature Conservation")&&(
               
                <NaturePin size={20}  
                />
               
              )}

             

                 {(orgType=== "Marine Conservation" )&&(

                
                  <MarinePin size={20}  
                    />
                  )
                  } 

                   {(orgType=== "Agriculture" )&&(

                                
                  <AgriculturePin size={20}  
                    />
                  )}

                   {(orgType === "Animal Conservation")&&(
                                
                                <AnimalPin size={20}  
                             />
                                
                    )}  

           
            </Marker>

          </>
      </ReactMapGL>
    </div>
       
    )
  
 
}



export default SingleOrgMap;
