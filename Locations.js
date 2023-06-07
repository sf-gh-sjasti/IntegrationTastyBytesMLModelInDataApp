import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ListItem } from "react-native-elements";
import Styles from './Styles';
import bearerToken from "./Tokens";
import { SNOWFLAKE_ACCOUNT_IDENTIFIER } from '@env';

export default function Locations({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [truckId, setTruckId] = useState(50);
  const [currentDate, setCurrentDate] = useState();
  const [locationsData, setLocationsData] = useState([]);
  const [isLocationsFetched, setIsLocationsFetched] = useState(false);

  const getLocationsFromUDF = async () => {
    try {
      const date = new Date();
      setCurrentDate(date.toLocaleString());
      const shift = date.getHours() < 14 ? 1 : 0;
      const response = await fetch('https://' + SNOWFLAKE_ACCOUNT_IDENTIFIER + '.snowflakecomputing.com/api/v2/statements', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Snowflake-Authorization-Token-Type': 'KEYPAIR_JWT',
        Authorization: 'Bearer ' + bearerToken()
        },
        body: JSON.stringify({
          "statement": `SELECT DISTINCT TOP 50 location_id, location_name, street_address, city, shift, frostbyte_tasty_bytes_ml_app.analytics.udf_predict_location_sales_prod(month, day_of_week, latitude, longitude, city_population, avg_location_shift_sales, shift) AS predicted_shift_sales 
                        FROM frostbyte_tasty_bytes_ml_app.analytics.shift_features
                        WHERE shift = ` + shift +
                        `AND city = 'Vancouver'
                        ORDER BY predicted_shift_sales DESC;`,
          "timeout": 1200,
          "database": "FROSTBYTE_TASTY_BYTES_ML_APP",
          "schema": "FROSTBYTE_TASTY_BYTES_ML_APP.ANALYTICS",
          "warehouse": "TASTY_ML_APP_WH",
          "role": "TASTY_BYTES_DATA_ML_APP_DEMO"
          }),
      });
      const json = await response.json();
      setLocationsData(json.data);
      setIsLocationsFetched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getLocationsFromUDF();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingTop: 20, paddingLeft: 30, paddingBottom: 10 }}>
        <Text style={Styles.content}>{"Truck ID: " + truckId}</Text>
        <Text style={Styles.content}>{currentDate}</Text>
      </View>
      <View style={Styles.container}>
        { isLocationsFetched &&
          <FlatList
            data={locationsData}
            scrollEnabled={true}
            vertical
            title='Recommended'
            ListHeaderComponent={() => <Text style={{ fontWeight: '700', fontSize: 18, color: '#11567F', fontFamily: 'lato' }}>Recommended</Text>}
            ItemSeparatorComponent={() => {
              return (<View style={Styles.horizontalLine} />);
            }}
            ListEmptyComponent={
              <View style= {{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{ height: 50 }}>{'\n'}</Text>
                <Text style={{ fontWeight: '700', fontSize: 16, color: '#11567F', fontFamily: 'lato' }}>No Data Found</Text>
              </View>}
            renderItem={({ item }) =>
              <ListItem>
                <View style={{ width: 380 }}>
                  <Text style={{ fontSize: 18, fontWeight: '700', fontFamily: 'lato' }}>
                    {item[1]}
                  </Text>
                  <Text style={Styles.contentHeading}>{'Address: '}
                    <Text style={Styles.content}>{item[2] + ", " + item[3]}</Text></Text>
                  <Text style={Styles.contentHeading}>{'Arrive By: '}
                    <Text style={Styles.content}>{item[4] == 1 ? "09:00 AM" : "04:00 PM"}</Text></Text>
                  <Text style={Styles.contentHeading}>{'Predicted Shift Sales: '}
                    <Text style={Styles.content}>{'$' + (parseFloat(item[5]).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text></Text>
                  <Text style={{ height: 5 }}>{'\n'}</Text>
                </View>
              </ListItem>
            }
          />
        }
      </View>
      <Text style={{ height: 30 }}>{'\n'}</Text>
    </View>
  );
};