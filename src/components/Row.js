import { Button } from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API_URL from '../APIURL';


const csvData = [{
  name: 'Data science training',
  description: 'Data Science certification training',

  suggestedRoles: [{
      id: 16,
      category: 'DEVELOPER',
      name: 'Data Engineer'
    },
    {
      id: 17,
      category: 'DEVELOPER',
      name: 'Data Scientist'
    }
  ]
}, {
  name: 'AWS',
  description: 'AWS certification training',

  suggestedRoles: [{
      id: 16,
      category: 'DEVELOPER',
      name: 'Cloud Engineer'
    },
    {
      id: 17,
      category: 'DEVELOPER',
      name: 'Network Engineer'
    }
  ]
}];

const data = csvData.map(item => ({
  name: item.name,
  description: item.description,
  suggestedRoles: item.suggestedRoles.map(role => role.name),
}))

console.log(data);

export default function Reports() {
  const [skillsData, setSkillsData] = useState([]);
  const [fieldData, setFieldData] = useState([]);

  useEffect(() => {
    axios.get(API_URL + '/getAllEmployees')
      .then(response => {
        response.data[0].fieldSkillss = Object.assign({}, response.data[0].fieldSkills)
        console.log('EMPLOYEE RESPONSE', response.data[0].fieldSkillss);
        setSkillsData(response.data)
        setFieldData(skillsData.fieldSkills)
        console.log('EMPLOYEE RESPONSE', response);
       
      })
  }, [])

  
  const createCsvFileName = ()=> `data_.csv`;
  const headers = [
      { label: 'staffnumber', key: 'staffnumber' },
      { label: 'email', key: 'email' },
      { label: 'Job Skill Name', key: 'jobSkills' },
      { label: 'Job Skills Employee Rating', key: 'emp_rating' },
      { label: 'Job Skills Supervisor Rating', key: 'sup_rating' },
      { label: 'Job Soft Skills', key: 'jobSoftSkills' },
      { label: 'Job Soft Employee Rating', key: 'job_soft_emp_rating' },
      { label: 'Job Soft Supervisor Rating', key: 'job_soft_sup_rating' },
      { label: 'Field Skills', key: 'fieldSkills' },
      { label: 'Field Employee Rating', key: 'field_emp_rating' },
      { label: 'Field Supervisor Rating', key: 'field_sup_rating' },
      { label: 'Other Skills', key: 'otherSkills' },
      { label: 'Other Employee Rating', key: 'other_emp_rating' },
      { label: 'Other Supervisor Rating', key: 'other_sup_rating' },
      // { label: 'Field Skills', key: 'fieldSkills' }
      // { label: 'Job Skills', key: 'otherSkills' }
  ];

  let data = []
  function arrayMax(arr) {
    var len = arr.length, max = -Infinity;
    while (len--) {
      if (Number(arr[len]) > max) {
        max = Number(arr[len]);
      }
    }
    return max;
  };
  function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }

  return true;
}
  
  skillsData.forEach(item => {
    if (item.jobSkills.length > 0){
      data.push({
          staffnumber: item.staffnumber,
          email: item.email,
          jobSkills: item.jobSkills[0].skill_name,
          emp_rating: item.jobSkills[0].emp_rating,
          sup_rating: item.jobSkills[0].sup_rating,
          jobSoftSkills: item.jobSoftSkills[0].skill_name,
          job_soft_emp_rating: item.jobSoftSkills[0].emp_rating,
          job_soft_sup_rating: item.jobSoftSkills[0].sup_rating,
          fieldSkills: item.fieldSkills[0].skill_name,
          field_emp_rating: item.fieldSkills[0].emp_rating,
          field_sup_rating: item.fieldSkills[0].sup_rating,
          otherSkills: item.fieldSkills[0].skill_name,
          other_emp_rating: item.fieldSkills[0].emp_rating,
          other_sup_rating: item.fieldSkills[0].sup_rating
      });
      var random_array =[item.jobSkills.length,item.jobSoftSkills.length,item.fieldSkills.length,item.otherSkills.length];
      var array_with_highest_size=arrayMax(random_array);
    
      for (let i = 1; i < array_with_highest_size; i++) {
          const jobSkills = item.jobSkills[i];
          const jobSoftSkills = item.jobSoftSkills[i];
          const fieldSkills = item.fieldSkills[i];
          const otherSkills = item.otherSkills[i];

          data.push({
              staffnumber: '',
              email: '',
              jobSkills:  !isEmpty(item.jobSkills[i]) ? jobSkills.skill_name : '',
              emp_rating:  !isEmpty(item.jobSkills[i]) ? jobSkills.emp_rating : 0,
              sup_rating:  !isEmpty(item.jobSkills[i]) ? jobSkills.sup_rating : 0,
              jobSoftSkills:  !isEmpty(item.jobSoftSkills[i]) ? jobSoftSkills.skill_name : "",
              job_soft_emp_rating:  !isEmpty(item.jobSoftSkills[i]) ? jobSoftSkills.emp_rating : 0,
              job_soft_sup_rating:  !isEmpty(item.jobSoftSkills[i]) ? jobSoftSkills.sup_rating : 0,
              fieldSkills:  !isEmpty(item.fieldSkills[i]) ? fieldSkills.skill_name : "",
              field_emp_rating:  !isEmpty(item.fieldSkills[i]) ? fieldSkills.emp_rating : 0,
              field_sup_rating:  !isEmpty(item.fieldSkills[i]) ? fieldSkills.sup_rating : 0,
              otherSkills:  !isEmpty(item.otherSkills[i]) ? otherSkills.skill_name : "",
              other_emp_rating:  !isEmpty(item.otherSkills[i]) ? otherSkills.emp_rating : 0,
              other_sup_rating:  !isEmpty(item.otherSkills[i]) ? otherSkills.sup_rating : 0,
              
          });
      }
    }
  });

  return (
      <CSVLink
          data={data}
          headers={headers}
          filename={createCsvFileName()}
          target="_blank"
          style={{ textDecoration: 'none', outline: 'none', height: '5vh' }}
      >
          <Button variant="contained" color="secondary" style={{ height: '100%' }}>
              Download as CSV
          </Button>
      </CSVLink>
  );
};