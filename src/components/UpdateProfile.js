import React, { Component, useEffect, useState } from 'react';
import {
  Container, Grid, Paper, Avatar, Typography, TextField, Button, FormControl, FormLabel, RadioGroup, Radio,
  FormControlLabel, Select, Checkbox, MenuItem, InputLabel, IconButton
} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/system';
import API_URL from '../APIURL';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';




function UpdateProfile() {

  const history = useHistory();

  //Populate fields with current data
  useEffect(() => {
    axios.get(`${API_URL}/getEmployee/${localStorage.getItem('staffnumber')}`)
      .then(response => {
        const res = response.data;
        console.log('RESPONSE: ', res)

        setEmail(res.email)
        setIsSupervisor(res.supervisor)
        setDepartment(res.department)
        setJobTitle(res.jotTitle)
        setField(res.field)
      })
  });

  const paperStyle = {
    padding: '10px 20px',
    width: 'fit-content',
    margin: "15px auto"
  }
  const textFieldStyle = { margin: "10px auto" }
  const spacingStyle = { margin: "10px auto" }
  const closeButtonStyle = { marginLeft: "auto" }
  // const headerStyle = { margin: 0 }
  // const avatarStyle = { backgroundColor: '#1bbd7e' }
  // const marginTop = { marginTop: 5 }

  const [staffnumber, setStaffnumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState('');
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [department, setDepartment] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [field, setField] = useState('');

  function handleUpdate(e) {
    e.preventDefault();

    if (password === confirmed) {
      axios.post(API_URL + '/updateEmployee', {
        staffnumber: staffnumber,
        email: email,
        password: password,
        // confirmedPassword: confirmed,
        field: field,
        department: department,
        supervisor: isSupervisor == 'on' ? true : false,
        jobTitle: jobTitle
      }).then((response) => {
        alert(response);
        alert('User ' + staffnumber + ' updated')
      })
    } else {
      alert("Passwords Don't Match");
      // alert("Invalid Input");
    }



  };
  const departments = [
    { key: 1, value: 'Department of Human Resources' },
    { key: 2, value: 'Department of Student Services' },
    { key: 3, value: 'Department of International Relations' },
    { key: 4, value: 'Department of Education' }
  ]

  function dataTrigger() {
    axios.post(API_URL + '/register', {
      staffnumber: 'staffnumber',
      email: 'email'
    })
  }

  return (
    <Container>

      <Paper elevation={20} style={paperStyle}>

        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            variant="h2"
            // color="textPrimary"
            component="h2"
            gutterBottom
            color='primary'
          >
            Update Here
          </Typography>

          <Typography style={closeButtonStyle} align='center'>
            <IconButton type='submit' color='primary'
              onClick={handleUpdate}>
              <CloseOutlinedIcon onClick={() => history.push('/profile')} />
            </IconButton>
          </Typography>
        </Box>

        <form noValidate autoComplete="off">

          <Grid container spacing={1} align='left' >
            {/* FIELDS / EMPLOYEE INFO */}
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth label='Staff Number' color="primary" variant='filled'
                placeholder="219000000" required disabled
                style={textFieldStyle} value={staffnumber}
                onChange={(e) => { setStaffnumber(e.target.value) }}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={9}>

              <TextField
                fullWidth label='Email' color="primary" variant='filled'
                placeholder="example@nust.na" required
                style={textFieldStyle} value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
              <TextField
                fullWidth label='Field' color="primary" variant='filled'
                placeholder="e.g., IT - Information Technology" required
                style={textFieldStyle} value={field}
                onChange={(e) => { setField(e.target.value) }}
              />
              <TextField
                fullWidth label='Job Title' color="primary" variant='filled'
                placeholder="e.g., Lecturer" required
                style={textFieldStyle} value={jobTitle}
                onChange={(e) => { setJobTitle(e.target.value) }}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={9}>
              <TextField
                fullWidth label='Supervisor' color="primary" variant='filled'
                placeholder="e.g., Jane/John Doe - 21900000" required
                style={textFieldStyle} value={jobTitle}
                onChange={(e) => { setJobTitle(e.target.value) }}
              />
              <TextField
                fullWidth label='Password' color="primary" type='password'
                placeholder="************" required variant='filled'
                style={textFieldStyle}
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <TextField
                fullWidth label='Confirm Password' color="primary" type='password'
                placeholder="************" required variant='filled'
                style={textFieldStyle}
                onChange={(e) => { setConfirmed(e.target.value) }}
              />
            </Grid>

            {/* SELECTIONS */}
            <Grid item xs={12} md={4} lg={3} style={spacingStyle}>
              <FormControl>
                <FormLabel>Select a Department</FormLabel>

                <RadioGroup onChange={(e) => { setDepartment(e.target.value) }}>
                  {departments.map((departmentItem) => (
                    <FormControlLabel key={departmentItem.key} value={departmentItem.value} control={<Radio color='secondary' />}
                      label={departmentItem.value} />
                  ))}
                  {/* <FormControlLabel value='money' control={<Radio color='secondary' />} label='Money' />
                  <FormControlLabel value='todos' control={<Radio color='secondary' />} label='Todos' />
                  <FormControlLabel value='reminders' control={<Radio color='secondary' />} label='Reminders' />
                  <FormControlLabel value='work' control={<Radio color='secondary' />} label='Work' /> */}
                </RadioGroup>
              </FormControl>


            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Typography style={spacingStyle} align='center'>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkedB"
                      color="secondary"
                      value={isSupervisor}
                      onChange={(e) => { setIsSupervisor(e.target.value) }}

                      style={spacingStyle}
                    />
                  }
                  label="Check this if you are a Supervisor?"
                />
              </Typography>

              <Typography style={spacingStyle} align='center'>
                <Button type='submit' variant='contained' color='primary' endIcon={<KeyboardArrowRightIcon />}
                  onClick={handleUpdate}>Update</Button>
              </Typography>

              {/* <Button onClick={dataTrigger}>DATA</Button> */}

            </Grid>
            {/* <TextField fullWidth label='staffnumber' placeholder="Enter your Staff Number" required/> */}


          </Grid>

        </form>

      </Paper>
    </Container>
  )

}

export default UpdateProfile;