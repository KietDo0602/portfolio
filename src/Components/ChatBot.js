import React, {useState} from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

// all available props
const theme = {
  background: 'white',
  fontFamily: 'AvenirBook',
  headerBgColor: '#f3f3f3',
  headerFontColor: 'black',
  headerFontSize: '15px',
  botBubbleColor: '#555759',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const steps = [
  {
    id: '1',
    message: 'This is an automated bot, coded by me to answer your questions.',
    trigger: '2',
  },
  {
    id: '2',
    message: "Don't worry, nothing here is being stored or recorded.",
    trigger: '3',
  },
  {
    id: '3',
    message: 'What is your name?',
    trigger: '4',
  },
  {
    id: '4',
    user: true,
    validator: (value) => {
      if ((value.length <= 1 && value.indexOf(' ') >= 0) || /\d/.test(value)) {
        return 'Error. Please enter a valid name.';
      }
      return true;
    },
    trigger: '5',
  },
  {
    id: '5',
    message: 'Hi {previousValue} , nice to meet you!',
    trigger: '6',
  },
  {
    id: '6',
    message: "What do you want to know about me?",
    trigger: '7',
  },
  {
    id: '7',
    options: [
      { value: 1, label: 'Full Name', trigger: '8' },
      { value: 2, label: 'Age', trigger: '9' },
      { value: 3, label: 'Resume', trigger: '10' },
      { value: 4, label: 'Education', trigger: '11' },
      { value: 5, label: 'Favourite Color', trigger: '12' },
      { value: 6, label: 'Location', trigger: '13' },
      { value: 7, label: 'Music', trigger: '14' },
      { value: 8, label: 'Trains', trigger: '15' },
      { value: 9, label: 'How did I code this website?', trigger: '16' },
      { value: 10, label: 'Skills', trigger: '17' },
    ],
  },
  {
    id: '8',
    message: 'My full name is Cong Tuan Kiet Do. You can call me Kiet.',
    trigger: '6',
  },
  {
    id: '9',
    message: `I'm ${getAge("2002/06/10")} years old.`,
    trigger: '6',
  },
  {
    id: '10',
    component: (
      <a href="/files/resume.pdf" target="_blank">
        <FontAwesomeIcon className="socialIcon" icon={faFileArrowDown}/>
      </a> 
    ),
    trigger: '6',
  },
  {
    id: '11',
    message: "I'm studying 3rd year of college, majoring in Statistics and minor in Computing @ the University of Waterloo.",
    trigger: '6',
  },
  {
    id: '12',
    message: "I'm pretty indifferent about most colors, but I like blue and green.",
    trigger: '6',
  },
  {
    id: '13',
    message: "I'm currently living in Waterloo, Ontario.",
    trigger: '6',
  },
  {
    id: '14',
    message: "I don't have a favourite music genre, all genre have good and bad songs, and I listen to the good ones (hopefully).",
    trigger: '6',
  },
  {
    id: '15',
    message: "Trains are an efficient method of transportation that is safe, environment-friendly and cheap.",
    trigger: '6',
  },
  {
    id: '16',
    message: "For this website, I used React for the Front-End, alongside external libraries such as GSAP and Material UI. For the Back-End, I used Node.js and Firebase.",
    trigger: '16.1',
  },
  {
    id: '16.1',
    message: "It's all coded and designed by me.",
    trigger: '6',
  },
  {
    id: '17',
    message: "I'm a Full-Stack Web Developer and Software Engineer that wants to learn a lot more.",
    trigger: '6',
  },
];

const CustomChatBot = ({chat}) => {
    return (<ThemeProvider theme={theme}>
        <ChatBot className={"chatBot " + (chat ? '' : "hide")}
            steps={steps} 
        />
    </ThemeProvider>);
}


export default CustomChatBot;