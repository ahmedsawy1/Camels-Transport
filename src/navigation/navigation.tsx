import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import MainTabs from './MainTabs';
import HomeScreen from '../screens/home/HomeScreen';
import NewRequest from '../screens/request/NewRequest';
import MyProfile from '../screens/profile/MyProfile';
import EditPhone from '../screens/profile/EditPhone';
import Terms from '../screens/profile/Terms';
import Privacy from '../screens/profile/Privacy';
import FAQs from '../screens/profile/FAQs';
import Support from '../screens/profile/Support';
import PreviousOrders from '../screens/request/PreviousOrders';
import {useAppSelector} from '../../store/hook';
import OrderOverview from '../screens/request/OrderOverview';
import SuccessPayScreen from '../screens/status/SuccessPayScreen';
import FaildPayScreen from '../screens/status/FaildScreen';
import RequestProccess from '../content/request/RequestProccess';

const Stack = createStackNavigator();

export default function Navigation(props: any) {
  const {isSignIn} = useAppSelector(state => state.authSlice);
  const route = props.routeName;

  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isSignIn && (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </>
        )}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RequestProccess" component={RequestProccess} />
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
        <Stack.Screen name="FaildPayScreen" component={FaildPayScreen} />
        <Stack.Screen name="SuccessPayScreen" component={SuccessPayScreen} />
        <Stack.Screen name="NewRequest" component={NewRequest} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="OrderOverview" component={OrderOverview} />
        <Stack.Screen name="EditPhone" component={EditPhone} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="PreviousOrders" component={PreviousOrders} />
      </Stack.Navigator>

      {route == 'HomeScreen' ||
      route == 'MyProfile' ||
      route == 'PreviousOrders' ? (
        <MainTabs active={route} />
      ) : null}
    </>
  );
}
