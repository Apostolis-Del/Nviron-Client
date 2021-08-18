import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {AuthContext} from '../context/auth';

import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import '../App.css'
import {Grid} from 'semantic-ui-react';
import { useQuery, gql } from '@apollo/client';
import {FETCH_ACTIONS_QUERY,FETCH_ORGANIZATIONS_QUERY } from '../util/graphql';
import energyavatar from '../icons/energy.svg'
import natureavatar from '../icons/plantree.svg'
import marineavatar from '../icons/water4.svg'
import animalavatar from '../icons/animal4.svg'
import agricultureavatar from '../icons/wheat3.svg'
import ActionCard from '../components/actcomponents/ActionCard';
import OrganizationCard from '../components/orgcomponents/OrganizationCard';
import { ReactComponent as Nature } from '../icons/energy.svg';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: lightGreen,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      //role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={5}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //  backgroundColor: theme.palette.text.disabled,
  },
  label: {
    color: '#556B2F	'
  },
  indicator: {
    backgroundColor: '#556B2F	'
  },
}));



export default function ActionTabs() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const{loadingActs,data: dataActs} =useQuery(FETCH_ACTIONS_QUERY);
  const{ getActions: acts} = dataActs? dataActs:[];
  console.log("ta acts apo ta tabs",acts);

  const{loadingOrgs,data: dataOrgs} =useQuery(FETCH_ORGANIZATIONS_QUERY);
  const{ getOrganizations: orgs} = dataOrgs? dataOrgs:[];
  console.log("ta orgs apo ta tabs",orgs);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <Paper  >
        <Tabs value={value} 
        centered theme={theme} 
        className={classes.label} 
        onChange={handleChange} 
        indicatorColor="primary"
        // textColor="error"
        
        aria-label="simple tabs example">
          <Tab fill='#f09c2e'
          icon={<img 
          src={energyavatar} />} 
          classes={{ label: classes.label }} 
          label="Energy" {...a11yProps(0)} />
          <Tab icon={<img src={marineavatar} />} 
          label="Marine" {...a11yProps(0)} />
          <Tab icon={<img src={agricultureavatar} />} 
          label="Agriculture" {...a11yProps(0)} />
          <Tab icon={<img src={animalavatar} />} 
          label="Animal" {...a11yProps(0)} />
          <Tab  icon={<img style={{}} src={natureavatar} />} 
          label="Nature" {...a11yProps(0)} />
        </Tabs>
      </Paper>
      <Grid style={{marginTop:10,marginBottom:10}} columns={2}>
        <Grid.Row>
          <Grid.Column>
        {loadingOrgs?(
          <h2>Loading Organizations.....</h2>
        ):(
          <>
            <h2 className='tab-title'>Organizations</h2>

            <div className="container-table">

            { orgs && orgs.map(org=>( 
                
              <>
              
                  {(org.orgType === "Energy Conservation")&&(

                        <TabPanel value={value} index={0}>

                        <Grid columns={1} divided>
                          <Grid.Row>
                        <Grid.Column key={org.id} style={{marginBottom:-45}}>

                          <OrganizationCard org={org} />

                        </Grid.Column>
                        </Grid.Row>
                      </Grid>

                    </TabPanel>

                        
                  )}
                  {(org.orgType === "Marine Conservation")&&(
                        <TabPanel value={value} index={1}>
                        <Grid columns={1} divided>
                          <Grid.Row>
                        <Grid.Column key={org.id} style={{marginBottom:-65}}>
                          <OrganizationCard org={org} />
                        </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </TabPanel>
                        
                  )}

                  {(org.orgType === "Agriculture")&&(
                        <TabPanel value={value} index={2}>
                        <Grid columns={1} divided>
                          <Grid.Row>
                        <Grid.Column key={org.id} style={{marginBottom:-65}}>
                          <OrganizationCard org={org} />
                        </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </TabPanel>
                        
                  )}


                 {(org.orgType === "Animal Conservation")&&(
                        <TabPanel value={value} index={3}>
                        <Grid columns={1} divided>
                          <Grid.Row>
                        <Grid.Column key={org.id} style={{marginBottom:-65}}>
                          <OrganizationCard org={org} />
                        </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </TabPanel>
                        
                  )}


                {(org.orgType === "Nature Conservation")&&(
                        <TabPanel value={value} index={4}>
                        <Grid columns={1} divided>
                          <Grid.Row>
                        <Grid.Column key={org.id} style={{marginBottom:-65}}>
                          <OrganizationCard org={org} />
                        </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </TabPanel>
                        
                  )}


              </>
              
              ))}
              </div>

          </>
        )}
        </Grid.Column>
        <Grid.Column>
        {loadingActs?(
          <h2>Loading Actions.....</h2>
        ):(

          <>
            <h2 className='tab-title'>Actions</h2>

            <div className="container-table">

            { acts && acts.map(act=>( 
                
              <>
              
                  {(act.actType === "Energy Conservation")&&(

                        <TabPanel value={value} index={0}>

                        <Grid columns={1} divided>
                          <Grid.Row>
                        <Grid.Column key={act.id} style={{marginBottom:-45}}>

                          <ActionCard act={act} />

                        </Grid.Column>
                        </Grid.Row>
                      </Grid>

                    </TabPanel>

                        
                  )}
                  {(act.actType === "Marine Conservation")&&(
                        <TabPanel value={value} index={1}>
                        <Grid columns={1} divided>
                          <Grid.Row>
                        <Grid.Column key={act.id} style={{marginBottom:-65}}>
                          <ActionCard act={act} />
                        </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </TabPanel>
                        
                  )}

                  {(act.actType === "Agriculture")&&(
                        <TabPanel value={value} index={2}>
                        <Grid columns={1} divided>
                          <Grid.Row>
                        <Grid.Column key={act.id} style={{marginBottom:-65}}>
                          <ActionCard act={act} />
                        </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </TabPanel>
                        
                  )}


                 {(act.actType === "Animal Conservation")&&(
                        <TabPanel value={value} index={3}>
                        <Grid columns={1} divided>
                          <Grid.Row>
                        <Grid.Column key={act.id} style={{marginBottom:-65}}>
                          <ActionCard act={act} />
                        </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </TabPanel>
                        
                  )}


                {(act.actType === "Nature Conservation")&&(
                        <TabPanel value={value} index={4}>
                        <Grid columns={1} divided>
                          <Grid.Row>
                        <Grid.Column key={act.id} style={{marginBottom:-65}}>
                          <ActionCard act={act} />
                        </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </TabPanel>
                        
                  )}


              </>
              
              ))}
              </div>

          </>




          
        )}
        </Grid.Column>
        </Grid.Row>
        </Grid>
    </div>
  );
}


