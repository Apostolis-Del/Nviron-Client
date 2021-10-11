import React,{useContext} from 'react';
import { useQuery, gql } from '@apollo/client';
import {Transition,Grid} from 'semantic-ui-react'
import OrgPostCard from './OrgPostCard';

function SubscribedOrgs({user,subscribed:{orgName}}){


    //FOR SUBSCRIBED ORGSPOSTS
    const { loadingOrgposts, data } = useQuery(FETCH_ORGPOST_BYNAME,{
        variables:{
            orgname:orgName
        }
      });

    const {getOrgPostsByName: orgposts } = data ? data : [];
    console.log(orgposts,"ta orgposts")

     console.log("ta org posts",orgposts);


      var subscribedarray=[]
     

        // if(orgposts){
        //     orgposts.map(subscribed=>
        //         subscribedarray=subscribedarray.concat(subscribed)
        //         )
        //         console.log(subscribedarray,"to subarray")  
        //         console.log(orgposts[2],"consolelog3")          
        //   }
          
     return(
         <>
         
         {loadingOrgposts?(
             <h3>Wait for orgPosts by name to load</h3>
         ):(
            <Transition.Group>
                {
                     orgposts && orgposts.map(orgpost=>
                         

                           <OrgPostCard orgpost={orgpost} />

                    )
                }
            </Transition.Group>
         )}
        </>
     );
 }



const FETCH_ORGPOST_BYNAME= gql`
    query($orgname:String!){
        getOrgPostsByName(orgname:$orgname){
            id
            body
            username
                createdAt
            orgname
            likes {
                username
            }
            commentCount
            likeCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`
 export default SubscribedOrgs;