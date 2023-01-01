import { StatusBar } from 'expo-status-bar'
import { StyleSheet, FlatList, SafeAreaView } from 'react-native'
import ListItem from '../components/ListItem'
import Constants from 'expo-constants'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const URL = `https://newsapi.org/v2/top-headlines?country=jp&category=business&apiKey=${
  Constants.manifest!.extra!.newsApiKey
}`

type Article = {
  author: string
  title: string
  urlToImage: string
  publishedAt: string
}

const HomeScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  const [articleList, setArticleList] = useState<Article[]>()
  const navigator = navigation

  useEffect(() => {
    const f = async () => {
      const { isError, response } = await fetchArticleList()
      if (!isError) setArticleList(response['data']['articles'])
      else alert(response)
    }
    f()
  }, [])

  const fetchArticleList = async () => {
    let response: any = undefined
    let isError: boolean = false

    try {
      response = await axios.get(URL)
    } catch (err: any) {
      console.error(response)
      isError = true
    }

    return { isError, response }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articleList}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigator.navigate('Article')}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default HomeScreen
