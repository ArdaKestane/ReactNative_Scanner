import React from 'react';

import EditComponentScreen from '../Screens/EditComponentScreen';
import ReceiptScreen from '../Screens/ReceiptScreen';

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceiptScreen"
        component={ReceiptScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditComponentScreen"
        component={EditComponentScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
