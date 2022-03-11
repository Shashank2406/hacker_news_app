import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {timeSince} from '../../config/utils';
import {Colors} from '../../config/styles';
import ENV from '../../config/env.json';
import RenderHtml from 'react-native-render-html';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.route.params.selectedItem || null,
      commentsData: [],
    };
    this.fetchCommentsData(props.route.params.selectedItem);
  }

  fetchCommentsData = async data => {
    const {protocol, baseUrl} = ENV;
    var commentsData = {
      [data.id]: [],
    };
    if (data?.kids && data?.kids.length > 0) {
      await Promise.all(
        data.kids.map(async id => {
          const response = await fetch(`${protocol}${baseUrl}item/${id}.json`);
          const jsonResponse = await response.json();
          commentsData[data.id].push(jsonResponse);
        }),
      );
      commentsData[data.id].forEach(item => {
        this.fetchCommentsData(item); //Using recursion to fetch all comments
      });
      var finalData = {...this.state.commentsData, ...commentsData};
      this.setState({commentsData: finalData});
    } else {
      return false;
    }
  };

  render() {
    const {data, commentsData} = this.state;
    const width = Dimensions.get('window').width;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.urlText}>{`${data?.url?.slice(0, 30)}...`}</Text>
          <Text style={styles.title}>{`${data.title}`}</Text>
          <View style={styles.mainView}>
            <Text style={styles.byText}>{`${data.by}`}</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.subText}>{`${timeSince(
              new Date(Date.now() - data.time),
            )}`}</Text>
          </View>
          <View style={styles.innerView}>
            <Text style={styles.subText}>{`${data.score} points`}</Text>
            <View style={styles.verticalLine} />

            <Text style={styles.subText}>{`${
              data?.kids?.length || 0
            } comments`}</Text>
          </View>
        </View>
        <View style={styles.commentView}>
          <Text style={styles.title}>{'Comments'}</Text>
          <View style={styles.horizontalView} />
          <FlatList
            data={commentsData[data.id]}
            style={styles.bottomMargin}
            ListEmptyComponent={() => (
              <ActivityIndicator size="large" color={Colors.COLOR_BLACK} />
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.separatorHeight} />
            )}
            renderItem={({item}) => (
              <View>
                <View style={styles.flatView}>
                  <Text style={styles.byText}>{`${item.by}`}</Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.subText}>{`${timeSince(
                    new Date(Date.now() - item.time),
                  )}`}</Text>
                </View>
                {item.text && (
                  <RenderHtml contentWidth={width} source={{html: item.text}} />
                )}
                <View style={styles.flatInnerView}>
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
