[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

## Team 24
This repository contains the source code for Assignment 6

### Features Offered
---

### Documentation
---

### Tech Stack
---
| Component | Technologies | 
| --- | --- | 
| Frontend | React with TypeScript, Chakra UI, Vite.js |
| Backend | FastAPI, Beanie |
| Data Storages | Redis, MongoDB |
| Deployments | Docker, Kubernetes, AWS | 

### Team Members
---
| Name | Mobile (+65) | Email | Links |
| --- | --- | --- | --- |
| Hardik Narang | 83087184 | hardiknarang@u.nus.edu | [Github](https://github.com/naranghardik16) | 
| Pranav | 81126484 | e0661424@u.nus.edu | [Github](https://github.com/pranav-ganesh) | 
| Saketh | 82533728 | e0661408@u.nus.edu | [Github](https://github.com/loose-bus-change) | 
| Shivang Gupta | 83538995 | shivang@u.nus.edu | [Website](https://drunkensailor.site), [Podcast](https://weneedtotalk.site), [Github](https://github.com/Shivang211) | 
| Sumanth Yalamarty | 89442247 | sumanthyalamarty@u.nus.edu | [Website](https://s7manth.me), [Podcast](https://weneedtotalk.site), [Github](https://github.com/s7manth) |

## Instructions on how to run Assignment 6

Refer to our team project repository to find instructions on how to run the relevant microservices. For this assignment, minimally would require to run the frontend along with the question service microservice. 

After running the frontend and question service backend, navigate to the `/addquestion` page in the application 
  For example if you're app is running on localhost:5173, navigate to  `localhost:5173/addquestion`

Choose the Leetcode question you would like to add. 
  For example, you want to add the Reverse Integer question that can be found on this link: https://leetcode.com/problems/reverse-integer/

In the input box of the UI, enter 'reverse-integer' and enter Submit. The UI will update shortly to reflect the addition of this question. 
The MongoDB collection also contains this new question that has been added. 
