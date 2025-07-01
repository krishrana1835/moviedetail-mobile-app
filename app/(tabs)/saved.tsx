import React, { useContext } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppContext } from '../context/AppContext'

const saved = () => {

  const context = useContext(AppContext)

  if(!context) throw new Error('AppContext must be used within an AppProvider');

  const {saved, addItem, removeItem, isSaved} = context

  return (
    <SafeAreaView>
      <FlatList
        data={saved}
        keyExtractor={(item: any, index: any) => item + index}
        renderItem={({ item }: any) => <Text>{item}</Text>}
      />
    </SafeAreaView>
  )
}

export default saved

const styles = StyleSheet.create({})