import React,{useContext,useState,useRef} from 'react';
import gql from 'graphql-tag';
import {useQuery,useMutation} from '@apollo/react-hooks';
import { Button,Icon,Label,Image, Card, Grid,Form } from 'semantic-ui-react';
import LikeButton from '../components/LikeButton'
import moment from 'moment';
import {AuthContext} from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';

function SinglePost(props){

    //edw bazei sto postId tin timi tou post pou yparxei stin grammi tou url
    const postId = props.match.params.postId;

    const{user} = useContext(AuthContext);

    const commentInputRef=useRef(null);

    const [comment,setComment] = useState('');

    //epeidi theloume to field tou getPost dinoume sto data to alias getPost, to name getPost diladi
    const {data:{getPost}={}} = useQuery(FETCH_POST_QUERY,{
        variables:{
            postId
        }
    })
    console.log(getPost);
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION,{
        update(){
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
     });

    function deletePostCallback(){
        props.history.push('/');
    }

    //let epeidi einai conditional
    let postMarkup;
    if(!getPost){
        //perimenoume na fortosei, mporoume na balooume kai kyklo pou gyrnaei
        postMarkup = <p>Loading post.....</p>
    }else{
        const {id,body,createdAt,username,comments,likes,likeCount,commentCount,profilePic}=getPost;
        console.log(getPost);
        postMarkup=(
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    {profilePic?(
                    <Image src={profilePic} />
                    ):(
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                    )}
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content> 
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} post={{id,likeCount,likes}}/>
                                <MyPopup content="Comment on post">
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={()=>console.log("comment on post")}
                                    >
                                        <Button basic color="blue">
                                            <Icon name="comments"/>
                                        </Button>
                                        <Label basic color="blue" pointing="left">
                                            {commentCount}
                                        </Label>
                                </Button>
                                </MyPopup>
                                {user && user.username===username &&(
                                    <DeleteButton postId={id} callback={deletePostCallback}/>
                                 )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                <p>Post a comment</p>
                                <Form>
                                    <div className="ui action input fuild">
                                        <input 
                                            type="text"
                                            placeholder="Comment.."
                                            value={comment}
                                            onChange={event =>setComment(event.target.value)}
                                            ref={commentInputRef}
                                        />
                                        <button type="submit"
                                            className="ui button teal"
                                            //ean den yparxoun comments tote tha einai disabled
                                            disabled={comment.trim()===''}
                                            onClick={submitComment}
                                            >
                                                Submit
                                        </button>
                                    </div>
                                </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment=>(
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                {comment.profilePic?(
                                    <Image  size='mini' floated='right' src={profilePic} />
                                    ):(
                                        <Image floated='right'
                                        size='mini'
                                        src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                                    )}
                                    {user && user.username === comment.username &&(
                                        <DeleteButton postId={id} commentId={comment.id}/>
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))} 
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION =gql`
    mutation($postId:ID!,$body:String!){
        createComment(postId:$postId, body:$body){
            id
            comments{
                id body createdAt username profilePic
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query($postId:ID!){
        getPost(postId: $postId){
            id body createdAt username likeCount profilePic
            likes{
                username 
            }
            commentCount
            comments{
                id username createdAt body profilePic
            }
        }
    }
`;


export default SinglePost
