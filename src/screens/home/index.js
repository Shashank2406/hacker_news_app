import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../config/styles';
import {timeSince} from '../../config/utils';
import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false,
      data: [
        // {
        //   by: 'dhouston',
        //   descendants: 71,
        //   id: 8863,
        //   kids: [
        //     9224, 8917, 8952, 8958, 8884, 8887, 8869, 8873, 8940, 8908, 9005,
        //     9671, 9067, 9055, 8865, 8881, 8872, 8955, 10403, 8903, 8928, 9125,
        //     8998, 8901, 8902, 8907, 8894, 8870, 8878, 8980, 8934, 8943, 8876,
        //   ],
        //   score: 104,
        //   time: 1175714200,
        //   title: 'My YC app: Dropbox - Throw away your USB drive',
        //   type: 'story',
        //   url: 'http://www.getdropbox.com/u/2/screencast.html',
        // },
      ],
    };
    this.pageValue = 1;
    this.firstValue = 0;
    this.threshold = 25;
    this.initialData = [];
    this.fetchInitialData();
  }

  fetchInitialData = async isRefresh => {
    this.initialData = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json',
    );
    this.initialData = await this.initialData.json();
    await this.paginationHandling(isRefresh);
  };

  paginationHandling = async isRefresh => {
    var pageData = isRefresh ? [] : JSON.parse(JSON.stringify(this.state.data));
    var totalElements = this.pageValue * this.threshold;
    if (totalElements <= this.initialData.length) {
      await Promise.all(
        this.initialData.slice(this.firstValue, totalElements).map(async id => {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          );
          const todo = await response.json();
          pageData.push(todo);
        }),
      );
      this.firstValue = this.pageValue * this.threshold;
      this.pageValue = this.pageValue + 1;
      if (isRefresh) {
        this.setState({isRefreshing: false});
      }
      this.setState({data: pageData});
    }
  };

  renderFooter = () => {
    var totalElements = this.pageValue * this.threshold;
    return (
      <>
        {totalElements <= this.initialData.length ? (
          <View style={styles.footer}>
            <ActivityIndicator size="large" color={Colors.COLOR_BLACK} />
          </View>
        ) : null}
      </>
    );
  };

  onRefresh = () => {
    this.pageValue = 1;
    this.firstValue = 0;
    this.setState({isRefreshing: true});
    this.fetchInitialData(true);
  };

  render() {
    const {isLoading, data, isRefreshing} = this.state;
    return (
      <View style={styles.container}>
        {isLoading && data?.length === 0 && (
          <ActivityIndicator size="large" color={Colors.COLOR_BLACK} />
        )}
        {data && data.length !== 0 && (
          <FlatList
            data={data}
            onEndReached={() => this.paginationHandling(false)}
            onRefresh={this.onRefresh}
            refreshing={isRefreshing}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                }}
              />
            )}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={styles.urlText}>{`${item?.url?.slice(
                  0,
                  30,
                )}...`}</Text>
                <Text style={styles.title}>{`${item.title}`}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                  }}>
                  <Text style={styles.byText}>{`${item.by}`}</Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.subText}>{`${timeSince(
                    new Date(Date.now() - item.time),
                  )}`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                  }}>
                  <Text style={styles.subText}>{`${item.score} points`}</Text>
                  <View style={styles.verticalLine} />
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Comments');
                    }}>
                    <Text style={styles.subText}>{`${
                      item?.kids?.length || 0
                    } comments`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}

export default Home;
