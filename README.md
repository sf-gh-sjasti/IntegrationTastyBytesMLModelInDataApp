# Integrating Tasty Bytes Location Recommendations ML model into the React Native Data Application
Snowflake has simplified the integration of Machine Learning models into Data Applications through its convenient features that allow for the deployment of ML models as Stored Procedures, User Defined Functions (UDF's), and User Defined Table Functions (UDTF's). Furthermore, Snowflake offers a SQL API, a RESTful API to facilitate querying the deployed ML models, enabling seamless integration between the application and the ML model.

In this tutorial, the application you are building helps fictitious food truck company, Tasty Bytes and it's Truck drivers to view the location recommendations provided by the ML model directly in the Data Application. This Location Recommendation ML model is built within Snowflake using Snowpark which makes it easy for python users to leverage Snowflake platform. This model uses historical sales data and Safegraph weather data from Snowflake Data Marketplace to provide more information to the model. This tutorial will guide you through the process of how we are deploying and integrating ML model into the Truck Driver App.  

To run the app locally,
### Step 1: Get the Source Code
1. Clone the repo using ``` git clone https://github.com/sf-gh-sjasti/IntegrationTastyBytesMLModelInDataApp.git reactNativeMLApp ```
2. Navigate to the folder, ``` cd reactNativeMLApp ```
3. Run ``` npm install ``` to install dependancies

### Step 2: Configure the application
1. Open the ``` reactNativeMLApp ``` folder in VS Code or IDE of your choice.
2. Open the ``` .env ``` file and update ``` PRIVATE_KEY ``` value with the private key. Copy and paste the whole private key from ``` ~/.ssh/snowflake_app_key.pub ``` including header(``` -----BEGIN RSA PRIVATE KEY----- ```) and footer(``` -----END RSA PRIVATE KEY----- ```).
3. If you are located in us-west region, Update ``` SNOWFLAKE_ACCOUNT_IDENTIFIER ``` with your Snowflake Account
   (or) If you are located outside the us-west region, Update ``` SNOWFLAKE_ACCOUNT_IDENTIFIER ``` as '<SNOWFLAKE ACCOUNT>.<REGION>'.
   To get the snowflake_account value from Snowflake, run ``` SELECT CURRENT_ACCOUNT() ``` in Snowsight. 
   To get the region value from Snowflake, run ``` SELECT CURRENT_REGION() ``` in Snowsight. 
   SNOWFLAKE_ACCOUNT_IDENTIFIER and SNOWFLAKE_ACCOUNT would be same for us-west. 
4. Update ``` SNOWFLAKE_ACCOUNT ``` with your Snowflake Account.
5. Update ``` PUBLIC_KEY_FINGERPRINT ``` with your user Public Key FingerPrint. To get Public Key Fingerprint, Run the following SQL in Snowsight  ```DESCRIBE USER data_app_demo ``` and get RSA_PUBLIC_KEY_FP property value.

### Step 3: Review the Source Code
We are using Key Pair Authentication to authenticate with Snowflake using SQL API. You can refer to the ``` Tokens.js ``` to understand how we are generating the JWT token. ``` Locations.js ``` has the source code to render Locations screen. You can also refer to this file to find out how to query UDF using SQL API and the headers needed.

### Step 4: Test the application
1. Run ``` npx expo start --clear ``` and hit ``` w ``` key to run the app in a web browser
2. This launches the app in Web Browser
3. Upon Launch, You can see the List of recommendations with predicted shift sales.

For detailed steps, Refer to the Quickstart, 
https://quickstarts.snowflake.com/guide/integrating_tasty_bytes_location_recommendation_ml_model_into_the_react_native_data_app
