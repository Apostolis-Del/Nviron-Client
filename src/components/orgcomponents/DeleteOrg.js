import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react';

import { FETCH_ORGANIZATIONS_QUERY } from '../../util/graphql';

import MyPopup from '../../util/MyPopup';

function OrgDeleteButton({ orgId, callback ,username}) {

  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = DELETE_ORG_MUTATION;
  console.log(username,"username sto delete org")
  const [deleteOrg] = useMutation(mutation, {
  
    //otan mpei sto update simainei oti to post exei diagraftei epityxws
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {

        const data = proxy.readQuery({
           
            query: FETCH_SINGLEORGPOST_QUERY,
            variables:{
              orgname:orgName2
            }
          });
          

          
          

          proxy.writeQuery({
           
            query: FETCH_SINGLEORGPOST_QUERY,
            data: {
              //getOrgPostsByName: data.getOrgPostsbyName.filter(p => p.id !== postId)
              getOrgPostsByName: data.getOrgPostsByName.filter(p => p.id !== postId)
            }
        })

      }
      if (callback) callback();
    },
    variables: {
      orgId
     
    }
  });
  return (
    <>
      <MyPopup content={'Delete Organization'}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteOrg}
      />
    </>
  );
}

const DELETE_ORG_MUTATION = gql`
  mutation deleteOrg($orgId: ID!) {
    deleteOrg(orgId: $orgId)

`;
const FETCH_ORGANIZATIONS_OWNER_QUERY = gql`
query($orgOwner:String!){  
getOrganizationsbyOwner(orgOwner:$orgOwner){
    id
        orgName
        orgDescription
  orgLocationLat
  orgLocationLong
  orgType
  orgOwner{
  username id 
  }
  donations{
    username
    donateDate


  }
  profilePic
}
}
`;


export default OrgDeleteButton; 