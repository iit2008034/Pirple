Assignment: 1

API details : 
Create a simple "Hello World" API. Meaning:
1. It should be a RESTful JSON API that listens on a port of your choice. 
2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format.
 
_________________________________________________________
folder structure :
+-- HW-A1 
    +-- config.js
    +-- index.js
    +-- handlers.js
    +-- https
    ¦   +-- cert.pem
    ¦   +-- key.pem
+-- README.txt
________________________________________________________

README:

Steps to Run the Node program :

1. The program support both http and https.

2. All the configurations are present in one file, config.js.
   The file will be present in <INSTALL_PATH>/HW_A1/config.js
   
3. The configuration file will have 2 sections staging, production. 
    Go to the <INSTALL_PATH>/HW_A1/ directory.
	Run the program from your terminal using the below command.
	node index.js
	By default the staging environment data will be read. 
	
	If you want to use the production configuration, you can use the below command to run the program.
	NODE_ENV=production node index.js
	
4. Once the application starts you can see in which port they are running in console logs.

5. To use the https support, please generate new key.pem and cert.pem and place the same at <INSTALL_PATH>/HW_A1/https directory.

6. Example to send request :
   
   staging environment
   HTTP : http://www.localhost:3000/hello
   HTTPS : https://www.localhost:3001/hello
   
   production environment
   HTTP : http://www.localhost:5000/hello
   HTTPS : https://www.localhost:5001/hello
   
   Available route : /hello
   Once you send the post request using the above url, you will be getting the response in JSON.
