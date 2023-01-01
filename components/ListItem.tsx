import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

type Props = {
  imageUrl: string
  title: string
  author: string
  onPress: () => void
}

const ListItem: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: props.imageUrl }}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text numberOfLines={3} style={styles.text}>
          {props.title}
        </Text>
        <Text style={styles.subText}>{props.author}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ListItem

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  subText: { fontSize: 10, color: 'gray' },
})
