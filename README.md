# Project Name
Thai id card OCR

# Description
The website is a two page website
- Home page
- CRUD page
- CRUD API endpoints

## Home page
The page contains a option to uploadd an image of id card. By which it will automatically extract the necessary information and enter it in the database.
It also has an form to manually fill incase the image recognisation fails.

Then by scrolling down one can see a scrollable view which displays all the inserted idcards in the database. You can filter them on basis of certain keys from the filter attribute.
Two small icons (edit,delete) can edit and delete the 

## CRUD page
first the user clicks on the edit option on any card option this page will open. This page contains all the options to edit the feilds. Also delete functionality is implemented.

## API endpoints
There are many internal endpoints which user doesnt need to know but the one to offer to public related to CRUD on Id cards are as follows :-
-- Create: http://localhoost:3000/card, This is a put type request type
</br>
  The data has to be sent in json format in the body of the 
  image--------------------------------------------------------------------------------------------------

- Read: http://localhost:3000/:identification_number, this a get request type
- Update: http://localhoost:3000/:identification_number, this is a post request type
- Delete: http://localhoost:3000/:identification_number, this is a DELETE request type

# Table of contents

# Technology used
- Frontend
  - HTML and embededJavaScript
  - CSS
  - JavaScript
  - Google vision API
- Backend
 - Express
 - MongoDB

# Usage
For you to run the 
