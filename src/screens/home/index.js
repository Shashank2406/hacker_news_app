import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Colors} from '../../config/styles';
import {timeSince} from '../../config/utils';
import ENV from '../../config/env.json';
import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false,
      data: [],
    };
    this.pageValue = 1;
    this.firstValue = 0;
    this.threshold = 25;
    this.initialData = [];
    this.fetchInitialData();
  }

  fetchInitialData = async isRefresh => {
    const {protocol, baseUrl} = ENV;
    this.initialData = await fetch(`${protocol}${baseUrl}topstories.json`);
    this.initialData = await this.initialData.json();
    await this.paginationHandling(isRefresh);
  };

  paginationHandling = async isRefresh => {
    var pageData = isRefresh ? [] : JSON.parse(JSON.stringify(this.state.data));
    const {protocol, baseUrl} = ENV;
    var totalElements = this.pageValue * this.threshold;
    if (totalElements <= this.initialData.length) {
      await Promise.all(
        this.initialData.slice(this.firstValue, totalElements).map(async id => {
          const response = await fetch(`${protocol}${baseUrl}item/${id}.json`);
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
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
          animated
        />
        {data && data.length !== 0 && (
          <FlatList
            data={data}
            onEndReached={() => this.paginationHandling(false)}
            onRefresh={this.onRefresh}
            refreshing={isRefreshing}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
            ItemSeparatorComponent={() => (
              <View style={styles.separatorHeight} />
            )}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={styles.urlText}>{`${item?.url?.slice(
                  0,
                  30,
                )}...`}</Text>
                <Text style={styles.title}>{`${item.title}`}</Text>
                <View style={styles.flatView}>
                  <Text style={styles.byText}>{`${item.by}`}</Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.subText}>{`${timeSince(
                    new Date(Date.now() - item.time),
                  )}`}</Text>
                </View>
                <View style={styles.flatInnerView}>
                  <Text style={styles.subText}>{`${item.score} points`}</Text>
                  <View style={styles.verticalLine} />
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Comments', {
                        selectedItem: item,
                      });
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
