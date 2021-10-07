import React,{useContext} from 'react';
import {Card,Icon,Label,Image,Button,Header,Popup} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/auth';
import ActLikeButton from './ActLikeButton';
import DeleteAct from './DeleteAct';
import MyPopup from '../../util/MyPopup';

function ActionCard({act:{id,actName,actDescription,actLocationLat,actLocationLong,actType,startDate,endDate,likes,likeCount,commentCount,actOwner},username}){

    //kanoume extract ton user
    const {user} = useContext(AuthContext);

    function likePost(){
        console.log("liked post")
    }
    function commentPost(){
        console.log("commented post")
    }
    console.log("usernamestoactioncard",username)
    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     callback();
    //   };
    return(
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://www.pngall.com/wp-content/uploads/2016/06/Environment-Download-PNG.png'
                />
                <Card.Header>
                {moment().isBefore(moment(endDate))&&(
                    <Header style={{marginBottom:5}} as='h5'>
                    <Icon.Group size='small'>
                    <Icon name='calendar check' />
                    </Icon.Group>
                    Ongoing Action
                </Header>
                )
                }
                {moment().isAfter(moment(endDate))&&(
                    <Header style={{marginBottom:5}} as='h5'>
                    <Icon.Group size='small'>
                    <Icon name='calendar times' />
                    </Icon.Group>
                    Past Action
                </Header>
                )
                }{actName}</Card.Header>
                
                { <Card.Meta as={Link} to={`/actions/${id}`}></Card.Meta> }
                <Card.Description>
                    {actDescription}    
                </Card.Description>
            </Card.Content>
             <Card.Content extra>
                <ActLikeButton user ={user} action={{id,likes,likeCount}}/>
                    {
                        //bgazei ena thema me dom nesting edw
                    }
                <MyPopup content="Comment on Action">
                    <Button labelPosition='right' as={Link} to={`/actions/${id}`}>
                            <Button basic color='blue'>
                                <Icon name='comments' />
                                Comment
                            </Button>
                            <Label as='a' basic color='blue' pointing='left'>
                                {commentCount}
                            </Label>
                        </Button>
                </MyPopup>

                {//edw tsekare ean o user einai o idioktitis tou post kai ean einai bazoume to delete button
                 user && user.username === actOwner.username && <DeleteAct actId={id} username={username}/>}
            </Card.Content> 
        </Card>
    );
}
export default ActionCard;