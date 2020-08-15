# Funding - running on Strapi

This is a responsive website which allow each bus stop to seek for funding to improve their facilities. Each station will show the collected and remaining amount.

# # Steps to run the project

1.  Clone the project in your machine
2.  Navigate to the project via Terminal and perform  `npm install`
3.  Once  `npm install`  is completed, navigate to iOS folder and perform  `pod install`
4.  You are ready to run the app now (:

## Pre-requisite

The branch you are looking now connects to [Strapi](https://strapi.io/) as backend which helps to store the data. If you would like to connect this project with Strapi on your machine, do take notes the following:
- Domain URL: http://localhost:1337
- Collection types in Strapi you need to create
	- Add_donation
		- station (Text)
		- donatorName (Text)
		- email (Text)
		- donationAmount (Number)
	- Getallstop
		- stationName (Text)
		- collectedAmount (Number)