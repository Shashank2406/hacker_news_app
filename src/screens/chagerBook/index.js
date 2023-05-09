import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, Image} from 'react-native';
import {Button} from '../../components/button';
import {Header} from '../../components/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './style';

const BookCharger = ({navigation}) => {
  const currentDate = new Date();
  const currentTime = new Date().getTime();
  const [date, setDate] = useState(currentDate);
  const [departDate, setDepartDate] = useState(currentDate);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const onChangeArrive = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };
  const onChangeDepart = (event, selectedDate) => {
    setShow(false);
    setDepartDate(selectedDate);
  };

  const getHours = (arriveT, departT) => {
    var timeStart = new Date(arriveT).getHours();
    var timeEnd = new Date(departT).getHours();
    var hourDiff = timeEnd - timeStart;
    return hourDiff;
  };

  const getTime = (arriveT, departT) => {
    var timeStart = new Date(arriveT).getMinutes();
    var timeEnd = new Date(departT).getMinutes();
    var minDiff = timeEnd - timeStart;
    return minDiff.length > 9 ? Math.abs(minDiff) : `0 ${Math.abs(minDiff)}`;
  };

  useEffect(() => {
    getHours();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header goBack={() => navigation.goBack()} />
      <View style={styles.topImageContainer}>
        <Image
          style={styles.topImage}
          source={require('../../assets/cabImage.png')}
        />
        <View style={{paddingLeft: 20, justifyContent: 'space-around'}}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
            Charger Point Station
          </Text>
          <Text style={{fontSize: 13, color: '#000'}}>
            Metro Cross Road, 110003
          </Text>
          <Text style={{fontSize: 13, fontWeight: '500', color: '#000'}}>
            4 ports available
          </Text>
        </View>
      </View>
      <Text style={{paddingTop: 40, fontSize: 13, color: '#000'}}>
        {'Estimated time to full Charges'}{' '}
        <Text style={{fontWeight: '700'}}> {'2 hrs 45 mins'}</Text>
      </Text>
      <View
        style={{borderColor: '#000', borderWidth: 0.5, marginVertical: 30}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
        }}>
        <Text style={{fontWeight: '700'}}>Arrive</Text>
        <Text style={{fontWeight: '700'}}>Depart</Text>
      </View>
      <Text
        style={{textAlign: 'center', fontWeight: '700', paddingVertical: 10}}>
        {`${getHours(date, departDate)} : ${getTime(date, departDate)} hrs`}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <DateTimePicker
            testID="dateTimePicker1"
            value={date}
            mode={'time'}
            is24Hour={false}
            onChange={onChangeArrive}
            style={{fontSize: 13}}
            minimumDate={new Date(currentTime)}
          />
        </View>
        <DateTimePicker
          testID="dateTimePicker2"
          value={departDate}
          mode={'time'}
          is24Hour={false}
          onChange={onChangeDepart}
          style={{fontSize: 13}}
          minimumDate={new Date(date)}
          textColor={'red'}
        />
      </View>

      <View style={{alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
        <Button title={'BOOK NOW'} />
      </View>
    </SafeAreaView>
  );
};

export default BookCharger;
