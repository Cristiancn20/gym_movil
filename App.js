import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MainStacks from './Resources/Navigations/MainStacks';

export default function App() {
  return (
    <MainStacks />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(220, 220, 220)'

  }
})
