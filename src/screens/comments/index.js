import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from './styles';
import {timeSince} from '../../config/utils';
import {Colors} from '../../config/styles';
import RenderHtml from 'react-native-render-html';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false,
      data: props.route.params.selectedItem || null,
      commentsData: [],
    };
    this.fetchCommentsData(props.route.params.selectedItem);
    this.kidsData = [];
  }

  fetchCommentsData = async data => {
    var commentsData = [];
    if (data?.kids && data?.kids.length > 0) {
      await Promise.all(
        data.kids.map(async id => {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          );
          const todo = await response.json();
          commentsData.push(todo);
        }),
      );
      commentsData.forEach((item, index) => {
        this.fetchCommentsData(item);
      });
      var finalData = [...this.state.commentsData, ...commentsData];
      this.setState({commentsData: finalData});
    } else {
      return false;
    }
    // console.log(this.state.commentsData);
  };

  render() {
    const {data, commentsData} = this.state;
    const width = Dimensions.get('window').width;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.urlText}>{`${data?.url?.slice(0, 30)}...`}</Text>
          <Text style={styles.title}>{`${data.title}`}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <Text style={styles.byText}>{`${data.by}`}</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.subText}>{`${timeSince(
              new Date(Date.now() - data.time),
            )}`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <Text style={styles.subText}>{`${data.score} points`}</Text>
            <View style={styles.verticalLine} />

            <Text style={styles.subText}>{`${
              data?.kids?.length || 0
            } comments`}</Text>
          </View>
        </View>
        <View style={{marginHorizontal: 20, justifyContent: 'center'}}>
          <Text style={styles.title}>{'Comments'}</Text>
          <View style={{borderTopWidth: 1, marginVertical: 10}} />
          <FlatList
            data={commentsData}
            style={{marginBottom: 150}}
            ListEmptyComponent={() => (
              <ActivityIndicator size="large" color={Colors.COLOR_BLACK} />
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                }}
              />
            )}
            renderItem={({item}) => (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <Text style={styles.byText}>{`${item.by}`}</Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.subText}>{`${timeSince(
                    new Date(Date.now() - item.time),
                  )}`}</Text>
                </View>
                <RenderHtml contentWidth={width} source={{html: item.text}} />
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 15,
                  }}>
                  <Text style={styles.subText}>{`${
                    item?.kids?.length || 0
                  } comments`}</Text>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

export default Comments;
